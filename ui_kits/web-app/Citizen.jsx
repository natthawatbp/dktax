function UserHead({ user, year, setYear }) {
  return (
    <Card padding="16px 20px" className="mb-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <span className="d-inline-flex align-items-center justify-content-center text-white fw-bold" style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary)', fontSize: 20 }}>{user.name.charAt(0)}</span>
          <div><h5 className="fw-bold mb-0">{user.name}</h5><small className="text-muted">เลขผู้เสียภาษี {user.taxId}</small></div>
        </div>
        <Select options={DK.YEARS} value={year} onChange={e => setYear(e.target.value)} />
      </div>
    </Card>
  );
}

function myItems(taxId) {
  return DK.rows().filter(r => r.p.id === taxId).map(r => ({ ...r, owner: r.p.name }));
}

function MyBills({ user, year, setYear }) {
  const items = myItems(user.taxId);
  const open = items.filter(r => r.status !== 'paid');
  const [sel, setSel] = React.useState(open.map(r => r.id));
  const [pay, setPay] = React.useState(false);
  const [slip, setSlip] = React.useState(null);
  const [done, setDone] = React.useState(null);
  const [line, setLine] = React.useState(false);
  const [method, setMethod] = React.useState('online');
  const [cashDone, setCashDone] = React.useState(null);
  const outstanding = open.reduce((s, r) => s + r.total, 0);
  const selTotal = items.filter(r => sel.includes(r.id)).reduce((s, r) => s + r.total, 0);
  const payRef = 'DK' + user.taxId.slice(-6) + String(Math.round(selTotal * 100)).padStart(8, '0');
  const PP = window.PromptPay, cfg = PP.load(), qrOn = PP.enabled(cfg), cashOn = cfg.cashOn !== 'off';
  const isCash = method === 'cash' && cashOn;
  const selItems = items.filter(r => sel.includes(r.id));
  const toggle = id => setSel(sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  return (
    <div>
      <UserHead user={user} year={year} setYear={setYear} />
      <div className="mb-3 p-4 text-white d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ borderRadius: 'var(--radius-card)', background: 'var(--gradient-login)', boxShadow: 'var(--shadow-card)' }}>
        <div>
          <div style={{ opacity: .85 }}>ยอดคงค้างประจำปี {year}</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.2 }}>{DK.money(outstanding)} <span className="fs-5 fw-normal">บาท</span></div>
          <div style={{ opacity: .85 }}><i className="fas fa-file-invoice me-1"></i>ค้างชำระ {open.length} รายการ</div>
        </div>
        <button className="btn btn-light btn-lg fw-bold d-inline-flex align-items-center gap-2" style={{ color: 'var(--primary)', whiteSpace: 'nowrap', flexShrink: 0 }} disabled={!sel.length} onClick={() => setPay(true)}><i className="fas fa-wallet"></i>ชำระรายการที่เลือก ({sel.length})</button>
      </div>
      <Card title="ภาษีและค่าธรรมเนียมของคุณ" icon="fas fa-list-ul" padding="20px 20px 12px">
        <DataTable rows={items} columns={[
          { key: 'c', title: 'เลือก', width: 60, render: r => r.status === 'paid' ? <i className="fas fa-check text-success ms-1"></i> : <Checkbox checked={sel.includes(r.id)} onChange={() => toggle(r.id)} /> },
          { key: 'l', title: 'รายการ / ผู้มีหน้าที่ชำระ', render: r => <div><div className="fw-medium">{r.label}</div><small className="text-muted">{r.owner} · ครบกำหนด {DK.thDate(r.due)}</small></div> },
          { key: 't', title: 'จำนวนเงิน', align: 'end', render: r => <b>{DK.money(r.total)}</b> },
          { key: 's', title: 'สถานะ', align: 'center', render: r => <StatusBadge status={r.status} /> }
        ]} footer={<tr><td colSpan={2} className="fw-bold border-0 pt-3">ยอดที่เลือก {sel.length} รายการ</td><td className="text-end border-0 pt-3" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{DK.money(selTotal)}</td><td className="border-0"></td></tr>} />
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border-card)' }}>
          <small className="text-muted">รับการแจ้งเตือนยอดค้างชำระและใบเสร็จผ่าน LINE</small>
          <Button variant="line" icon="fab fa-line" onClick={() => setLine(true)}>การแจ้งเตือนผ่าน LINE OA</Button>
        </div>
      </Card>

      <AppModal open={pay} onClose={() => setPay(false)} icon={isCash ? 'fas fa-money-bill-wave' : qrOn ? 'fas fa-qrcode' : 'fas fa-university'} title={isCash ? 'ชำระเงินสดที่เคาน์เตอร์' : qrOn ? 'ชำระเงินผ่าน QR Code' : 'ชำระเงิน / โอนเงิน'}
        footer={<><Button variant="secondary" onClick={() => setPay(false)}>ยกเลิก</Button>{isCash
          ? <Button icon="fas fa-check" onClick={() => { setPay(false); setCashDone(selTotal); }}>ยืนยันชำระเงินสด</Button>
          : <Button icon="fas fa-paper-plane" disabled={!slip} onClick={() => { setPay(false); setDone(selTotal); setSlip(null); }}>ส่งหลักฐานการชำระ</Button>}</>}>
        <div className="text-center">
          <div className="text-muted">ยอดชำระ {sel.length} รายการ</div>
          <div className="mb-3" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{DK.money(selTotal)} บาท</div>
          {cashOn ? <div className="btn-group w-100 mb-3" role="group">
            <button type="button" className={'btn ' + (!isCash ? 'btn-primary' : 'btn-outline-primary')} onClick={() => setMethod('online')}><i className={(qrOn ? 'fas fa-qrcode' : 'fas fa-university') + ' me-2'}></i>{qrOn ? 'QR / โอนเงิน' : 'โอนเงิน'}</button>
            <button type="button" className={'btn ' + (isCash ? 'btn-primary' : 'btn-outline-primary')} onClick={() => setMethod('cash')}><i className="fas fa-money-bill-wave me-2"></i>เงินสด</button>
          </div> : null}
          {isCash ? <div className="text-start">
            <div className="rounded-3 p-3 mb-3" style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)' }}>
              <div className="d-flex gap-3 align-items-start mb-2"><i className="fas fa-map-marker-alt mt-1" style={{ color: 'var(--primary)', width: 16 }}></i><div><div className="small text-muted">จุดรับชำระ</div><div className="fw-medium">{cfg.cashPoint}</div></div></div>
              <div className="d-flex gap-3 align-items-start"><i className="far fa-clock mt-1" style={{ color: 'var(--primary)', width: 16 }}></i><div><div className="small text-muted">วัน-เวลาทำการ</div><div className="fw-medium">{cfg.cashHours}</div></div></div>
            </div>
            <div className="fw-bold small mb-1">รายการที่จะชำระ</div>
            {selItems.map(r => <div key={r.id} className="d-flex justify-content-between small py-1" style={{ borderBottom: '1px dashed var(--border-card)' }}><span>{r.label}</span><b>{DK.money(r.total)}</b></div>)}
            <div className="text-center mt-3"><div className="small text-muted">แสดงเลขอ้างอิงนี้ต่อเจ้าหน้าที่</div><div className="fw-bold" style={{ fontSize: '1.4rem', letterSpacing: '.06em', color: 'var(--primary)' }}>{payRef}</div></div>
            <div className="small text-muted mt-2"><i className="fas fa-info-circle me-1"></i>ยอดอาจเปลี่ยนตามวันที่ชำระจริง เนื่องจากเบี้ยปรับและเงินเพิ่มคิดตามระยะเวลาที่เกินกำหนด เจ้าหน้าที่จะออกใบเสร็จรับเงินให้ที่เคาน์เตอร์</div>
          </div> : null}
          {!isCash && qrOn ? <div className="d-inline-flex flex-column align-items-center p-3 rounded-3 mb-3 bg-white" style={{ border: '1px solid var(--blue-200)', boxShadow: 'var(--shadow-card)' }}>
            <div className="w-100 text-white fw-bold rounded-2 mb-2 py-1" style={{ background: '#113566', fontSize: 13, letterSpacing: '.04em' }}>THAI QR PAYMENT</div>
            <img src={PP.imageUrl(PP.payload(selTotal, payRef, user.taxId))} width="200" height="200" alt={'QR ' + DK.money(selTotal) + ' บาท'} style={{ display: 'block' }} />
            <div className="fw-bold mt-2" style={{ color: 'var(--primary)' }}>ผู้รับเงิน: {cfg.accountName}</div>
            <small className="text-muted">สแกนด้วยแอปธนาคารใดก็ได้ ยอดเงินกรอกให้อัตโนมัติ</small>
          </div> : null}
          {!isCash && cfg.bankAccount ? <div className="text-start rounded-3 p-3 mb-2 d-flex align-items-center" style={{ gap: 14, background: 'var(--blue-50)', border: '1px solid var(--blue-200)' }}>
            <span className="d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0" style={{ width: 48, height: 48, background: '#00a6e6', fontSize: 13 }}>{cfg.bankShort}</span>
            <div className="flex-grow-1" style={{ minWidth: 0 }}>
              <div className="small text-muted">โอนเข้าบัญชี {cfg.bankName}</div>
              <div className="fw-bold" style={{ fontSize: '1.25rem', letterSpacing: '.03em', color: 'var(--primary)' }}>{PP.fmtAcct(cfg.bankAccount)}</div>
              <div className="small">ชื่อบัญชี {cfg.accountName}</div>
            </div>
            <Button size="sm" variant="outline" icon="far fa-copy" onClick={() => navigator.clipboard && navigator.clipboard.writeText(cfg.bankAccount)}>คัดลอก</Button>
          </div> : null}
          {!isCash ? <div className="small text-muted mb-3">เลขอ้างอิง: {payRef}</div> : null}
        </div>
        {!isCash ? <>
          <label className="form-label fw-bold">แนบหลักฐานการชำระ</label>
          <input type="file" accept="image/*,.pdf" className="form-control" onChange={e => setSlip(e.target.files[0] || null)} />
          <div className="form-text">รองรับไฟล์ JPG, PNG, PDF</div>
        </> : null}
      </AppModal>
      <AppModal open={cashDone != null} onClose={() => setCashDone(null)} tone="success" icon="fas fa-money-bill-wave" title="ยืนยันชำระเงินสดแล้ว" centeredBody>
        <h5 className="mb-1">นำเลขอ้างอิง <span style={{ color: 'var(--primary)' }}>{payRef}</span> ไปชำระที่เคาน์เตอร์</h5>
        <div className="text-muted">ยอด {DK.money(cashDone)} บาท · {cfg.cashPoint}</div>
        <div className="text-muted small mt-1">สถานะ: รอชำระที่เคาน์เตอร์ ใบเสร็จจะแสดงในประวัติการชำระหลังเจ้าหน้าที่รับเงิน</div>
      </AppModal>
      <AppModal open={done != null} onClose={() => setDone(null)} tone="success" icon="fas fa-check-circle" title="ส่งหลักฐานสำเร็จ" centeredBody>
        <h5 className="mb-1">ส่งหลักฐานการชำระ {DK.money(done)} บาท เรียบร้อยแล้ว</h5><div className="text-muted">สถานะ: รอเจ้าหน้าที่การเงินตรวจสอบ</div>
      </AppModal>
      <AppModal open={line} onClose={() => setLine(false)} icon="fab fa-line" title="เชื่อมต่อ LINE OA" centeredBody
        footer={<Button variant="line" icon="fab fa-line" onClick={() => setLine(false)}>เพิ่มเพื่อน LINE OA</Button>}>
        <i className="fab fa-line mb-2" style={{ fontSize: 56, color: 'var(--line-green)' }}></i>
        <h5>รับการแจ้งเตือนผ่าน LINE OA เทศบาลเมืองดอนแก้ว</h5><div className="text-muted">เพิ่มเพื่อนและยืนยันเลขผู้เสียภาษีเพื่อรับแจ้งยอดค้างชำระ</div>
      </AppModal>
    </div>
  );
}

function History({ user, year, setYear }) {
  const [v, setV] = React.useState(null);
  return (
    <div>
      <UserHead user={user} year={year} setYear={setYear} />
      <Card title="รายการที่ชำระแล้ว" icon="fas fa-history" padding="20px 20px 8px">
        <DataTable rows={DK.HISTORY} columns={[
          { key: 'id', title: 'เลขรายการ', render: r => <span className="fw-medium" style={{ color: 'var(--primary)' }}><i className="fas fa-receipt me-2"></i>{r.id}</span> },
          { key: 'd', title: 'รายละเอียด', render: r => r.detail },
          { key: 's', title: 'สถานะ', render: r => <StatusBadge status={r.status} /> },
          { key: 'x', title: '', align: 'end', render: r => <Button size="sm" variant="outline" icon="fas fa-eye" onClick={() => setV(r)}>รายละเอียด</Button> }
        ]} />
      </Card>
      <AppModal open={!!v} onClose={() => setV(null)} icon="fas fa-receipt" title={v ? v.id : ''}>
        {v ? <div>
          <KV k="รายละเอียด" v={v.detail} />
          <KV k="วันที่ชำระ" v={DK.thDate(v.date)} />
          <KV k="วิธีชำระ" v={v.method} />
          <KV k="ยอดที่ชำระ" v={DK.money(v.amount) + ' บาท'} strong tone="var(--status-paid)" />
          <div className="mt-3 fw-bold mb-2">เอกสารหลักฐานการชำระ</div>
          <a href="#" onClick={e => e.preventDefault()} className="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none" style={{ border: '1px solid var(--border-default)' }}>
            <i className={(v.slip.endsWith('.pdf') ? 'fas fa-file-pdf text-danger' : 'fas fa-file-image') + ' fs-3'} style={{ color: 'var(--primary)' }}></i>
            <span className="flex-grow-1 text-body">{v.slip}</span><i className="fas fa-download"></i>
          </a>
        </div> : null}
      </AppModal>
    </div>
  );
}
Object.assign(window, { MyBills, History });
