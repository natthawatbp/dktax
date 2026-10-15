// Mock data + calculation rules for the DK One Tax Bill UI kit
(function () {
  // Thai fiscal year (ปีงบประมาณ) runs 1 Oct – 30 Sep: Oct–Dec belong to next BE year.
  const fiscalYear = (dt = new Date()) => dt.getFullYear() + 543 + (dt.getMonth() >= 9 ? 1 : 0);
  const TODAY = (() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();
  const ROLES = {
    citizen: 'ประชาชนทั่วไป (User)', revenue: 'เจ้าหน้าที่จัดเก็บรายได้', finance: 'เจ้าหน้าที่การเงิน',
    health: 'เจ้าหน้าที่สาธารณสุข', exec: 'ผู้บริหาร', admin: 'ผู้ดูแลระบบ (Admin)'
  };
  const ACCOUNTS = [
    { username: 'admin', password: 'admin1234', role: 'admin', name: 'ผู้ดูแลระบบ', phone: '053-000-000' },
    { username: 'revenue', password: 'revenue1234', role: 'revenue', name: 'วรรณา จัดเก็บดี', phone: '053-000-101' },
    { username: 'finance', password: 'finance1234', role: 'finance', name: 'สมศรี รักงาน', phone: '053-000-102' },
    { username: 'health', password: 'health1234', role: 'health', name: 'ณัฐวัตร สุขภาพดี', phone: '053-000-103' },
    { username: 'exec', password: 'exec1234', role: 'exec', name: 'ประเสริฐ บริหารเก่ง', phone: '053-000-104' },
    { username: '3500100123456', password: 'user1234', role: 'citizen', name: 'สมชาย ใจดี', phone: '081-234-5678', taxId: '3500100123456' }
  ];
  const TAXPAYERS = [
    { id: '3500100123456', name: 'สมชาย ใจดี', address: '88/1 ม.3 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่', phone: '081-234-5678',
      land: { assess: 2400, due: '2026-04-30', paid: null }, sign: { assess: 1200, due: '2026-03-31', paid: '2026-03-20' },
      license: { no: 'สธ.123/2568', type: 'หนังสือรับรองการแจ้ง', expire: '2025-12-31', fee: 1000, years: 1 }, notified: false },
    { id: '0505561000789', name: 'บริษัท ดอนแก้วค้าวัสดุ จำกัด', address: '199 ม.5 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่', phone: '053-121-212',
      land: { assess: 18500, due: '2026-04-30', paid: '2026-04-12' }, sign: { assess: 7200, due: '2026-03-31', paid: '2026-03-28' },
      license: { no: 'กจ.045/2569', type: 'ใบอนุญาตประกอบกิจการ', expire: '2026-11-15', fee: 3000, years: 0 }, notified: true },
    { id: '3501200456789', name: 'นางสาวมณี ศรีสุข', address: '12 ม.1 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่', phone: '089-765-4321',
      land: { assess: 1250, due: '2026-04-30', paid: null }, sign: null, license: null, notified: true },
    { id: '0503558000456', name: 'ร้านกาแฟบ้านสวน', address: '45/2 ม.7 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่', phone: '086-555-1188',
      land: null, sign: { assess: 800, due: '2026-03-31', paid: null },
      license: { no: 'สธ.210/2567', type: 'หนังสือรับรองการแจ้ง', expire: '2024-12-31', fee: 500, years: 2 }, notified: false },
    { id: '3500900111222', name: 'นายประยุทธ มั่นคง', address: '7 ม.2 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่', phone: '084-333-2211',
      land: { assess: 5600, due: '2026-04-30', paid: '2026-09-30', review: true }, sign: null, license: null, notified: false },
    { id: '0505560001111', name: 'หจก. แม่ริมการช่าง', address: '301 ม.4 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่', phone: '053-888-999',
      land: { assess: 9800, due: '2026-04-30', paid: '2026-04-29' }, sign: { assess: 3600, due: '2026-03-31', paid: null },
      license: { no: 'กจ.099/2569', type: 'ใบอนุญาตประกอบกิจการ', expire: '2026-10-20', fee: 2000, years: 0 }, notified: false }
  ];

  // One taxpayer can hold many licenses: p.licenses = [{ no, type, expire, fee, years }]
  const EXTRA_LIC = { '0505561000789': { no: 'สธ.077/2569', type: 'ใบอนุญาตจำหน่ายอาหาร', expire: '2026-12-31', fee: 1500, years: 0 }, '0503558000456': { no: 'สธ.211/2568', type: 'ใบอนุญาตจำหน่ายอาหาร', expire: '2025-12-31', fee: 800, years: 1 } };
  TAXPAYERS.forEach(p => { p.licenses = [p.license, EXTRA_LIC[p.id]].filter(Boolean); delete p.license; });
  // Per-fiscal-year data: p.byYear[year] = { land, sign, licenses }. p.land/sign/licenses mirror CUR_YEAR.
  const CUR_YEAR = String(fiscalYear(TODAY));
  const shiftY = (s, n) => s ? (Number(s.slice(0, 4)) - n) + s.slice(4) : s;
  // Sample data was authored for FY2569; move its dates so it always reads as the current fiscal year.
  const OFF = Number(CUR_YEAR) - 2569;
  if (OFF) TAXPAYERS.forEach(p => {
    ['land', 'sign'].forEach(k => { if (p[k]) p[k] = { ...p[k], due: shiftY(p[k].due, -OFF), paid: shiftY(p[k].paid, -OFF) }; });
    p.licenses = p.licenses.map(l => ({ ...l, expire: shiftY(l.expire, -OFF) }));
  });
  const PREV_YEAR = String(Number(CUR_YEAR) - 1);
  TAXPAYERS.forEach(p => {
    p.byYear = { [CUR_YEAR]: { land: p.land, sign: p.sign, licenses: p.licenses } };
    const prev = k => p[k] ? { ...p[k], due: shiftY(p[k].due, 1), paid: p[k].due ? shiftY(p[k].due, 1).slice(0, 8) + '15' : undefined, review: false } : null;
    p.byYear[PREV_YEAR] = { land: prev('land'), sign: prev('sign'), licenses: p.licenses.map(l => ({ ...l, expire: shiftY(l.expire, 1), years: Math.max(0, l.years - 1) })) };
  });
  const view = (p, y = CUR_YEAR) => { const b = p.byYear[y] || {}; return { ...p, land: b.land || null, sign: b.sign || null, licenses: b.licenses || [], src: p, year: y }; };
  function saveYear(p, y, data) { p.byYear[y] = data; if (y === CUR_YEAR) Object.assign(p, data); }
  function addTaxpayer(info, y, data) { const p = { ...info, land: null, sign: null, licenses: [], notified: false, byYear: {} }; saveYear(p, y, data); TAXPAYERS.unshift(p); return p; }
  const d = s => (s ? new Date(s) : null);
  const thDate = s => s ? new Date(s).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
  const money = v => Number(v || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Land / signboard: penalty <15d 10%, >15d 20%, >1 month 40%; surcharge 1%/month (partial month = 1)
  function calcTax(t) {
    if (!t) return null;
    const ref = d(t.paid) || TODAY;
    const days = Math.max(0, Math.floor((ref - d(t.due)) / 86400000));
    const months = days > 0 ? Math.ceil(days / 30) : 0;
    const autoRate = days === 0 ? 0 : days < 15 ? 0.10 : days <= 30 ? 0.20 : 0.40;
    const rate = t.penaltyRate == null || t.penaltyRate === '' ? autoRate : Number(t.penaltyRate);
    const sRate = t.surchargeRate == null || t.surchargeRate === '' ? 0.01 : Number(t.surchargeRate);
    const penalty = Math.round(t.assess * rate * 100) / 100;
    const surcharge = Math.round(t.assess * sRate * months * 100) / 100;
    return { ...t, days, months, rate, autoRate, sRate, penalty, surcharge, total: Math.round((t.assess + penalty + surcharge) * 100) / 100 };
  }
  // Signboard: due = notice date + 15 days. เงินเพิ่มชำระล่าช้า 1%/month (editable override), เงินเพิ่มยื่นแบบล่าช้า 0/5/10%, pay full / installment 1 (1/3) / custom.
  function calcSign(t) {
    if (!t) return null;
    const r2 = n => Math.round(n * 100) / 100;
    const due = t.noticeDate ? new Date(d(t.noticeDate).getTime() + 15 * 86400000).toISOString().slice(0, 10) : t.due;
    const ref = d(t.paid) || TODAY;
    const days = due ? Math.max(0, Math.floor((ref - d(due)) / 86400000)) : 0;
    const months = days > 0 ? Math.ceil(days / 30) : 0;
    const assess = Number(t.assess) || 0;
    const autoSurcharge = r2(assess * 0.01 * months);
    const surcharge = t.surchargeAmt == null || t.surchargeAmt === '' ? autoSurcharge : r2(Number(t.surchargeAmt) || 0);
    // Auto late-filing: ภ.ป.1 due 31 Mar of the tax year. Not filed (found by officer) → 10%; filed after deadline → 5%.
    const taxYear = (t.noticeDate || t.filedDate || TODAY.toISOString()).slice(0, 4);
    const fileDeadline = taxYear + '-03-31';
    const autoLateRate = t.notFiled ? 0.10 : t.filedDate && t.filedDate > fileDeadline ? 0.05 : 0;
    const lateAuto = t.lateFilingRate == null || t.lateFilingRate === '' || t.lateFilingRate === 'auto';
    const lateRate = lateAuto ? autoLateRate : Number(t.lateFilingRate) || 0;
    const lateFiling = r2(assess * lateRate);
    const total = r2(assess + surcharge + lateFiling);
    const payMode = t.payMode || 'full';
    const payAmount = payMode === 'inst1' ? r2(Math.ceil(total / 3 * 100) / 100) : payMode === 'custom' ? r2(Number(t.payAmount) || 0) : total;
    return { ...t, due, days, months, assess, autoSurcharge, surcharge, lateRate, lateAuto, autoLateRate, fileDeadline, lateFiling, penalty: 0, rate: 0, sRate: 0.01, payMode, payAmount, total };
  }
  // License: fine 20% of outstanding fee, only for หนังสือรับรองการแจ้ง
  function calcLicense(l) {
    if (!l) return null;
    const outstanding = l.fee * l.years;
    const fine = l.type === 'หนังสือรับรองการแจ้ง' ? outstanding * 0.2 : 0;
    return { ...l, outstanding, fine, total: outstanding + fine };
  }
  function statusOf(kind, t) {
    if (!t) return 'other';
    if (t.review) return 'review';
    if (kind === 'license') {
      if (t.years > 0) return 'overdue';
      const left = (d(t.expire) - TODAY) / 86400000;
      return left <= 45 ? 'expiring' : 'paid';
    }
    if (t.paid) return 'paid';
    return d(t.due) < TODAY ? 'overdue' : 'unpaid';
  }
  // Flatten to registry rows
  function rows(y = CUR_YEAR) {
    const out = [];
    TAXPAYERS.map(t => view(t, y)).forEach(p => {
      if (p.land) { const c = calcTax(p.land); out.push({ id: p.id + '-L-' + y, kind: 'land', label: 'ภาษีที่ดินและสิ่งปลูกสร้าง', p, total: c.paid ? c.assess : c.total, due: p.land.due, paid: p.land.paidNoDate ? null : p.land.paid, status: statusOf('land', p.land) }); }
      if (p.sign) { const c = calcSign(p.sign); out.push({ id: p.id + '-S-' + y, kind: 'sign', label: 'ภาษีป้าย', p, total: c.paid ? c.assess : c.total, due: c.due, paid: p.sign.paidNoDate ? null : p.sign.paid, status: statusOf('sign', p.sign) }); }
      p.licenses.forEach((l, i) => { const c = calcLicense(l); out.push({ id: p.id + '-C' + i + '-' + y, kind: 'license', label: l.type + (l.no ? ' (' + l.no + ')' : ''), p, lic: l, total: c.total || c.fee, due: l.expire, paid: c.years === 0 ? '2025-11-02' : null, status: statusOf('license', l) }); });
    });
    return out;
  }
  const HISTORY = [
    { id: 'PAY-690320-0012', detail: 'ภาษีป้าย ปี 2569', date: '2026-03-20', amount: 1200, method: 'QR PromptPay', status: 'paid', slip: 'slip-690320-0012.jpg' },
    { id: 'PAY-681115-0087', detail: 'ภาษีที่ดินและสิ่งปลูกสร้าง ปี 2568', date: '2025-11-15', amount: 2640, method: 'QR PromptPay', status: 'paid', slip: 'slip-681115-0087.jpg' },
    { id: 'PAY-680402-0031', detail: 'หนังสือรับรองการแจ้ง ปี 2568', date: '2025-04-02', amount: 1000, method: 'เงินสด', status: 'paid', slip: 'receipt-680402-0031.pdf' }
  ];
  const NOTIFS = [
    { id: 1, to: 'สมชาย ใจดี', subject: 'แจ้งเตือนภาษีที่ดินเกินกำหนด', detail: 'ยอดค้างชำระ 3,600.00 บาท กรุณาชำระภายใน 31 ต.ค. 2569', status: 'paid', label: 'ส่งสำเร็จ', date: '2026-10-05' },
    { id: 2, to: 'ร้านกาแฟบ้านสวน', subject: 'ใบอนุญาตค้างชำระ 2 ปี', detail: 'ค่าธรรมเนียมค้าง 1,000.00 บาท + ค่าปรับ 200.00 บาท', status: 'unpaid', label: 'รอส่ง', date: '2026-10-07' },
    { id: 3, to: 'หจก. แม่ริมการช่าง', subject: 'ใบอนุญาตใกล้หมดอายุ', detail: 'ใบอนุญาต กจ.099/2569 หมดอายุ 20 ต.ค. 2569', status: 'review', label: 'อ่านแล้ว', date: '2026-10-01' },
    { id: 4, to: 'นางสาวมณี ศรีสุข', subject: 'แจ้งเตือนภาษีที่ดินเกินกำหนด', detail: 'ผู้รับยังไม่เชื่อมต่อ LINE OA', status: 'overdue', label: 'ส่งไม่สำเร็จ', date: '2026-09-28' }
  ];
  const TXNS = [
    { id: 'TXN-691007-0004', payer: 'นายประยุทธ มั่นคง', detail: 'ภาษีที่ดินและสิ่งปลูกสร้าง ปี 2569', amount: 8064, date: '2026-09-30', method: 'QR PromptPay', slip: 'slip-690930.jpg', status: 'review' },
    { id: 'TXN-691006-0003', payer: 'สมชาย ใจดี', detail: 'ภาษีที่ดิน + หนังสือรับรองการแจ้ง', amount: 4560, date: '2026-10-06', method: 'QR PromptPay', slip: 'slip-691006.jpg', status: 'review' },
    { id: 'TXN-690429-0002', payer: 'หจก. แม่ริมการช่าง', detail: 'ภาษีที่ดินและสิ่งปลูกสร้าง ปี 2569', amount: 9800, date: '2026-04-29', method: 'QR PromptPay', slip: 'slip-690429.jpg', status: 'paid' },
    { id: 'TXN-690412-0001', payer: 'บริษัท ดอนแก้วค้าวัสดุ จำกัด', detail: 'ภาษีที่ดินและสิ่งปลูกสร้าง ปี 2569', amount: 18500, date: '2026-04-12', method: 'โอนผ่านธนาคาร', slip: 'slip-690412.pdf', status: 'paid' }
  ];
  const REGISTRANTS = [
    { id: 1, taxId: '3501200456789', name: 'นางสาวมณี ศรีสุข', phone: '089-765-4321', date: '2026-10-07', status: 'review' },
    { id: 2, taxId: '0503558000456', name: 'ร้านกาแฟบ้านสวน', phone: '086-555-1188', date: '2026-10-06', status: 'review' },
    { id: 3, taxId: '3500100123456', name: 'สมชาย ใจดี', phone: '081-234-5678', date: '2026-09-12', status: 'paid' }
  ];
  const YEARS = [0, 1, 2, 3].map(i => { const y = String(Number(CUR_YEAR) - i); return { value: y, label: 'ปีงบประมาณ ' + y + (i === 0 ? ' (ปัจจุบัน)' : '') }; });
  window.DK = { TODAY, ROLES, ACCOUNTS, TAXPAYERS, HISTORY, NOTIFS, TXNS, REGISTRANTS, YEARS, calcTax, calcSign, calcLicense, statusOf, rows, view, saveYear, addTaxpayer, CUR_YEAR, fiscalYear, thDate, money };
})();
