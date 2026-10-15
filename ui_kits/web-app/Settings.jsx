function Settings({ year, setYear }) {
  const PP = window.PromptPay;
  const [s, setS] = React.useState(PP.load());
  const [msg, setMsg] = React.useState(null);
  const [preview, setPreview] = React.useState(false);
  const set = k => e => setS({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px 20px' };
  const validJson = t => { try { JSON.parse(t); return true; } catch (e) { return false; } };
  const save = () => {
    const pp = s.promptpayId.replace(/\D/g, ''), bl = s.billerId.replace(/\D/g, '');
    if (pp && pp.length !== 10 && pp.length !== 13) return setMsg({ tone: 'danger', title: 'บันทึกไม่สำเร็จ', text: 'PromptPay ID ต้องเป็นตัวเลข 10 หรือ 13 หลัก' });
    if (bl && bl.length !== 15) return setMsg({ tone: 'danger', title: 'บันทึกไม่สำเร็จ', text: 'Biller ID ต้องเป็นตัวเลข 15 หลัก' });
    if (s.qrType === 'biller' && !bl) return setMsg({ tone: 'danger', title: 'บันทึกไม่สำเร็จ', text: 'เลือกรูปแบบ Bill Payment ต้องกรอก Biller ID' });
    if (!validJson(s.licensesMap) || !validJson(s.paymentsMap)) return setMsg({ tone: 'danger', title: 'บันทึกไม่สำเร็จ', text: 'รูปแบบ JSON ของ mapping ไม่ถูกต้อง' });
    PP.save(s); setMsg({ tone: 'success', title: 'บันทึกการตั้งค่าแล้ว', text: 'การตั้งค่าใหม่มีผลกับหน้าชำระเงินทันที' });
  };
  const testPayload = PP.payload(1, 'TEST0001', 'DK', s);
  return (
    <div>
      <PageHead title="ตั้งค่าระบบ" sub="กำหนดบัญชีรับเงิน LINE OA และการจับคู่คอลัมน์ต้นทาง" right={<Select options={DK.YEARS} value={year} onChange={e => setYear(e.target.value)} />} />
      <div className="d-flex flex-column" style={{ gap: 24 }}>
        <Card title="บัญชีรับชำระเงิน" icon="fas fa-university">
          <div style={grid}>
            <Select label="เปิดรับชำระออนไลน์" value={s.online} onChange={set('online')} options={[{ value: 'on', label: 'เปิดใช้งาน' }, { value: 'off', label: 'ปิดไว้ก่อน' }]} />
            <Select label="รูปแบบ QR" value={s.qrType} onChange={set('qrType')} options={[{ value: 'promptpay', label: 'PromptPay (ตรวจรับเงินด้วยเจ้าหน้าที่)' }, { value: 'biller', label: 'Bill Payment / Biller ID (กระทบยอดอัตโนมัติ)' }]} />
            <Input label="ชื่อบัญชีผู้รับเงิน" value={s.accountName} onChange={set('accountName')} hint="ชื่อที่แสดงในแอปธนาคารมาจากการลงทะเบียนพร้อมเพย์/Biller กับธนาคาร" />
            <Input label="PromptPay ID (10 หรือ 13 หลัก)" value={s.promptpayId} onChange={set('promptpayId')} inputMode="numeric" />
            <Input label="Biller ID (15 หลัก)" value={s.billerId} onChange={set('billerId')} inputMode="numeric" />
            <Input label="จำนวนวันแจ้งใกล้หมดอายุ" type="number" value={s.expiryDays} onChange={set('expiryDays')} />
            <Input label="ธนาคาร (โอนเงินเอง)" value={s.bankName} onChange={set('bankName')} />
            <Input label="เลขที่บัญชี" value={s.bankAccount} onChange={set('bankAccount')} inputMode="numeric" />
            <Select label="รับชำระเงินสดที่เคาน์เตอร์" value={s.cashOn} onChange={set('cashOn')} options={[{ value: 'on', label: 'เปิดใช้งาน' }, { value: 'off', label: 'ปิด' }]} />
            <Input label="จุดรับชำระเงินสด" value={s.cashPoint} onChange={set('cashPoint')} />
            <Input label="วัน-เวลาทำการ" value={s.cashHours} onChange={set('cashHours')} />
          </div>
          <div className="d-flex align-items-center justify-content-between flex-wrap mt-3" style={{ gap: 12 }}>
            <Checkbox label="ตรวจสอบบัญชีรับเงินของเทศบาลและทดลอง QR กับธนาคารแล้ว" checked={s.verified} onChange={set('verified')} />
            <Button variant="outline" size="sm" icon="fas fa-qrcode" onClick={() => setPreview(true)}>ทดลอง QR (1.00 บาท)</Button>
          </div>
        </Card>
        <Card title="LINE OA และ LINE Login" icon="fab fa-line">
          <div style={grid}>
            <Input label="LINE Login Channel ID" value={s.lineChannelId} onChange={set('lineChannelId')} />
            <Input label="LINE OA URL เช่น https://lin.ee/..." value={s.lineOaUrl} onChange={set('lineOaUrl')} />
            <Input label="LINE Login Channel Secret (เว้นว่างเพื่อคงเดิม)" type="password" value={s.lineSecret} onChange={set('lineSecret')} />
            <Input label="Messaging API Channel Access Token (เว้นว่างเพื่อคงเดิม)" type="password" value={s.lineToken} onChange={set('lineToken')} />
          </div>
          <div className="small text-muted mt-3">LINE Login และ Messaging API ต้องอยู่ใน Provider เดียวกัน ใช้ Web App URL เป็น Callback URL ของ LINE Login เปิด scope: openid profile และให้ประชาชนเพิ่มเพื่อน OA</div>
          <div className="small mt-2 d-flex flex-wrap" style={{ gap: 8 }}>Messaging token: <StatusBadge status={s.lineToken ? 'paid' : 'other'} label={s.lineToken ? 'ตั้งค่าแล้ว' : 'ยังไม่ตั้งค่า'} /> Login secret: <StatusBadge status={s.lineSecret ? 'paid' : 'other'} label={s.lineSecret ? 'ตั้งค่าแล้ว' : 'ยังไม่ตั้งค่า'} /></div>
        </Card>
        <Card title="เชื่อมข้อมูล Licenses และ Payments" icon="fas fa-table" actions={<Button variant="secondary" size="sm" icon="fas fa-sync-alt" onClick={() => setMsg({ tone: 'success', title: 'อ่านหัวคอลัมน์สำเร็จ', text: 'พบชีต Licenses และ Payments ในไฟล์ต้นทาง' })}>อ่านหัวคอลัมน์ต้นทาง</Button>}>
          <Input label="Spreadsheet ID ต้นทาง" value={s.sheetId} onChange={set('sheetId')} />
          <div style={{ ...grid, marginTop: 18 }}>
            {[['licensesMap', 'Licenses mapping'], ['paymentsMap', 'Payments mapping']].map(([k, l]) => (
              <div key={k}>
                <label className="form-label fw-bold">{l} <span className="fw-normal text-muted">(JSON: ชื่อฟิลด์ระบบ → หัวคอลัมน์จริง)</span></label>
                <textarea className={'form-control' + (validJson(s[k]) ? '' : ' is-invalid')} rows="9" value={s[k]} onChange={set(k)} spellCheck="false" style={{ fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: 14 }}></textarea>
              </div>
            ))}
          </div>
        </Card>
        <div className="d-flex justify-content-end" style={{ gap: 10 }}>
          <Button variant="secondary" onClick={() => setS(PP.load())}>ยกเลิก</Button>
          <Button icon="fas fa-save" onClick={save}>บันทึกการตั้งค่า</Button>
        </div>
      </div>
      <AppModal open={preview} onClose={() => setPreview(false)} icon="fas fa-qrcode" title="ทดลอง QR 1.00 บาท" centeredBody>
        {testPayload ? <img src={PP.imageUrl(testPayload)} width="200" height="200" alt="QR ทดลอง" /> : <div className="text-danger">กรอก PromptPay ID หรือ Biller ID ก่อน</div>}
        <div className="small text-muted mt-3">สแกนแล้วตรวจว่าแอปธนาคารแสดงชื่อผู้รับ “{s.accountName}”</div>
      </AppModal>
      <AppModal open={!!msg} onClose={() => setMsg(null)} tone={msg && msg.tone} icon={msg && msg.tone === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'} title={msg && msg.title} centeredBody>{msg && msg.text}</AppModal>
    </div>
  );
}
Object.assign(window, { Settings });
