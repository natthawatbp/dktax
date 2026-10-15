// LINE OA message preview (chat bubble + Flex-style card) for tax reminders.
function LinePreview({ r, sent }) {
  const PP = window.PromptPay, cfg = PP ? PP.load() : {};
  const status = { overdue: ['เกินกำหนดชำระ', '#e5383b'], unpaid: ['รอชำระ', '#f4a100'], expiring: ['ใกล้หมดอายุ', '#f4a100'], review: ['รอตรวจสอบ', '#6c7a91'], paid: ['ชำระแล้ว', '#06c755'] }[r.status] || ['แจ้งเตือน', '#153e75'];
  const now = new Date(), time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  const kv = (k, v, b) => <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12.5, padding: '3px 0' }}><span style={{ color: '#8a94a3' }}>{k}</span><span style={{ fontWeight: b ? 700 : 500, color: b ? '#153e75' : '#1d2735', textAlign: 'right' }}>{v}</span></div>;
  return (
    <div style={{ background: '#8cabd9', borderRadius: 14, overflow: 'hidden', maxWidth: 380, margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      <div style={{ background: '#fff', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #e3e7ee' }}>
        <i className="fas fa-chevron-left" style={{ color: '#1d2735' }}></i>
        <div style={{ fontWeight: 600, fontSize: 14, flex: 1 }}>DK One Tax Bill <i className="fas fa-check-circle" style={{ color: '#06c755', fontSize: 12 }}></i></div>
        <i className="fas fa-bars" style={{ color: '#8a94a3' }}></i>
      </div>
      <div style={{ padding: '14px 12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ textAlign: 'center' }}><span style={{ background: 'rgba(0,0,0,.18)', color: '#fff', fontSize: 11, padding: '2px 10px', borderRadius: 10 }}>วันนี้</span></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <img src="../../assets/logo-long.png" alt="" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', objectPosition: 'right', background: '#fff', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11, color: '#fff' }}>DK One Tax Bill</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ background: '#fff', borderRadius: '4px 16px 16px 16px', padding: '9px 12px', fontSize: 13, lineHeight: 1.5, maxWidth: 260 }}>เรียน {r.p.name}<br />เทศบาลเมืองดอนแก้วขอแจ้งรายการ{r.label}ที่ต้องชำระ รายละเอียดตามด้านล่างค่ะ</div>
              <span style={{ fontSize: 10, color: '#fff', whiteSpace: 'nowrap' }}>{time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', width: 260, boxShadow: '0 1px 2px rgba(0,0,0,.08)' }}>
                <div style={{ background: '#153e75', color: '#fff', padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, opacity: .85 }}>ใบแจ้งภาระภาษีและค่าธรรมเนียม</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{r.label}</div>
                  <span style={{ display: 'inline-block', marginTop: 6, background: status[1], fontSize: 11, fontWeight: 600, padding: '1px 9px', borderRadius: 10 }}>{status[0]}</span>
                </div>
                <div style={{ padding: '10px 14px' }}>
                  {kv('ผู้เสียภาษี', r.p.name)}
                  {kv('เลขที่เสียภาษี', r.p.id)}
                  {kv('ปีงบประมาณ', r.p.year)}
                  {kv(r.kind === 'license' ? 'วันหมดอายุ' : 'ครบกำหนดชำระ', DK.thDate(r.due))}
                  <div style={{ borderTop: '1px dashed #dde4ee', margin: '6px 0' }}></div>
                  {kv('ยอดที่ต้องชำระ', DK.money(r.total) + ' บาท', true)}
                  {r.status === 'overdue' ? <div style={{ fontSize: 11, color: '#e5383b', marginTop: 4 }}>ยอดรวมเบี้ยปรับ/เงินเพิ่ม ณ วันที่ {DK.thDate(DK.TODAY)}</div> : null}
                </div>
                <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ background: '#06c755', color: '#fff', textAlign: 'center', borderRadius: 8, padding: '8px 0', fontSize: 13, fontWeight: 600 }}>ชำระเงินผ่าน QR พร้อมเพย์</div>
                  <div style={{ border: '1px solid #cdd8e6', color: '#153e75', textAlign: 'center', borderRadius: 8, padding: '7px 0', fontSize: 13, fontWeight: 500 }}>ดูรายละเอียด / ใบแจ้ง PDF</div>
                </div>
              </div>
              <span style={{ fontSize: 10, color: '#fff', whiteSpace: 'nowrap' }}>{time}</span>
            </div>
            {cfg.cashOn !== 'off' ? <div style={{ background: '#fff', borderRadius: 16, padding: '8px 12px', fontSize: 12, lineHeight: 1.5, maxWidth: 260, color: '#55606e' }}>ชำระเงินสดได้ที่ {cfg.cashPoint}<br />{cfg.cashHours}</div> : null}
          </div>
        </div>
        {sent ? <div style={{ textAlign: 'right', fontSize: 10, color: '#fff' }}>ส่งแล้ว</div> : null}
      </div>
    </div>
  );
}
Object.assign(window, { LinePreview });
