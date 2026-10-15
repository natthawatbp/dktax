
function PageHead({ title, sub, right }) {
  return (
    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
      <div>{title ? <h4 className="fw-bold mb-1">{title}</h4> : null}{sub ? <div className="text-muted">{sub}</div> : null}</div>
      <div className="d-flex gap-2 flex-wrap align-items-center">{right}</div>
    </div>
  );
}

function Dashboard({ year, setYear, go }) {
  const rows = DK.rows();
  const billed = rows.reduce((s, r) => s + r.total, 0);
  const collected = rows.filter(r => r.status === 'paid').reduce((s, r) => s + r.total, 0);
  const pct = Math.round(collected / billed * 100);
  const cnt = k => rows.filter(r => r.status === k).length;
  const byType = [
    { k: 'land', t: 'ภาษีที่ดินและสิ่งปลูกสร้าง', icon: 'fas fa-map-marked-alt' },
    { k: 'sign', t: 'ภาษีป้าย', icon: 'fas fa-sign' },
    { k: 'license', t: 'ใบอนุญาต / ค่าธรรมเนียม', icon: 'fas fa-id-card' }
  ].map(x => { const rs = rows.filter(r => r.kind === x.k); const b = rs.reduce((s, r) => s + r.total, 0); const c = rs.filter(r => r.status === 'paid').reduce((s, r) => s + r.total, 0); return { ...x, b, c, p: b ? Math.round(c / b * 100) : 0 }; });
  const tasks = rows.filter(r => ['overdue', 'expiring', 'review'].includes(r.status)).slice(0, 5);

  return (
    <div>
      <PageHead sub={'ข้อมูล ณ วันที่ ' + DK.thDate(DK.TODAY)} right={<Select options={DK.YEARS} value={year} onChange={e => setYear(e.target.value)} />} />
      <div className="row g-3 mb-3">
        <div className="col-xl-6 col-12"><StatCard variant="tile" label={'ยอดจัดเก็บแล้วประจำปี ' + year} value={DK.money(collected)} unit="บาท" icon="fas fa-coins" progress={pct} sub={<>จากยอดเรียกเก็บ {DK.money(billed)} บาท · คิดเป็น <b>{pct}%</b></>} /></div>
        <div className="col-xl-3 col-sm-6"><StatCard variant="tile" label="ผู้เสียภาษี / ผู้ประกอบการ" value={DK.TAXPAYERS.length} unit="ราย" icon="fas fa-users" /></div>
        <div className="col-xl-3 col-sm-6"><StatCard variant="tile" label="ชำระแล้ว" value={cnt('paid')} unit="รายการ" icon="fas fa-check-circle" tone="success" /></div>
        <div className="col-xl-3 col-sm-6 col-6"><StatCard variant="tile" label="ยังไม่ชำระ" value={cnt('unpaid')} icon="fas fa-clock" tone="warning" /></div>
        <div className="col-xl-3 col-sm-6 col-6"><StatCard variant="tile" label="ใกล้หมดอายุ" value={cnt('expiring')} icon="fas fa-hourglass-half" tone="orange" /></div>
        <div className="col-xl-2 col-sm-4 col-6"><StatCard variant="tile" label="เกินกำหนด" value={cnt('overdue')} icon="fas fa-exclamation-circle" tone="danger" /></div>
        <div className="col-xl-2 col-sm-4 col-6"><StatCard variant="tile" label="รอตรวจสอบ" value={cnt('review')} icon="fas fa-search-dollar" tone="info" /></div>
        <div className="col-xl-2 col-sm-4 col-6"><StatCard variant="tile" label="อื่นๆ" value={cnt('other')} icon="fas fa-ellipsis-h" tone="muted" /></div>
      </div>
      <div className="row g-3">
        <div className="col-lg-7">
          <Card title="สัดส่วนจัดเก็บตามประเภท" icon="fas fa-chart-bar" style={{ height: '100%' }}>
            {byType.map(x => (
              <div key={x.k} className="mb-4">
                <div className="d-flex justify-content-between align-items-end mb-2 gap-2">
                  <div className="fw-medium"><i className={x.icon + ' me-2'} style={{ color: 'var(--primary)', width: 18 }}></i>{x.t}</div>
                  <div className="text-end small"><b>{DK.money(x.c)}</b><span className="text-muted"> / {DK.money(x.b)}</span></div>
                </div>
                <div className="progress" style={{ height: 10, background: 'var(--blue-50)' }}><div className="progress-bar" style={{ width: x.p + '%', background: 'var(--primary)' }}></div></div>
                <div className="small text-muted mt-1">{x.p}% ของยอดเรียกเก็บ</div>
              </div>
            ))}
          </Card>
        </div>
        <div className="col-lg-5">
          <Card title="งานที่ต้องติดตาม" icon="fas fa-tasks" actions={<Button size="sm" variant="outline" onClick={() => go('registry')}>ดูทั้งหมด</Button>} style={{ height: '100%' }}>
            {tasks.map(r => (
              <div key={r.id} className="d-flex justify-content-between align-items-center py-2 gap-2" style={{ borderBottom: '1px solid var(--border-card)' }}>
                <div style={{ minWidth: 0 }}><div className="fw-medium text-truncate">{r.p.name}</div><small className="text-muted">{r.label} · {DK.thDate(r.due)}</small></div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { Dashboard, PageHead });
