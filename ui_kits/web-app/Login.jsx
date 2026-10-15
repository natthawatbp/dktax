
function Login({ onLogin, accounts, setAccounts }) {
  const [u, setU] = React.useState('');
  const [p, setP] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const [regOpen, setRegOpen] = React.useState(false);
  const [reg, setReg] = React.useState({ taxId: '', name: '', phone: '', password: '' });
  const [regErr, setRegErr] = React.useState('');
  const [regDone, setRegDone] = React.useState(null);

  const submit = e => {
    e && e.preventDefault();
    if (!u || !p) return setErr('กรุณากรอก Username และ Password');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const acc = accounts.find(a => a.username === u.trim() && a.password === p);
      if (!acc) return setErr('Username หรือ Password ไม่ถูกต้อง');
      if (acc.pending) return setErr('บัญชีของท่านอยู่ระหว่างรอ Admin ยืนยัน');
      onLogin(acc);
    }, 600);
  };
  const doRegister = () => {
    if (!reg.taxId || !reg.name || !reg.phone || !reg.password) return setRegErr('กรุณากรอกข้อมูลให้ครบถ้วน');
    if (reg.password.length < 8) return setRegErr('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
    setAccounts([...accounts, { username: reg.taxId, password: reg.password, role: 'citizen', name: reg.name, phone: reg.phone, taxId: reg.taxId, pending: true }]);
    setRegOpen(false); setRegErr(''); setRegDone({ ...reg }); setReg({ taxId: '', name: '', phone: '', password: '' });
  };
  const f = k => e => setReg({ ...reg, [k]: e.target.value });

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f2f5e 0%, #153e75 45%, #2563b0 100%)', padding: 20 }}>
      <style>{'.lg-card .input-group{border:1px solid #d6dfec;border-radius:14px;overflow:hidden;background:#f7f9fd;flex-wrap:nowrap}.lg-card .input-group>*{border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}.lg-card .input-group:focus-within{border-color:#2563b0;box-shadow:0 0 0 4px rgba(37,99,176,.15)}.lg-card .form-control{height:54px}.lg-card .btn{border-radius:14px!important;height:56px;font-weight:600}.lg-card .btn-primary{background:linear-gradient(90deg,#153e75,#2563b0)!important;border:0!important;box-shadow:0 10px 22px rgba(21,62,117,.28)}.lg-card .btn-outline-primary{background:#fff;border-color:#c9d6ea}'}</style>
      <div style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', background: 'rgba(255,255,255,.07)', top: -200, right: -140 }}></div>
      <div style={{ position: 'absolute', width: 460, height: 460, borderRadius: '50%', background: 'rgba(255,255,255,.07)', bottom: -230, left: -150 }}></div>
      <form className="lg-card" onSubmit={submit} style={{ position: 'relative', background: 'rgba(255,255,255,.97)', borderRadius: 28, boxShadow: '0 24px 60px rgba(8,24,52,.35)', padding: '36px 40px 40px', width: '100%', maxWidth: 480, textAlign: 'center' }}>
        <div className="d-flex justify-content-center mb-3"><Logo maxWidth={380} /></div>
        <h4 className="mb-2 fw-bold" style={{ color: 'var(--primary)' }}>DK One Tax Bill</h4>
        <p className="text-muted mb-4">ระบบรวมใบแจ้งภาระภาษีและค่าธรรมเนียม<br />เทศบาลเมืองดอนแก้ว</p>
        <Input className="mb-3" label="Username" icon="fas fa-user" placeholder="เลขประจำตัวผู้เสียภาษี / Username" value={u} onChange={e => setU(e.target.value)} />
        <Input className="mb-4" label="Password" type="password" icon="fas fa-lock" placeholder="รหัสผ่าน" value={p} onChange={e => setP(e.target.value)} />
        <Button type="submit" size="lg" block icon="fas fa-sign-in-alt" loading={loading} className="fw-bold">{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</Button>
        <Button type="button" variant="outline" size="lg" block icon="fas fa-user-plus" className="mt-2" onClick={() => setRegOpen(true)}>ลงทะเบียน</Button>
      </form>

      <AppModal open={regOpen} onClose={() => setRegOpen(false)} icon="fas fa-user-plus" title="ลงทะเบียนผู้ใช้งาน"
        footer={<><Button variant="secondary" onClick={() => setRegOpen(false)}>ยกเลิก</Button><Button icon="fas fa-check" onClick={doRegister}>ลงทะเบียน</Button></>}>
        <p className="text-muted small mb-3">สำหรับประชาชน / ผู้เสียภาษี</p>
        {regErr ? <div className="alert alert-danger py-2 small"><i className="fas fa-exclamation-circle me-1"></i>{regErr}</div> : null}
        <Input className="mb-3" label="เลขประจำตัวประชาชน / เลขนิติบุคคล" placeholder="เลข 13 หลัก" maxLength={13} value={reg.taxId} onChange={f('taxId')} />
        <Input className="mb-3" label="ชื่อ – นามสกุล / ชื่อสถานประกอบการ" placeholder="ชื่อและนามสกุล" value={reg.name} onChange={f('name')} />
        <Input className="mb-3" label="เบอร์โทรศัพท์" placeholder="0xx-xxx-xxxx" value={reg.phone} onChange={f('phone')} />
        <Input label="รหัสผ่าน (อย่างน้อย 8 ตัว)" type="password" placeholder="กำหนดรหัสผ่าน" value={reg.password} onChange={f('password')} />
      </AppModal>

      <AppModal open={!!regDone} onClose={() => setRegDone(null)} tone="success" icon="fas fa-check-circle" title="ลงทะเบียนสำเร็จ" centeredBody>
        <i className="fas fa-user-clock mb-3" style={{ fontSize: 44, color: 'var(--status-paid)' }}></i>
        <h5 className="mb-3">ลงทะเบียนสำเร็จ รอ Admin กดยืนยัน</h5>
        {regDone ? <div className="d-inline-block text-start p-3 rounded-3" style={{ background: 'var(--blue-50)', minWidth: 260 }}>
          <div className="d-flex justify-content-between gap-3"><span className="text-muted">Username</span><b>{regDone.taxId}</b></div>
          <div className="d-flex justify-content-between gap-3"><span className="text-muted">Password</span><b>{regDone.password}</b></div>
        </div> : null}
      </AppModal>

      <AppModal open={!!err} onClose={() => setErr(null)} tone="danger" icon="fas fa-exclamation-triangle" title="แจ้งเตือน" centeredBody>
        <h5 className="mb-0 text-danger">{err}</h5>
      </AppModal>
    </div>
  );
}
window.Login = Login;
