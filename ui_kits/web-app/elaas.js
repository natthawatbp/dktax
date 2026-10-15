// e-LAAS "รายละเอียดผู้ชำระภาษี (กค.1)" Excel importer — land & signboard.
// Layout: header block (ประเภทภาษี…, ประจำปีงบประมาณ พ.ศ. ####), header row with "ยอดประเมินภาษี",
// one row per taxpayer (col "ที่" = running no.), continuation rows (blank "ที่") = extra property of the previous taxpayer, final "รวม" row.
(function () {
  let libP = null;
  const loadLib = () => libP || (libP = window.XLSX ? Promise.resolve(window.XLSX) : new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
    s.onload = () => res(window.XLSX); s.onerror = () => rej(new Error('โหลดตัวอ่านไฟล์ Excel ไม่สำเร็จ (ต้องต่ออินเทอร์เน็ต)')); document.head.appendChild(s);
  }));
  const num = v => { const n = parseFloat(String(v || '').replace(/,/g, '')); return isNaN(n) ? 0 : n; };
  const r2 = n => Math.round(n * 100) / 100;
  async function parse(file) {
    const XLSX = await loadLib();
    const wb = XLSX.read(await file.arrayBuffer(), { type: 'array' });
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: false, defval: '' });
    const flat = rows.slice(0, 15).map(r => r.join(' ')).join(' ');
    const type = /ภาษีป้าย/.test(flat) ? 'sign' : /ที่ดิน/.test(flat) ? 'land' : null;
    const ym = flat.match(/ปีงบประมาณ\s*พ\.?ศ\.?\s*(\d{4})/);
    const printed = (flat.match(/วันที่พิมพ์\s*:\s*([\d/]+\s*[\d:]*)/) || [])[1] || '';
    const hi = rows.findIndex(r => r.some(c => /ยอดประเมินภาษี/.test(c)));
    if (hi < 0) throw new Error('ไม่พบหัวตาราง "ยอดประเมินภาษี" — ไฟล์นี้ไม่ใช่รายงาน กค.1 จาก e-LAAS');
    const H = rows[hi].map(c => String(c).replace(/\s+/g, ''));
    const col = re => H.findIndex(h => re.test(h));
    const C = { no: col(/^ที่$/), id: col(/เลขประ/), name: col(/ชื่อ/), addr: col(/ที่อยู่/), kk2: col(/กค\.?2/), assess: col(/ยอดประเมิน/), paid: col(/ยอดชำระ/), bal: col(/คงเหลือ/), note: col(/หมายเหตุ/) };
    if (C.name < 0 || C.assess < 0) throw new Error('คอลัมน์ในไฟล์ไม่ครบ (ต้องมีชื่อ และยอดประเมินภาษี)');
    const records = []; let footer = null, cur = null;
    for (let i = hi + 1; i < rows.length; i++) {
      const r = rows[i], no = String(r[C.no] || '').trim();
      if (/^รวม/.test(no) || /^รวม/.test(String(r[C.no + 1] || ''))) { footer = { assess: num(r[C.assess]), paid: num(r[C.paid]), bal: num(r[C.bal]) }; continue; }
      const prop = { address: String(r[C.addr] || '').trim(), assess: num(r[C.assess]), paid: num(r[C.paid]), bal: num(r[C.bal]), note: C.note >= 0 ? String(r[C.note] || '').trim() : '', kk2: C.kk2 >= 0 ? String(r[C.kk2] || '').trim() : '' };
      if (/^\d+$/.test(no)) {
        cur = { no: +no, id: String(r[C.id] || '').replace(/\D/g, ''), name: String(r[C.name] || '').trim(), properties: [prop] };
        records.push(cur);
      } else if (cur && prop.address && (prop.assess || prop.paid)) cur.properties.push(prop);
    }
    records.forEach(rec => { rec.assess = r2(rec.properties.reduce((s, p) => s + p.assess, 0)); rec.paid = r2(rec.properties.reduce((s, p) => s + p.paid, 0)); rec.bal = r2(rec.properties.reduce((s, p) => s + p.bal, 0)); rec.address = rec.properties[0].address; });
    const sum = k => r2(records.reduce((s, x) => s + x[k], 0));
    const totals = { assess: sum('assess'), paid: sum('paid'), bal: sum('bal') };
    const mismatch = footer && (Math.abs(footer.assess - totals.assess) > 0.05 || Math.abs(footer.bal - totals.bal) > 0.05);
    return { type, year: ym ? ym[1] : null, printed, records, totals, footer, mismatch, fileName: file.name };
  }
  const match = (rec, list) => (rec.id && list.find(t => t.id === rec.id)) || list.find(t => t.name.replace(/\s+/g, '') === rec.name.replace(/\s+/g, ''));
  function plan(res) {
    let add = 0, upd = 0; res.records.forEach(rec => match(rec, DK.TAXPAYERS) ? upd++ : add++);
    return { add, upd, noId: res.records.filter(r => !r.id).length, unpaid: res.records.filter(r => r.bal > 0).length };
  }
  function apply(res, type, year) {
    const ce = Number(year) - 543, due = ce + '-04-30';
    let add = 0, upd = 0;
    res.records.forEach(rec => {
      let p = match(rec, DK.TAXPAYERS);
      const item = { assess: rec.bal > 0 && rec.paid > 0 ? rec.bal : rec.assess, assessFull: rec.assess, paidAmount: rec.paid, balance: rec.bal, due, paid: rec.bal <= 0 ? due : null, paidNoDate: rec.bal <= 0, properties: rec.properties, source: 'e-LAAS ' + (res.printed || '') };
      if (p) {
        upd++; if (rec.id && !/^\d{13}$/.test(p.id)) p.id = rec.id; if (!p.address) p.address = rec.address;
        const cur = (p.byYear && p.byYear[year]) || {}; p.byYear = p.byYear || {};
        DK.saveYear(p, year, { land: cur.land || null, sign: cur.sign || null, licenses: cur.licenses || [], [type]: item });
      } else {
        add++;
        DK.addTaxpayer({ id: rec.id || ('NOID' + type.toUpperCase() + String(rec.no).padStart(5, '0')), name: rec.name, address: rec.address, phone: '' }, year, { land: null, sign: null, licenses: [], [type]: item });
      }
    });
    return { add, upd };
  }
  window.Elaas = { parse, plan, apply };
})();
