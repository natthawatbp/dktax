function Notifications({ year, setYear }) {
  const [v, setV] = React.useState(null);
  return (
    <div>
      <PageHead right={<Select options={DK.YEARS} value={year} onChange={e => setYear(e.target.value)} />} />
      <Card title="รายการแจ้งเตือน" icon="fas fa-bell" padding="20px 20px 8px">
        <DataTable rows={DK.NOTIFS} columns={[
          { key: 't', title: 'ผู้รับ / เรื่อง', render: r => <div><div className="fw-medium">{r.to}</div><small className="text-muted">{r.subject}</small></div> },
          { key: 'd', title: 'รายละเอียด', render: r => <span className="small">{r.detail}</span> },
          { key: 's', title: 'สถานะ', render: r => <StatusBadge status={r.status} label={r.label} /> },
          { key: 'x', title: '', align: 'end', render: r => <IconButton icon="fas fa-eye" title="ดูรายละเอียด" onClick={() => setV(r)} /> }
        ]} />
      </Card>
      <AppModal open={!!v} onClose={() => setV(null)} icon="fab fa-line" title="รายละเอียดการแจ้งเตือน">
        {v ? <div><KV k="ผู้รับ" v={v.to} /><KV k="เรื่อง" v={v.subject} /><KV k="วันที่ส่ง" v={DK.thDate(v.date)} /><KV k="ช่องทาง" v="LINE OA" /><KV k="สถานะ" v={<StatusBadge status={v.status} label={v.label} />} />
          <div className="mt-3 p-3 rounded-3" style={{ background: 'var(--blue-50)' }}>{v.detail}</div></div> : null}
      </AppModal>
    </div>
  );
}

function Transactions({ year, setYear, role }) {
  const [list, setList] = React.useState(DK.TXNS);
  const [v, setV] = React.useState(null);
  const [msg, setMsg] = React.useState(null);
  const canConfirm = role === 'finance';
  const [cash, setCash] = React.useState(null);
  const [edit, setEdit] = React.useState(null);
  const saveEdit = () => {
    if (!edit.detail.trim() || !(Number(edit.amount) > 0)) return setEdit({ ...edit, err: 'กรุณากรอกรายละเอียดและยอดชำระให้ถูกต้อง' });
    const { err, ...t } = edit; setList(list.map(x => x.id === t.id ? { ...t, amount: Number(t.amount) } : x)); setEdit(null); setMsg({ text: 'แก้ไขรายการ ' + t.id + ' เรียบร้อยแล้ว', tone: 'success' });
  };
  const payers = DK.TAXPAYERS.map(p => ({ value: p.id, label: p.name + ' (' + p.id + ')' }));
  const itemsOf = id => DK.rows(DK.CUR_YEAR).filter(r => r.p.id === id && r.status !== 'paid').map(r => ({ value: r.id, label: r.label + ' ปี ' + DK.CUR_YEAR + ' · ' + DK.money(r.total) + ' บาท', detail: r.label + ' ปี ' + DK.CUR_YEAR, amount: Math.round(r.total * 100) / 100 }));
  const cashFor = (payer, base) => { const its = itemsOf(payer); const f = its[0]; return { ...base, payer, items: its, item: f ? f.value : 'custom', detail: f ? f.detail : '', amount: f ? String(f.amount) : '', err: '' }; };
  const openCash = () => setCash(cashFor(payers[0].value, { receipt: '', date: DK.TODAY.toISOString().slice(0, 10) }));
  const pickItem = v => { const it = cash.items.find(i => i.value === v); setCash({ ...cash, item: v, detail: it ? it.detail : '', amount: it ? String(it.amount) : '' }); };
  const saveCash = () => {
    if (!cash.detail.trim() || !(Number(cash.amount) > 0) || !cash.receipt.trim()) return setCash({ ...cash, err: 'กรุณากรอกรายการ ยอดเงิน และเลขที่ใบเสร็จให้ครบ' });
    const p = DK.TAXPAYERS.find(t => t.id === cash.payer);
    const id = 'TXN-' + cash.date.slice(2, 4).replace(/^\d\d/, String(Number(cash.date.slice(0, 4)) + 543).slice(2)) + cash.date.slice(5, 7) + cash.date.slice(8, 10) + '-' + String(list.length + 1).padStart(4, '0');
    setList([{ id, payer: p.name, detail: cash.detail, amount: Number(cash.amount), date: cash.date, method: 'เงินสด', slip: 'ใบเสร็จเลขที่ ' + cash.receipt, status: canConfirm ? 'paid' : 'review' }, ...list]);
    setCash(null); setMsg({ text: canConfirm ? 'บันทึกรับเงินสดและยืนยันการชำระแล้ว' : 'บันทึกรับเงินสดแล้ว รอเจ้าหน้าที่การเงินยืนยัน', tone: 'success' });
  };
  const mIcon = m => m === 'เงินสด' ? 'fas fa-money-bill-wave' : m === 'QR PromptPay' ? 'fas fa-qrcode' : 'fas fa-university';
  const update = (status, text, tone) => { setList(list.map(t => t.id === v.id ? { ...t, status } : t)); setV(null); setMsg({ text, tone }); };
  return (
    <div>
      <PageHead right={<Select options={DK.YEARS} value={year} onChange={e => setYear(e.target.value)} />} />
      <Card title="ธุรกรรมการชำระเงิน" icon="fas fa-exchange-alt" padding="20px 20px 8px" actions={<Button size="sm" variant="success" icon="fas fa-money-bill-wave" onClick={openCash}>บันทึกรับเงินสด</Button>}>
        <DataTable rows={list} columns={[
          { key: 'id', title: 'เลขรายการ', render: r => <span className="fw-medium" style={{ color: 'var(--primary)' }}>{r.id}</span> },
          { key: 'd', title: 'รายละเอียด', render: r => <div><div>{r.payer}</div><small className="text-muted">{r.detail} · {DK.money(r.amount)} บาท</small><div><small className="text-muted"><i className={mIcon(r.method) + ' me-1'}></i>{r.method}</small></div></div> },
          { key: 's', title: 'สถานะ', render: r => <StatusBadge status={r.status} label={r.status === 'other' ? 'ยกเลิก' : undefined} /> },
          { key: 'x', title: '', align: 'end', render: r => <Button size="sm" variant="outline" icon="fas fa-eye" onClick={() => setV(r)}>ดูรายละเอียด</Button> }
        ]} />
      </Card>
      <AppModal open={!!v} onClose={() => setV(null)} icon="fas fa-exchange-alt" title={v ? v.id : ''} size="lg"
        footer={v ? <>
          <Button variant="danger" icon="fas fa-times" onClick={() => update('other', 'ยกเลิกรายการเรียบร้อยแล้ว', 'danger')}>ยกเลิก</Button>
          <Button variant="secondary" icon="fas fa-pen" disabled={v.status === 'paid' && !canConfirm} title={v.status === 'paid' && !canConfirm ? 'รายการที่ยืนยันแล้ว แก้ไขได้เฉพาะเจ้าหน้าที่การเงิน' : ''} onClick={() => { setEdit({ ...v, amount: String(v.amount), err: '' }); setV(null); }}>แก้ไข</Button>
          <Button variant="success" icon="fas fa-check-circle" disabled={!canConfirm || v.status === 'paid'} title={canConfirm ? '' : 'เฉพาะเจ้าหน้าที่การเงิน'} onClick={() => update('paid', 'ยืนยันการชำระเรียบร้อยแล้ว', 'success')}>ยืนยันการชำระ</Button>
        </> : null}>
        {v ? <div className="row g-3">
          <div className="col-md-7"><KV k="ผู้ชำระ" v={v.payer} /><KV k="รายละเอียด" v={v.detail} /><KV k="วันที่ชำระ" v={DK.thDate(v.date)} /><KV k="วิธีชำระ" v={v.method} /><KV k="ยอดชำระ" v={DK.money(v.amount) + ' บาท'} strong tone="var(--primary)" /><KV k="สถานะ" v={<StatusBadge status={v.status} />} /></div>
          <div className="col-md-5"><div className="fw-bold mb-2">หลักฐานการชำระ</div>
            <div className="d-flex flex-column align-items-center justify-content-center rounded-3 text-muted" style={{ height: 190, background: 'var(--gray-50)', border: '1px dashed var(--border-default)' }}><i className={(v.method === 'เงินสด' ? 'fas fa-receipt' : 'fas fa-file-image') + ' fs-1 mb-2'}></i><small>{v.slip}</small></div></div>
          {!canConfirm ? <div className="col-12"><div className="alert alert-info py-2 small mb-0"><i className="fas fa-info-circle me-1"></i>สิทธิ์ยืนยันการชำระเฉพาะเจ้าหน้าที่การเงิน</div></div> : null}
        </div> : null}
      </AppModal>
      <AppModal open={!!edit} onClose={() => setEdit(null)} tone="warning" icon="fas fa-pen" title={edit ? 'แก้ไขรายการ ' + edit.id : ''}
        footer={<><Button variant="secondary" onClick={() => setEdit(null)}>ยกเลิก</Button><Button icon="fas fa-save" onClick={saveEdit}>บันทึกการแก้ไข</Button></>}>
        {edit ? <div className="d-flex flex-column gap-3">
          {edit.err ? <div className="alert alert-danger py-2 mb-0"><i className="fas fa-exclamation-circle me-2"></i>{edit.err}</div> : null}
          <Input label="ผู้ชำระ" value={edit.payer} disabled />
          <Input label="รายละเอียด" value={edit.detail} onChange={e => setEdit({ ...edit, detail: e.target.value })} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            <Input label="ยอดชำระ (บาท)" type="number" step="0.01" value={edit.amount} onChange={e => setEdit({ ...edit, amount: e.target.value })} />
            <Input label="วันที่ชำระ" type="date" value={edit.date} onChange={e => setEdit({ ...edit, date: e.target.value })} />
            <Select label="วิธีชำระ" options={['QR PromptPay', 'โอนผ่านธนาคาร', 'เงินสด']} value={edit.method} onChange={e => setEdit({ ...edit, method: e.target.value })} />
          </div>
          <Input label={edit.method === 'เงินสด' ? 'เลขที่ใบเสร็จ / หลักฐาน' : 'ไฟล์หลักฐาน'} value={edit.slip} onChange={e => setEdit({ ...edit, slip: e.target.value })} />
          {edit.method !== 'เงินสด' ? <div><label className="form-label fw-bold">แนบหลักฐานใหม่ (ถ้ามี)</label><input type="file" accept="image/*,.pdf" className="form-control" onChange={e => e.target.files[0] && setEdit({ ...edit, slip: e.target.files[0].name })} /></div> : null}
          <div className="small text-muted"><i className="fas fa-info-circle me-1"></i>สถานะรายการไม่เปลี่ยน ใช้ปุ่มยืนยันการชำระหรือยกเลิกในหน้ารายละเอียด</div>
        </div> : null}
      </AppModal>
      <AppModal open={!!cash} onClose={() => setCash(null)} tone="success" icon="fas fa-money-bill-wave" title="บันทึกรับเงินสด"
        footer={<><Button variant="secondary" onClick={() => setCash(null)}>ยกเลิก</Button><Button variant="success" icon="fas fa-save" onClick={saveCash}>บันทึก</Button></>}>
        {cash ? <div className="d-flex flex-column gap-3">
          {cash.err ? <div className="alert alert-danger py-2 mb-0"><i className="fas fa-exclamation-circle me-2"></i>{cash.err}</div> : null}
          <Select label="ผู้ชำระ" options={payers} value={cash.payer} onChange={e => setCash(cashFor(e.target.value, cash))} />
          <div>
            <Select label="รายการที่ชำระ" options={[...cash.items, { value: 'custom', label: 'อื่นๆ (ระบุเอง)' }]} value={cash.item} onChange={e => pickItem(e.target.value)} />
            {!cash.items.length ? <div className="form-text">ผู้ชำระรายนี้ไม่มีรายการค้างชำระในปี {DK.CUR_YEAR}</div> : null}
          </div>
          {cash.item === 'custom' ? <Input label="ระบุรายการ" placeholder="เช่น ค่าธรรมเนียมเก็บขยะ" value={cash.detail} onChange={e => setCash({ ...cash, detail: e.target.value })} /> : null}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            <Input label="ยอดเงิน (บาท)" type="number" step="0.01" value={cash.amount} onChange={e => setCash({ ...cash, amount: e.target.value })} hint={cash.item !== 'custom' && cash.items.find(i => i.value === cash.item) && Number(cash.amount) !== cash.items.find(i => i.value === cash.item).amount ? 'ยอดตามระบบ ' + DK.money(cash.items.find(i => i.value === cash.item).amount) + ' บาท' : 'ดึงยอดจากระบบ แก้ไขได้'} />
            <Input label="เลขที่ใบเสร็จ" value={cash.receipt} onChange={e => setCash({ ...cash, receipt: e.target.value })} />
            <Input label="วันที่รับเงิน" type="date" value={cash.date} onChange={e => setCash({ ...cash, date: e.target.value })} />
          </div>
          <div className="small text-muted"><i className="fas fa-info-circle me-1"></i>{canConfirm ? 'เจ้าหน้าที่การเงินบันทึกแล้วยืนยันการชำระทันที' : 'รายการจะอยู่ในสถานะรอตรวจสอบ จนกว่าเจ้าหน้าที่การเงินยืนยัน'}</div>
        </div> : null}
      </AppModal>
      <AppModal open={!!msg} onClose={() => setMsg(null)} tone={msg && msg.tone} icon="fas fa-bell" title="แจ้งเตือน" centeredBody><h5 className="mb-0">{msg && msg.text}</h5></AppModal>
    </div>
  );
}

function Registrants() {
  const [list, setList] = React.useState(DK.REGISTRANTS);
  const [m, setM] = React.useState(null);
  return (
    <div>
      <Card title="ผู้ลงทะเบียน" icon="fas fa-user-check" padding="20px 20px 8px">
        <DataTable rows={list} columns={[
          { key: 'n', title: 'ชื่อ – นามสกุล / สถานประกอบการ', render: r => <div><div className="fw-medium">{r.name}</div><small className="text-muted">{r.taxId}</small></div> },
          { key: 'p', title: 'เบอร์โทรศัพท์', render: r => r.phone },
          { key: 'd', title: 'วันที่ลงทะเบียน', render: r => DK.thDate(r.date) },
          { key: 's', title: 'สถานะ', render: r => <StatusBadge status={r.status} label={r.status === 'paid' ? 'ยืนยันแล้ว' : 'รอยืนยัน'} /> },
          { key: 'x', title: '', align: 'end', render: r => <div className="d-flex gap-1 justify-content-end">
            {r.status !== 'paid' ? <Button size="sm" variant="success" icon="fas fa-check" onClick={() => { setList(list.map(x => x.id === r.id ? { ...x, status: 'paid' } : x)); setM({ tone: 'success', t: 'ยืนยันบัญชี ' + r.name + ' เรียบร้อยแล้ว' }); }}>ยืนยัน</Button> : null}
            <IconButton icon="fas fa-pen" tone="warning" title="แก้ไข" onClick={() => setM({ tone: 'warning', t: 'เปิดแบบฟอร์มแก้ไข: ' + r.name })} />
            <IconButton icon="fas fa-trash" tone="danger" title="ลบ" onClick={() => { setList(list.filter(x => x.id !== r.id)); setM({ tone: 'danger', t: 'ลบผู้ลงทะเบียนเรียบร้อยแล้ว' }); }} />
          </div> }
        ]} />
      </Card>
      <AppModal open={!!m} onClose={() => setM(null)} tone={m && m.tone} icon="fas fa-bell" title="แจ้งเตือน" centeredBody><h5 className="mb-0">{m && m.t}</h5></AppModal>
    </div>
  );
}
Object.assign(window, { Notifications, Transactions, Registrants });
