// Payment config + Thai QR payload builder (PromptPay tag 29 / Bill Payment tag 30, EMVCo + CRC16).
// Values are editable in หน้า ตั้งค่าระบบ (saved to localStorage 'dk_settings').
(function () {
  const DEFAULTS = {
    online: 'on', qrType: 'promptpay', accountName: 'เทศบาลเมืองดอนแก้ว', promptpayId: '0994000424621', billerId: '', expiryDays: 30, verified: false,
    cashOn: 'on', cashPoint: 'กองคลัง ชั้น 1 สำนักงานเทศบาลเมืองดอนแก้ว', cashHours: 'จันทร์–ศุกร์ 08:30–16:30 น. (เว้นวันหยุดราชการ)',
    bankName: 'ธนาคารกรุงไทย', bankShort: 'KTB', bankAccount: '9801192712',
    lineChannelId: '', lineOaUrl: '', lineSecret: '', lineToken: '',
    sheetId: '1W4PxRNkWAKHoJ5RXwL697qxYcicsMRN4VLoX0I9Jtfo',
    licensesMap: '{\n  "TaxID": "เลขประจำตัวประชาชน",\n  "Name": "ชื่อ-สกุล",\n  "Reference": "LicenseNo",\n  "FiscalYear": "IssueDate",\n  "Principal": "จำนวนเงิน",\n  "DueDate": "ExpireDate",\n  "Address": "ที่อยู่",\n  "Phone": "เบอร์โทร"\n}',
    paymentsMap: '{\n  "Reference": "LicenseNo",\n  "PaidDate": "วันที่ชำระ",\n  "PaidAmount": "จำนวนเงินที่ชำระ",\n  "Receipt": "เลขที่ใบเสร็จ"\n}'
  };
  const load = () => { try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem('dk_settings') || '{}')); } catch (e) { return Object.assign({}, DEFAULTS); } };
  const save = s => localStorage.setItem('dk_settings', JSON.stringify(s));
  const f = (id, v) => id + String(v.length).padStart(2, '0') + v;
  function crc16(s) {
    let crc = 0xFFFF;
    for (let i = 0; i < s.length; i++) { crc ^= s.charCodeAt(i) << 8; for (let j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF; }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
  const clean = r => String(r || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
  function payload(amount, ref, ref2, cfg = load()) {
    let merchant;
    if (cfg.qrType === 'biller' && cfg.billerId) {
      merchant = f('30', f('00', 'A000000677010112') + f('01', cfg.billerId.replace(/\D/g, '')) + f('02', clean(ref) || 'DK') + (ref2 ? f('03', clean(ref2)) : ''));
    } else {
      const d = String(cfg.promptpayId || '').replace(/\D/g, '');
      if (!d) return '';
      const acct = d.length >= 13 ? f('02', d) : f('01', ('0000000000000' + d.replace(/^0/, '66')).slice(-13));
      merchant = f('29', f('00', 'A000000677010111') + acct);
    }
    let p = f('00', '01') + f('01', amount ? '12' : '11') + merchant + f('53', '764') + f('58', 'TH');
    if (amount) p += f('54', Number(amount).toFixed(2));
    if (cfg.qrType !== 'biller' && ref) p += f('62', f('05', clean(ref)));
    p += '6304';
    return p + crc16(p);
  }
  const enabled = (cfg = load()) => cfg.online === 'on' && (cfg.qrType === 'biller' ? !!cfg.billerId : !!cfg.promptpayId);
  const fmtAcct = a => { const d = String(a || '').replace(/\D/g, ''); return d.length === 10 ? d.slice(0, 3) + '-' + d[3] + '-' + d.slice(4, 9) + '-' + d[9] : a; };
  const imageUrl = (data, size = 220) => 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&margin=8&ecc=M&data=' + encodeURIComponent(data);
  window.PromptPay = { DEFAULTS, load, save, payload, enabled, fmtAcct, imageUrl };
})();
