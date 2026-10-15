// ใบแจ้งภาระภาษีและค่าธรรมเนียม — A4 print/PDF. window.printNotice(p) where p = DK.view(taxpayer, year)
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const abs = p => new URL(p, location.href).href;
  function row(k, v, cls) { return '<tr' + (cls ? ' class="' + cls + '"' : '') + '><td>' + k + '</td><td class="r">' + v + '</td></tr>'; }
  function taxTable(title, t) {
    if (!t) return '';
    const c = DK.calcTax(t), m = DK.money;
    return '<div class="box"><h3>' + title + '</h3><table>' +
      (c.noticeNo ? row('หนังสือแจ้งการประเมินเลขที่', esc(c.noticeNo)) : '') + row('เงินภาษี', m(c.assess)) + row('วันที่ครบชำระ', DK.thDate(c.due)) + row('วันที่ชำระ', DK.thDate(c.paid)) +
      row('เกินกำหนด', c.days ? c.months + ' เดือน (' + c.days + ' วัน)' : '-') +
      row('เบี้ยปรับชำระล่าช้า' + (c.rate ? ' (' + c.rate * 100 + '%)' : ''), m(c.penalty)) +
      row('เงินเพิ่ม ' + c.sRate * 100 + '% × ' + c.months + ' เดือน', m(c.surcharge)) + row('รวมภาษี', m(c.total), 'tot') + '</table></div>';
  }
  function signTable(t) {
    if (!t) return '';
    const c = DK.calcSign(t), m = DK.money;
    return '<div class="box"><h3>ภาษีป้าย</h3><table>' + row('วันที่ได้รับการแจ้งประเมิน', DK.thDate(c.noticeDate)) + row('วันครบกำหนดชำระ', DK.thDate(c.due)) + row('วันที่ชำระ', DK.thDate(c.paid)) + row('เกินกำหนด', c.months + ' เดือน') +
      row('เงินภาษี', m(c.assess)) + row('เงินเพิ่มจากการชำระภาษีล่าช้า', m(c.surcharge)) + row('เงินเพิ่มจากการยื่นแบบล่าช้า' + (c.lateRate ? ' (' + c.lateRate * 100 + '%)' : ''), m(c.lateFiling)) + row('รวมเงินที่ต้องชำระทั้งสิ้น', m(c.total), 'tot') +
      (c.payMode !== 'full' ? row(c.payMode === 'inst1' ? 'ผ่อนชำระครั้งที่ 1' : 'ชำระตามจำนวนที่ระบุ', m(c.payAmount), 'tot') : '') + '</table></div>';
  }
  window.printNotice = function (p) {
    const m = DK.money, PP = window.PromptPay, cfg = PP ? PP.load() : {};
    const land = DK.calcTax(p.land), sign = DK.calcSign(p.sign), lics = (p.licenses || []).map(DK.calcLicense);
    const licTotal = lics.reduce((s, l) => s + l.total, 0);
    const grand = (land ? land.total : 0) + (sign ? sign.total : 0) + licTotal;
    const ref = 'DK' + p.id.slice(-6) + String(Math.round(grand * 100)).padStart(8, '0');
    const qr = PP && grand > 0 && PP.enabled(cfg) ? PP.imageUrl(PP.payload(grand, ref, p.id), 260) : '';
    const noticeNo = 'DK-' + p.year + '-' + p.id.slice(-5);
    const licHtml = lics.length ? '<div class="box full"><h3>ใบอนุญาต / ค่าธรรมเนียม (' + lics.length + ' ใบ)</h3><table class="grid"><thead><tr><th>เลขที่ / ประเภท</th><th>หมดอายุ</th><th class="r">ค่าธรรมเนียม</th><th class="r">ค้าง (ปี)</th><th class="r">ค้างชำระ</th><th class="r">ค่าปรับ</th><th class="r">รวม</th></tr></thead><tbody>' +
      lics.map(l => '<tr><td>' + esc(l.no) + '<br><small>' + esc(l.type) + '</small></td><td>' + DK.thDate(l.expire) + '</td><td class="r">' + m(l.fee) + '</td><td class="r">' + l.years + '</td><td class="r">' + m(l.outstanding) + '</td><td class="r">' + m(l.fine) + '</td><td class="r"><b>' + m(l.total) + '</b></td></tr>').join('') +
      '</tbody><tfoot><tr><td colspan="6">รวมค่าธรรมเนียม</td><td class="r">' + m(licTotal) + '</td></tr></tfoot></table></div>' : '';
    const html = `<!DOCTYPE html><html lang="th"><head><meta charset="UTF-8"><title>ใบแจ้ง ${esc(noticeNo)} - ${esc(p.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:18mm 14mm 14mm}
*{box-sizing:border-box}body{margin:0;font-family:'Prompt',sans-serif;font-size:10.5pt;color:#1d2735;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{max-width:186mm;margin:0 auto;padding:6mm 0}
.head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:3px solid #153e75;padding:4mm 0 10px}
.head img{height:15mm;max-width:105mm;object-fit:contain}
.head .t{text-align:right}.head h1{margin:0;font-size:15pt;color:#153e75}.head .t div{font-size:9.5pt;color:#55606e}
.meta{display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;background:#eef4fb;border-radius:6px;padding:10px 14px;margin:12px 0}
.meta b{font-weight:600}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.box{border:1px solid #cdd8e6;border-radius:6px;padding:8px 12px;break-inside:avoid}.box.full{grid-column:1/-1}
h3{margin:0 0 6px;font-size:11pt;color:#153e75}
table{width:100%;border-collapse:collapse}td,th{padding:3px 0;vertical-align:top}.r{text-align:right}
.box table td{border-bottom:1px dashed #dde4ee}.tot td{font-weight:700;color:#153e75;border-bottom:0!important}
.grid th{font-size:9pt;font-weight:600;color:#55606e;border-bottom:1px solid #cdd8e6;text-align:left;padding:4px 4px}.grid th.r{text-align:right}
.grid td{padding:4px;border-bottom:1px dashed #dde4ee}.grid tfoot td{font-weight:700;color:#153e75;border:0;padding-top:6px}
small{color:#55606e}
.sum{display:flex;justify-content:space-between;align-items:center;background:#153e75;color:#fff;border-radius:6px;padding:12px 16px;margin:12px 0}
.sum .v{font-size:18pt;font-weight:700}
.pay{display:grid;grid-template-columns:auto 1fr;gap:16px;border:1px solid #cdd8e6;border-radius:6px;padding:12px;break-inside:avoid}
.pay img{width:42mm;height:42mm}.pay h3{margin-bottom:4px}.pay p{margin:2px 0}
.foot{margin-top:14px;font-size:8.5pt;color:#55606e;display:flex;justify-content:space-between;gap:12px;border-top:1px solid #dde4ee;padding-top:6px}
.bar{position:sticky;top:0;background:#153e75;color:#fff;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.bar button{font:500 11pt 'Prompt',sans-serif;background:#fff;color:#153e75;border:0;border-radius:6px;padding:7px 16px;cursor:pointer}
@media print{.bar{display:none}.page{padding:4mm 0 0}}
</style></head><body>
<div class="bar"><span>ใบแจ้งพร้อมแล้ว — เลือกปลายทาง “บันทึกเป็น PDF” ในหน้าต่างพิมพ์</span><button onclick="print()">บันทึกเป็น PDF / พิมพ์</button></div>
<div class="page">
<div class="head"><img src="${abs('../../assets/logo-long.png')}" alt=""><div class="t"><h1>ใบแจ้งภาระภาษีและค่าธรรมเนียม</h1><div>เทศบาลเมืองดอนแก้ว · DK One Tax Bill</div><div>เลขที่ ${esc(noticeNo)} · ปีงบประมาณ ${esc(p.year)}</div><div>ออก ณ วันที่ ${DK.thDate(DK.TODAY)}</div></div></div>
<div class="meta"><div>ชื่อ-นามสกุล / ชื่อสถานประกอบการ: <b>${esc(p.name)}</b></div><div>เลขที่เสียภาษี: <b>${esc(p.id)}</b></div><div>ที่อยู่: ${esc(p.address)}</div><div>เบอร์โทร: ${esc(p.phone)}</div></div>
<div class="cols">${taxTable('ภาษีที่ดินและสิ่งปลูกสร้าง', p.land)}${signTable(p.sign)}${licHtml}</div>
<div class="sum"><span>ยอดภาษีและค่าธรรมเนียมทั้งหมด</span><span class="v">${m(grand)} บาท</span></div>
<div class="pay">${qr ? '<img src="' + qr + '" alt="QR">' : ''}<div><h3>ช่องทางการชำระ</h3>
${qr ? '<p><b>สแกน QR พร้อมเพย์</b> ผู้รับเงิน ' + esc(cfg.accountName) + ' (ยอดเงินกรอกให้อัตโนมัติ)</p>' : ''}
${cfg.bankAccount ? '<p><b>โอนเงิน</b> ' + esc(cfg.bankName) + ' เลขที่ ' + esc(PP.fmtAcct(cfg.bankAccount)) + ' ชื่อบัญชี ' + esc(cfg.accountName) + '</p>' : ''}
${cfg.cashOn !== 'off' ? '<p><b>เงินสด</b> ' + esc(cfg.cashPoint) + ' · ' + esc(cfg.cashHours) + '</p>' : ''}
<p>เลขอ้างอิง <b>${ref}</b></p><p><small>ยอดคำนวณ ณ วันที่ออกใบแจ้ง หากชำระหลังวันครบกำหนด เบี้ยปรับและเงินเพิ่มจะคิดตามวันที่ชำระจริง</small></p></div></div>
<div class="foot"><span>เอกสารนี้ออกโดยระบบ DK One Tax Bill เทศบาลเมืองดอนแก้ว</span><span>${esc(noticeNo)}</span></div>
</div>
<script>Promise.all([document.fonts.ready].concat([].map.call(document.images,function(i){return i.complete?0:new Promise(function(r){i.onload=i.onerror=r})}))).then(function(){setTimeout(function(){print()},300)});<\/script>
</body></html>`;
    const w = window.open('', '_blank');
    if (!w) return false;
    w.document.open(); w.document.write(html); w.document.close();
    return true;
  };
})();
