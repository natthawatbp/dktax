
function KV({ k, v, strong, tone }) {
  return <div className="d-flex justify-content-between py-1 gap-3" style={{ borderBottom: '1px dashed var(--border-card)' }}><span className="text-muted">{k}</span><span className={strong ? 'fw-bold' : 'fw-medium'} style={{ color: tone, textAlign: 'right' }}>{v}</span></div>;
}
function SignBlock({ t }) {
  if (!t) return null;
  const c = DK.calcSign(t);
  return (
    <div className="col-md-6"><div className="p-3 rounded-3 h-100" style={{ border: '1px solid var(--border-default)' }}>
      <div className="fw-bold mb-2" style={{ color: 'var(--primary)' }}><i className="fas fa-sign me-2"></i>3. ภาษีป้าย</div>
      <div className="small">
        <KV k="วันที่ได้รับการแจ้งประเมิน" v={DK.thDate(c.noticeDate)} />
        <KV k="วันครบกำหนดชำระ (15 วัน)" v={DK.thDate(c.due)} />
        <KV k="วันที่ชำระ" v={DK.thDate(c.paid)} />
        <KV k="เกินกำหนด" v={c.months + ' เดือน'} tone={c.months ? 'var(--danger)' : undefined} />
        <KV k="เงินภาษี" v={DK.money(c.assess)} />
        <KV k="เงินเพิ่มจากการชำระภาษีล่าช้า" v={DK.money(c.surcharge)} />
        <KV k={'เงินเพิ่มจากการยื่นแบบล่าช้า' + (c.lateRate ? ' (' + c.lateRate * 100 + '%)' : '')} v={DK.money(c.lateFiling)} />
        <KV k="รวมเงินที่ต้องชำระทั้งสิ้น" v={DK.money(c.total)} strong tone="var(--primary)" />
        {c.payMode !== 'full' ? <KV k={c.payMode === 'inst1' ? 'ผ่อนชำระครั้งที่ 1' : 'ชำระตามจำนวนที่ระบุ'} v={DK.money(c.payAmount)} strong /> : null}
      </div>
    </div></div>
  );
}
function TaxBlock({ title, icon, t }) {
  if (!t) return null;
  const c = DK.calcTax(t);
  const props = t.properties && t.properties.length ? <div className="mt-2 pt-2 small" style={{ borderTop: '1px solid var(--border-card)' }}><div className="fw-bold mb-1">ทรัพย์สิน ({t.properties.length}) · ข้อมูลจาก {t.source}</div>{t.properties.map((pp, i) => <div key={i} className="d-flex justify-content-between gap-2 py-1" style={{ borderBottom: '1px dashed var(--border-card)' }}><span className="text-muted">{pp.address}</span><span className="text-nowrap">{DK.money(pp.assess)}</span></div>)}{t.paidAmount ? <KV k="ยอดชำระแล้ว (e-LAAS)" v={DK.money(t.paidAmount)} /> : null}</div> : null;
  return (
    <div className="col-md-6"><div className="p-3 rounded-3 h-100" style={{ border: '1px solid var(--border-default)' }}>
      <div className="fw-bold mb-2" style={{ color: 'var(--primary)' }}><i className={icon + ' me-2'}></i>{title}</div>
      {c.noticeNo ? <KV k="หนังสือแจ้งการประเมินเลขที่" v={c.noticeNo + (c.noticeDate ? ' ลว. ' + DK.thDate(c.noticeDate) : '')} /> : null}
      <KV k="เงินภาษี" v={DK.money(c.assess)} />
      <KV k="วันที่ครบชำระ" v={DK.thDate(c.due)} />
      <KV k="วันที่ชำระ" v={t.paidNoDate ? 'ชำระแล้ว (ไม่ระบุวันที่)' : DK.thDate(c.paid)} />
      <KV k="เกินกำหนด" v={c.days ? c.months + ' เดือน (' + c.days + ' วัน)' : '-'} tone={c.days ? 'var(--danger)' : undefined} />
      <KV k="ยอดชำระภาษี" v={DK.money(c.assess)} />
      <KV k={'เบี้ยปรับชำระล่าช้า' + (c.rate ? ' (' + c.rate * 100 + '%)' : '')} v={DK.money(c.penalty)} />
      <KV k={'เงินเพิ่ม ' + c.sRate * 100 + '% × ' + c.months + ' เดือน'} v={DK.money(c.surcharge)} />
      <KV k="รวมภาษี" v={DK.money(c.total)} strong tone="var(--primary)" />
      {props}
    </div></div>
  );
}
function DetailModal({ p, onClose, onEdit }) {
  const [blocked, setBlocked] = React.useState(false);
  if (!p) return null;
  const alertBlocked = () => setBlocked(true);
  const land = DK.calcTax(p.land), sign = DK.calcSign(p.sign), lics = (p.licenses || []).map(DK.calcLicense);
  const licTotal = lics.reduce((s, l) => s + l.total, 0);
  const grand = (land ? land.total : 0) + (sign ? sign.total : 0) + licTotal;
  return (
    <>
    <AppModal open onClose={onClose} size="xl" icon="fas fa-file-invoice" title="รายละเอียดผู้เสียภาษี" footer={<>{onEdit ? <Button variant="outline" icon="fas fa-pen" onClick={onEdit}>แก้ไขข้อมูล</Button> : null}<Button variant="outline" icon="fas fa-file-pdf" onClick={() => { if (!window.printNotice(p)) alertBlocked(); }}>พิมพ์ใบแจ้ง (PDF)</Button><Button onClick={onClose}>ปิด</Button></>}>
      <div className="row g-3">
        <div className="col-12"><div className="p-3 rounded-3" style={{ background: 'var(--blue-50)' }}>
          <div className="fw-bold mb-2 d-flex justify-content-between" style={{ color: 'var(--primary)' }}><span><i className="fas fa-user me-2"></i>1. ข้อมูลทั่วไป</span><span className="badge rounded-pill" style={{ background: 'var(--primary)' }}>ปีงบประมาณ {p.year}</span></div>
          <div className="row small g-2">
            <div className="col-md-6"><span className="text-muted">ชื่อ-นามสกุล / ชื่อสถานประกอบการ: </span><b>{p.name}</b></div>
            <div className="col-md-6"><span className="text-muted">เลขที่เสียภาษี: </span><b>{p.id}</b></div>
            <div className="col-md-6"><span className="text-muted">ที่อยู่: </span>{p.address}</div>
            <div className="col-md-6"><span className="text-muted">เบอร์โทร: </span>{p.phone}</div>
          </div>
        </div></div>
        <TaxBlock title="2. ภาษีที่ดินและสิ่งปลูกสร้าง" icon="fas fa-map-marked-alt" t={p.land} />
        <SignBlock t={p.sign} />
        {lics.length ? <div className="col-12"><div className="p-3 rounded-3" style={{ border: '1px solid var(--border-default)' }}>
          <div className="fw-bold mb-2 d-flex justify-content-between flex-wrap gap-2" style={{ color: 'var(--primary)' }}><span><i className="fas fa-id-card me-2"></i>4. ใบอนุญาต ({lics.length} ใบ)</span><span>รวม {DK.money(licTotal)} บาท</span></div>
          <div className="row g-3">{lics.map((lic, i) => <div className="col-md-6" key={i}><div className="p-3 rounded-3 h-100" style={{ background: 'var(--blue-50)' }}>
            <div className="fw-bold small mb-1">4.{i + 1} {lic.type}</div>
            <KV k="เลขที่ใบอนุญาต" v={lic.no} />
            <KV k="วันที่หมดอายุ" v={DK.thDate(lic.expire)} />
            <KV k="ค่าธรรมเนียม" v={DK.money(lic.fee)} />
            <KV k="จำนวนปีที่ค้างชำระ" v={lic.years + ' ปี'} tone={lic.years ? 'var(--danger)' : undefined} />
            <KV k="ค่าธรรมเนียมที่ค้างชำระ" v={DK.money(lic.outstanding)} />
            <KV k="ค่าปรับ (20% เฉพาะหนังสือรับรองการแจ้ง)" v={DK.money(lic.fine)} />
            <KV k="ยอดรวม" v={DK.money(lic.total)} strong tone="var(--primary)" />
          </div></div>)}</div>
        </div></div> : null}
        <div className="col-12"><div className="d-flex justify-content-between align-items-center p-3 rounded-3 text-white flex-wrap gap-2" style={{ background: 'var(--primary)' }}>
          <div className="fw-medium"><i className="fas fa-calculator me-2"></i>5. ยอดภาษีและค่าธรรมเนียมทั้งหมด</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{DK.money(grand)} <span className="fs-6 fw-normal">บาท</span></div>
        </div></div>
      </div>
    </AppModal>
    <AppModal open={blocked} onClose={() => setBlocked(false)} tone="warning" icon="fas fa-exclamation-triangle" title="เปิดหน้าต่างไม่ได้" centeredBody>เบราว์เซอร์บล็อกป๊อปอัป กรุณาอนุญาตป๊อปอัปสำหรับระบบนี้ แล้วกดพิมพ์ใบแจ้งอีกครั้ง</AppModal>
    </>
  );
}

const EMPTY_TAX = { on: false, noticeNo: '', noticeDate: '', assess: '', due: '', paid: '', penaltyRate: '', surchargeRate: '0.01' };
const EMPTY_SIGN = { on: false, filedDate: '', notFiled: false, noticeDate: '', paid: '', assess: '', surchargeAmt: '', lateFilingRate: 'auto', payMode: 'full', payAmount: '' };
const EMPTY_LIC = { no: '', type: 'หนังสือรับรองการแจ้ง', expire: '', fee: '', years: 0 };
const toForm = (p, y) => {
  const b = (p && p.byYear && p.byYear[y]) || {};
  const t = x => x ? { ...EMPTY_TAX, on: true, noticeNo: x.noticeNo || '', noticeDate: x.noticeDate || '', assess: x.assess ?? '', due: x.due || '', paid: x.paid || '', penaltyRate: x.penaltyRate ?? '', surchargeRate: x.surchargeRate ?? '0.01', review: !!x.review } : { ...EMPTY_TAX };
  const sg = x => x ? { ...EMPTY_SIGN, on: true, noticeDate: x.noticeDate || '', paid: x.paid || '', assess: x.assess ?? '', surchargeAmt: x.surchargeAmt ?? '', filedDate: x.filedDate || '', notFiled: !!x.notFiled, lateFilingRate: x.lateFilingRate == null || x.lateFilingRate === 'auto' ? 'auto' : String(x.lateFilingRate), payMode: x.payMode || 'full', payAmount: x.payAmount ?? '', due: x.due, review: !!x.review } : { ...EMPTY_SIGN };
  return { land: t(b.land), sign: sg(b.sign), licenses: (b.licenses || []).map(l => ({ ...l })) };
};
const fromForm = f => ({
  land: f.land.on ? { noticeNo: f.land.noticeNo, noticeDate: f.land.noticeDate, assess: Number(f.land.assess) || 0, due: f.land.due, paid: f.land.paid || null, penaltyRate: f.land.penaltyRate === '' ? null : Number(f.land.penaltyRate), surchargeRate: Number(f.land.surchargeRate), review: f.land.review } : null,
  sign: f.sign.on ? { noticeDate: f.sign.noticeDate, due: f.sign.due, paid: f.sign.paid || null, assess: Number(f.sign.assess) || 0, surchargeAmt: f.sign.surchargeAmt === '' ? null : Number(f.sign.surchargeAmt), filedDate: f.sign.filedDate, notFiled: f.sign.notFiled, lateFilingRate: f.sign.lateFilingRate === 'auto' ? 'auto' : Number(f.sign.lateFilingRate) || 0, payMode: f.sign.payMode, payAmount: f.sign.payMode === 'custom' ? Number(f.sign.payAmount) || 0 : null, review: f.sign.review } : null,
  licenses: f.licenses.map(l => ({ no: l.no, type: l.type, expire: l.expire, fee: Number(l.fee) || 0, years: Number(l.years) || 0 }))
});
function FormSection({ n, title, icon, on, onToggle, children, preview, full }) {
  return (
    <div className={full ? 'col-12' : 'col-12 col-lg-6'}><div className="p-3 rounded-3 h-100" style={{ border: '1px solid ' + (on ? 'var(--blue-200)' : 'var(--border-default)'), background: on ? '#fff' : 'var(--gray-50, #f8f9fa)' }}>
      <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
        <div className="fw-bold" style={{ color: 'var(--primary)' }}><i className={icon + ' me-2'}></i>{n}. {title}</div>
        {onToggle ? <Checkbox label="มีรายการในปีนี้" checked={on} onChange={e => onToggle(e.target.checked)} /> : null}
      </div>
      {on ? <>{children}{preview ? <div className="mt-3 pt-2" style={{ borderTop: '1px solid var(--border-card)' }}>{preview}</div> : null}</> : <div className="small text-muted py-2">ไม่มีรายการ — ติ๊ก “มีรายการในปีนี้” เพื่อกรอกข้อมูล</div>}
    </div></div>
  );
}
function TaxpayerForm({ open, mode, p, year, onClose, onSave }) {
  const [y, setY] = React.useState(year);
  const [info, setInfo] = React.useState({ name: '', id: '', address: '', phone: '' });
  const [f, setF] = React.useState(toForm(null, year));
  const [err, setErr] = React.useState('');
  React.useEffect(() => {
    if (!open) return;
    setY(year); setErr('');
    setInfo(p ? { name: p.name, id: p.id, address: p.address || '', phone: p.phone || '' } : { name: '', id: '', address: '', phone: '' });
    setF(toForm(p, year));
  }, [open, p, year]);
  if (!open) return null;
  const changeYear = v => { setY(v); setF(toForm(p, v)); };
  const si = k => e => setInfo({ ...info, [k]: e.target.value });
  const sf = (sec, k) => e => setF({ ...f, [sec]: { ...f[sec], [k]: e.target.value } });
  const tog = sec => v => setF({ ...f, [sec]: { ...f[sec], on: v } });
  const g2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px 14px' };
  const data = fromForm(f);
  const land = data.land && data.land.due ? DK.calcTax(data.land) : null, sign = data.sign ? DK.calcSign(data.sign) : null, lics = data.licenses.map(DK.calcLicense), licTotal = lics.reduce((s, l) => s + l.total, 0);
  const grand = (land ? land.total : 0) + (sign ? sign.total : 0) + licTotal;
  const sl = (i, k) => e => setF({ ...f, licenses: f.licenses.map((l, j) => j === i ? { ...l, [k]: e.target.value } : l) });
  const addLic = () => setF({ ...f, licenses: [...f.licenses, { ...EMPTY_LIC }] });
  const delLic = i => setF({ ...f, licenses: f.licenses.filter((_, j) => j !== i) });
  const taxPrev = c => c ? <>
    <KV k="เกินกำหนด" v={c.days ? c.months + ' เดือน (' + c.days + ' วัน)' : '-'} tone={c.days ? 'var(--danger)' : undefined} />
    <KV k={'เบี้ยปรับชำระล่าช้า' + (c.rate ? ' (' + c.rate * 100 + '%)' : '')} v={DK.money(c.penalty)} />
    <KV k={'เงินเพิ่ม 1% × ' + c.months + ' เดือน'} v={DK.money(c.surcharge)} />
    <KV k="รวมภาษี" v={DK.money(c.total)} strong tone="var(--primary)" /></> : <div className="small text-muted">กรอกวันที่ครบชำระเพื่อคำนวณเบี้ยปรับและเงินเพิ่ม</div>;
  const taxFields = (sec, cc) => {
    const v = f[sec], ro = { background: '#e4e9f0', textAlign: 'right' };
    const money = (val, unit) => <div className="input-group"><input className="form-control" readOnly value={val} style={ro} /><span className="input-group-text bg-white">{unit}</span></div>;
    const radios = (k, opts) => <div className="d-flex flex-wrap align-items-center" style={{ gap: '6px 18px', minHeight: 38 }}>{opts.map(([val, l]) => <label key={l} className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}><input type="radio" className="form-check-input m-0" name={sec + k} checked={String(v[k]) === String(val)} onChange={() => setF({ ...f, [sec]: { ...v, [k]: val } })} />{l}</label>)}</div>;
    const row = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px 16px', alignItems: 'end' };
    const lbl = t => <label className="form-label fw-bold mb-1">{t}</label>;
    return <div className="d-flex flex-column" style={{ gap: 14, maxWidth: 940 }}>
      <div style={row}><Input label="หนังสือแจ้งการประเมินเลขที่" placeholder="เช่น 0359/2569" value={v.noticeNo} onChange={sf(sec, 'noticeNo')} /><Input label="ลงวันที่" type="date" value={v.noticeDate} onChange={sf(sec, 'noticeDate')} /></div>
      <div style={row}><Input label="วันครบกำหนดการขยายเวลาชำระภาษี" type="date" value={v.due} onChange={sf(sec, 'due')} /><div></div></div>
      <div style={row}><Input label="วันที่ชำระ" type="date" value={v.paid} onChange={sf(sec, 'paid')} hint="เว้นว่างหากยังไม่ชำระ (คำนวณถึงวันนี้)" /><div>{lbl(<>เกินกำหนด <span className="text-danger">*</span></>)}{money(cc ? cc.months : 0, 'เดือน')}</div></div>
      <div style={row}><div>{lbl('เงินภาษี')}<div className="input-group"><input type="number" step="0.01" className="form-control text-end" value={v.assess} onChange={sf(sec, 'assess')} /><span className="input-group-text bg-white">บาท</span></div></div><div></div></div>
      <div style={row}><div>{lbl('เบี้ยปรับจากการชำระภาษีล่าช้า')}{money(DK.money(cc ? cc.penalty : 0), 'บาท')}</div><div>{radios('penaltyRate', [['', 'อัตโนมัติ' + (cc && cc.autoRate ? ' (' + cc.autoRate * 100 + '%)' : '')], [0.4, '40 %'], [0.2, '20 %'], [0.1, '10 %'], [0, 'ไม่คิด']])}</div></div>
      <div style={row}><div>{lbl('เงินเพิ่มจากการชำระภาษีล่าช้า')}{money(DK.money(cc ? cc.surcharge : 0), 'บาท')}</div><div>{radios('surchargeRate', [['0.01', '1 %'], ['0.005', '0.5 %'], ['0', 'ไม่คิดเงินเพิ่ม']])}</div></div>
      <div style={row}><div>{lbl('รวมเงินที่ต้องชำระทั้งสิ้น')}<div className="input-group"><input className="form-control fw-bold" readOnly value={DK.money(cc ? cc.total : Number(v.assess) || 0)} style={{ ...ro, color: 'var(--primary)' }} /><span className="input-group-text bg-white">บาท</span></div></div><div></div></div>
    </div>;
  };
  const signFields = cc => {
    const v = f.sign, ro = { background: '#e4e9f0', textAlign: 'right' };
    const setV = patch => setF({ ...f, sign: { ...v, ...patch } });
    const unit = (input, u) => <div className="input-group">{input}<span className="input-group-text bg-white">{u}</span></div>;
    const roBox = (val, u) => unit(<input className="form-control" readOnly value={val} style={ro} />, u);
    const lbl = (t, req) => <label className="form-label fw-bold mb-1">{t}{req ? <span className="text-danger"> *</span> : null}</label>;
    const radio = (name, val, l, cur, onPick, block) => <label key={l} className={'d-flex align-items-center gap-2 m-0' + (block ? ' py-1' : '')} style={{ cursor: 'pointer' }}><input type="radio" className="form-check-input m-0" name={name} checked={String(cur) === String(val)} onChange={onPick} />{l}</label>;
    const two = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px 16px', alignItems: 'end' };
    const showSurcharge = v.surchargeAmt === '' ? (cc ? cc.autoSurcharge.toFixed(2) : '0.00') : v.surchargeAmt;
    return <div className="d-flex flex-column" style={{ gap: 14, maxWidth: 640 }}>
      <Input label="วันที่ได้รับการแจ้งประเมิน" type="date" value={v.noticeDate} onChange={e => setV({ noticeDate: e.target.value })} hint={cc && cc.due ? 'ครบกำหนดชำระภายใน 15 วัน: ' + DK.thDate(cc.due) : ''} />
      <div style={two}><Input label="วันที่ชำระ" type="date" value={v.paid} onChange={e => setV({ paid: e.target.value })} /><div>{lbl('เกินกำหนด', true)}{roBox(cc ? cc.months : 0, 'เดือน')}</div></div>
      <div>{lbl('เงินภาษี')}{unit(<input type="number" step="0.01" className="form-control text-end" value={v.assess} onChange={e => setV({ assess: e.target.value })} />, 'บาท')}</div>
      <div>{lbl('เงินเพิ่มจากการชำระภาษีล่าช้า')}{unit(<input type="number" step="0.01" className="form-control text-end" value={showSurcharge} onChange={e => setV({ surchargeAmt: e.target.value })} />, 'บาท')}
        <div className="form-text d-flex gap-2 align-items-center">{v.surchargeAmt === '' ? 'คำนวณอัตโนมัติ 1% ต่อเดือน แก้ไขได้' : <>แก้ไขเอง · ตามระบบ {DK.money(cc ? cc.autoSurcharge : 0)} บาท <a href="#" onClick={e => { e.preventDefault(); setV({ surchargeAmt: '' }); }}>ใช้ค่าตามระบบ</a></>}</div></div>
      <div style={two}><Input label="วันที่ยื่นแบบ ภ.ป.1" type="date" value={v.filedDate} disabled={v.notFiled} onChange={e => setV({ filedDate: e.target.value })} hint={'กำหนดยื่นภายใน ' + DK.thDate(cc ? cc.fileDeadline : '')} /><div style={{ paddingBottom: 26 }}><Checkbox label="ไม่ได้ยื่นแบบ (เจ้าหน้าที่ตรวจพบ)" checked={v.notFiled} onChange={e => setV({ notFiled: e.target.checked, filedDate: e.target.checked ? '' : v.filedDate })} /></div></div>
      <div>{lbl('เงินเพิ่มยื่นแบบล่าช้า')}<div className="d-flex flex-wrap" style={{ gap: '6px 18px' }}>{[['auto', 'อัตโนมัติ' + (cc ? ' (' + (cc.autoLateRate ? cc.autoLateRate * 100 + '%' : 'ไม่คิด') + ')' : '')], ['0', 'ไม่คิดเงินเพิ่ม'], ['0.05', 'เพิ่ม 5%'], ['0.1', 'เพิ่ม 10%']].map(([val, l]) => radio('signLate', val, l, v.lateFilingRate, () => setV({ lateFilingRate: val })))}</div>
        <div className="form-text">อัตโนมัติ: ยื่นแบบหลังกำหนด 5% · ไม่ได้ยื่นแบบ 10% · ยื่นภายในกำหนด ไม่คิด</div></div>
      <div>{lbl('เงินเพิ่มจากการยื่นแบบล่าช้า')}{roBox(DK.money(cc ? cc.lateFiling : 0), 'บาท')}</div>
      <div>{lbl('รวมเงินที่ต้องชำระทั้งสิ้น')}{roBox(DK.money(cc ? cc.total : 0), 'บาท')}</div>
      <div className="d-flex flex-column">{[['full', 'ชำระเงินเต็มจำนวน'], ['inst1', 'ผ่อนชำระครั้งที่ 1'], ['custom', 'ระบุจำนวนเงิน']].map(([val, l]) => radio('signPay', val, l, v.payMode, () => setV({ payMode: val, payAmount: val === 'custom' ? (v.payAmount || (cc ? String(cc.total) : '')) : v.payAmount }), true))}</div>
      <div>{lbl('จำนวนเงินภาษีที่ชำระ', true)}{v.payMode === 'custom' ? unit(<input type="number" step="0.01" className="form-control text-end" value={v.payAmount} onChange={e => setV({ payAmount: e.target.value })} />, 'บาท') : roBox(DK.money(cc ? cc.payAmount : 0), 'บาท')}
        {v.payMode === 'inst1' ? <div className="form-text">ผ่อนชำระ 3 งวด งวดละ 1/3 ของยอดรวม</div> : null}</div>
      <div>{lbl('รวมชำระเงินทั้งสิ้น')}{unit(<input className="form-control fw-bold" readOnly value={DK.money(cc ? cc.payAmount : 0)} style={{ ...ro, color: 'var(--primary)' }} />, 'บาท')}</div>
    </div>;
  };
  const save = () => {
    const id = info.id.replace(/\D/g, '');
    if (!info.name.trim()) return setErr('กรุณากรอกชื่อ-นามสกุล / ชื่อสถานประกอบการ');
    if (id.length !== 13) return setErr('เลขที่เสียภาษีต้องเป็นตัวเลข 13 หลัก');
    if (DK.TAXPAYERS.some(t => t.id === id && t !== p)) return setErr('เลขที่เสียภาษีนี้มีอยู่ในทะเบียนแล้ว');
    if (f.sign.on && (!f.sign.assess || !f.sign.noticeDate)) return setErr('ภาษีป้าย: กรุณากรอกวันที่ได้รับการแจ้งประเมินและเงินภาษี');
    if (f.sign.on && f.sign.payMode === 'custom' && !(Number(f.sign.payAmount) > 0)) return setErr('ภาษีป้าย: กรุณาระบุจำนวนเงินภาษีที่ชำระ');
    for (const [k, l] of [['land', 'ภาษีที่ดิน']]) if (f[k].on && (!f[k].assess || !f[k].due)) return setErr(l + ': กรุณากรอกยอดประเมินภาษีและวันที่ครบชำระ');
    const bad = f.licenses.findIndex(l => !l.no || !l.expire); if (bad >= 0) return setErr('ใบอนุญาตใบที่ ' + (bad + 1) + ': กรุณากรอกเลขที่ใบอนุญาตและวันที่หมดอายุ');
    const nos = f.licenses.map(l => l.no.trim()); if (new Set(nos).size !== nos.length) return setErr('เลขที่ใบอนุญาตซ้ำกัน');
    onSave({ name: info.name.trim(), id, address: info.address, phone: info.phone }, y, data);
  };
  return (
    <AppModal open onClose={onClose} size="xl" tone={mode === 'add' ? 'primary' : 'warning'} icon={mode === 'add' ? 'fas fa-user-plus' : 'fas fa-pen'} title={mode === 'add' ? 'เพิ่มผู้เสียภาษี' : 'แก้ไขข้อมูลผู้เสียภาษี'}
      footer={<><Button variant="secondary" onClick={onClose}>ยกเลิก</Button><Button icon="fas fa-save" onClick={save}>{mode === 'add' ? 'เพิ่มเข้าทะเบียน' : 'บันทึกการแก้ไข'}</Button></>}>
      {err ? <div className="alert alert-danger py-2 d-flex align-items-center gap-2"><i className="fas fa-exclamation-circle"></i>{err}</div> : null}
      <div className="row g-3">
        <div className="col-12"><div className="p-3 rounded-3" style={{ background: 'var(--blue-50)' }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
            <div className="fw-bold" style={{ color: 'var(--primary)' }}><i className="fas fa-user me-2"></i>1. ข้อมูลทั่วไป</div>
            <div className="d-flex align-items-center gap-2"><span className="small fw-medium">กรอกข้อมูลภาษีของ</span><Select size="sm" options={DK.YEARS} value={y} onChange={e => changeYear(e.target.value)} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px 14px' }}>
            <Input label="ชื่อ-นามสกุล / ชื่อสถานประกอบการ" value={info.name} onChange={si('name')} />
            <Input label="เลขที่เสียภาษี (13 หลัก)" value={info.id} onChange={si('id')} inputMode="numeric" maxLength={13} />
            <Input label="ที่อยู่" value={info.address} onChange={si('address')} />
            <Input label="เบอร์โทร" value={info.phone} onChange={si('phone')} />
          </div>
        </div></div>
        <FormSection n="2" title="ภาษีที่ดินและสิ่งปลูกสร้าง" icon="fas fa-map-marked-alt" on={f.land.on} onToggle={tog('land')} full>{taxFields('land', land)}</FormSection>
        <FormSection n="3" title="ภาษีป้าย" icon="fas fa-sign" on={f.sign.on} onToggle={tog('sign')} full>{signFields(sign)}</FormSection>
        <div className="col-12"><div className="p-3 rounded-3" style={{ border: '1px solid var(--blue-200)' }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <div className="fw-bold" style={{ color: 'var(--primary)' }}><i className="fas fa-id-card me-2"></i>4. ใบอนุญาต / ค่าธรรมเนียม ({f.licenses.length} ใบ)</div>
            <Button size="sm" variant="outline" icon="fas fa-plus" onClick={addLic}>เพิ่มใบอนุญาต</Button>
          </div>
          {f.licenses.length ? <div className="d-flex flex-column gap-3">{f.licenses.map((l, i) => { const c = lics[i]; return (
            <div key={i} className="p-3 rounded-3" style={{ background: 'var(--blue-50)' }}>
              <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
                <span className="fw-bold small">ใบที่ {i + 1}</span>
                <div className="d-flex align-items-center gap-3"><span className="small">ยอดรวม <b style={{ color: 'var(--primary)' }}>{DK.money(c.total)}</b> บาท{c.fine ? ' (รวมค่าปรับ ' + DK.money(c.fine) + ')' : ''}</span><IconButton icon="fas fa-trash" tone="danger" size={30} title="ลบใบอนุญาตนี้" onClick={() => delLic(i)} /></div>
              </div>
              <div style={g2}>
                <Input label="เลขที่ใบอนุญาต" value={l.no} onChange={sl(i, 'no')} />
                <Select label="ประเภท" value={l.type} onChange={sl(i, 'type')} options={['หนังสือรับรองการแจ้ง', 'ใบอนุญาตประกอบกิจการ', 'ใบอนุญาตจำหน่ายอาหาร']} />
                <Input label="วันที่หมดอายุ" type="date" value={l.expire} onChange={sl(i, 'expire')} />
                <Input label="ค่าธรรมเนียม (บาท/ปี)" type="number" value={l.fee} onChange={sl(i, 'fee')} />
                <Input label="จำนวนปีที่ค้างชำระ" type="number" value={l.years} onChange={sl(i, 'years')} />
              </div>
            </div>); })}</div> : <div className="small text-muted text-center py-3">ยังไม่มีใบอนุญาตในปีนี้ — กด “เพิ่มใบอนุญาต”</div>}
        </div></div>
        <div className="col-12"><div className="d-flex flex-column justify-content-center h-100 p-3 rounded-3 text-white" style={{ background: 'var(--primary)' }}>
          <div className="fw-medium"><i className="fas fa-calculator me-2"></i>5. ยอดภาษีและค่าธรรมเนียมทั้งหมด ปี {y}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{DK.money(grand)} <span className="fs-6 fw-normal">บาท</span></div>
          <small style={{ opacity: .85 }}>คำนวณอัตโนมัติจากข้อมูลที่กรอก</small>
        </div></div>
      </div>
    </AppModal>
  );
}

function UploadModal({ open, onClose, onDone }) {
  const [res, setRes] = React.useState(null), [err, setErr] = React.useState(''), [busy, setBusy] = React.useState(false), [type, setType] = React.useState('land'), [y, setY] = React.useState(DK.CUR_YEAR), [drag, setDrag] = React.useState(false);
  React.useEffect(() => { if (open) { setRes(null); setErr(''); setBusy(false); } }, [open]);
  if (!open) return null;
  const TL = { land: 'ภาษีที่ดินและสิ่งปลูกสร้าง', sign: 'ภาษีป้าย' };
  const read = async file => {
    if (!file) return; setErr(''); setRes(null); setBusy(true);
    try { const r = await window.Elaas.parse(file); if (r.type) setType(r.type); if (r.year) setY(r.year); setRes(r); } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  const plan = res ? window.Elaas.plan(res) : null;
  const yearOpts = [...new Set([...(res && res.year ? [res.year] : []), ...DK.YEARS.map(o => o.value)])].map(v => ({ value: v, label: 'ปีงบประมาณ ' + v }));
  const stat = (l, v, tone) => <div className="p-2 rounded-3 text-center" style={{ background: '#fff', border: '1px solid var(--border-card)' }}><div className="small text-muted">{l}</div><div className="fw-bold" style={{ color: tone || 'var(--primary)', fontSize: '1.1rem' }}>{v}</div></div>;
  const go = () => { setBusy(true); setTimeout(() => { const n = window.Elaas.apply(res, type, y); onDone({ ...res, typeLabel: TL[type] }, n, y); }, 30); };
  return (
    <AppModal open onClose={onClose} icon="fas fa-upload" title="อัพโหลดฐานข้อมูลภาษีที่ดินและป้าย (e-LAAS)" size="lg"
      footer={<><Button variant="secondary" onClick={onClose}>ยกเลิก</Button><Button icon={busy ? 'fas fa-spinner fa-spin' : 'fas fa-check'} disabled={!res || busy} onClick={go}>{res ? 'นำเข้า ' + res.records.length.toLocaleString() + ' ราย' : 'นำเข้าข้อมูล'}</Button></>}>
      <label className="form-label fw-bold">ไฟล์รายงาน กค.1 จาก e-LAAS (.xlsx)</label>
      <label onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); read(e.dataTransfer.files[0]); }} className="d-block text-center p-4 rounded-3 mb-3" style={{ border: '2px dashed ' + (drag ? 'var(--primary)' : 'var(--blue-200)'), background: 'var(--blue-50)', cursor: 'pointer' }}>
        <i className={busy ? 'fas fa-spinner fa-spin mb-2' : 'fas fa-file-excel mb-2'} style={{ fontSize: 36, color: 'var(--status-paid)' }}></i>
        <div className="fw-medium">{res ? res.fileName : 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์'}</div>
        <div className="small text-muted">รายละเอียดผู้ชำระภาษี (กค.1) · ประเภทภาษีที่ดินและสิ่งปลูกสร้าง หรือ ภาษีป้าย</div>
        <input type="file" accept=".xlsx,.xls" className="d-none" onChange={e => read(e.target.files[0])} />
      </label>
      {err ? <div className="alert alert-danger py-2 d-flex gap-2 align-items-center"><i className="fas fa-exclamation-circle"></i>{err}</div> : null}
      {res ? <>
        <div className="row g-3 mb-3">
          <div className="col-md-6"><Select label={'ประเภทข้อมูล' + (res.type ? ' (ตรวจพบจากไฟล์)' : '')} value={type} onChange={e => setType(e.target.value)} options={[{ value: 'land', label: TL.land }, { value: 'sign', label: TL.sign }]} /></div>
          <div className="col-md-6"><Select label={'ปีงบประมาณ' + (res.year ? ' (ตรวจพบจากไฟล์)' : '')} value={y} onChange={e => setY(e.target.value)} options={yearOpts} /></div>
        </div>
        <div className="p-3 rounded-3 mb-3" style={{ background: 'var(--blue-50)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8 }}>
            {stat('ผู้เสียภาษี', res.records.length.toLocaleString() + ' ราย')}
            {stat('เพิ่มใหม่', plan.add.toLocaleString())}
            {stat('อัพเดทรายเดิม', plan.upd.toLocaleString())}
            {stat('ยังไม่ชำระ', plan.unpaid.toLocaleString() + ' ราย', 'var(--danger)')}
          </div>
          <div className="small mt-3">
            <KV k="ยอดประเมินภาษีรวม" v={DK.money(res.totals.assess) + ' บาท'} />
            <KV k="ยอดชำระแล้ว" v={DK.money(res.totals.paid) + ' บาท'} />
            <KV k="คงเหลือยังไม่ชำระ" v={DK.money(res.totals.bal) + ' บาท'} strong tone="var(--danger)" />
          </div>
          {res.footer ? <div className={'small mt-2 ' + (res.mismatch ? 'text-danger' : 'text-success')}><i className={'fas ' + (res.mismatch ? 'fa-exclamation-triangle' : 'fa-check-circle') + ' me-1'}></i>{res.mismatch ? 'ยอดรวมไม่ตรงกับแถว "รวม" ในไฟล์ (' + DK.money(res.footer.assess) + ') กรุณาตรวจสอบ' : 'ยอดรวมตรงกับแถว "รวม" ในไฟล์'}</div> : null}
          {plan.noId ? <div className="small text-muted mt-1"><i className="fas fa-info-circle me-1"></i>{plan.noId.toLocaleString()} รายไม่มีเลขประจำตัว จะจับคู่ด้วยชื่อ-นามสกุล และควรเพิ่มเลขภายหลัง</div> : null}
        </div>
        <div className="fw-bold small mb-1">ตัวอย่าง 5 รายการแรก</div>
        <div className="table-responsive"><table className="table table-sm small mb-0"><thead className="table-light"><tr><th>ชื่อ</th><th>เลขประจำตัว</th><th className="text-end">ประเมิน</th><th className="text-end">ชำระ</th><th className="text-end">คงเหลือ</th></tr></thead>
          <tbody>{res.records.slice(0, 5).map(r => <tr key={r.no}><td>{r.name}{r.properties.length > 1 ? <span className="text-muted"> ({r.properties.length} แปลง)</span> : null}</td><td className="text-muted">{r.id || '-'}</td><td className="text-end">{DK.money(r.assess)}</td><td className="text-end">{DK.money(r.paid)}</td><td className="text-end" style={{ color: r.bal ? 'var(--danger)' : undefined }}>{DK.money(r.bal)}</td></tr>)}</tbody></table></div>
      </> : null}
      <div className="form-text mt-2">ใบอนุญาตดึงข้อมูลอัตโนมัติจาก Google Sheets (ชีต Licenses และ Payments)</div>
    </AppModal>
  );
}

function Registry({ year, setYear }) {
  const [ver, setVer] = React.useState(0);
  const [removed, setRemoved] = React.useState([]);
  const all = React.useMemo(() => DK.rows(year).filter(r => !removed.includes(r.id)), [year, ver, removed]);
  const setAll = () => setVer(v => v + 1);
  const [form, setForm] = React.useState(null);
  const [cat, setCat] = React.useState(null);
  const [st, setSt] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [view, setView] = React.useState(null);
  const [modal, setModal] = React.useState(null);
  const counts = { all: all.length };
  ['paid', 'unpaid', 'expiring', 'overdue', 'review', 'other'].forEach(k => counts[k] = all.filter(r => r.status === k).length);
  const rows = all.filter(r => (!cat || r.kind === cat) && (st === 'all' || r.status === st) && (!q || (r.p.name + r.p.id).includes(q.trim())));
  const [closed, setClosed] = React.useState([]);
  const SEV = ['overdue', 'unpaid', 'expiring', 'review', 'other', 'paid'];
  const groups = React.useMemo(() => { const m = new Map(); rows.forEach(r => { if (!m.has(r.p.id)) m.set(r.p.id, { id: r.p.id, p: r.p, items: [] }); m.get(r.p.id).items.push(r); });
    return [...m.values()].map(g => { const open = g.items.filter(r => r.status !== 'paid'); return { ...g, paid: g.items.length - open.length, outstanding: open.reduce((s, r) => s + r.total, 0), nextDue: open.map(r => r.due).filter(Boolean).sort()[0], status: SEV.find(s => g.items.some(r => r.status === s)) || 'other' }; }); }, [rows]);
  const allOpen = closed.length === 0;
  const [limit, setLimit] = React.useState(50);
  React.useEffect(() => setLimit(50), [q, cat, st, year]);
  const [lineRow, setLineRow] = React.useState(null);
  const [picked, setPicked] = React.useState([]);
  const [bulk, setBulk] = React.useState(false);
  const canPick = r => r.status !== 'paid';
  const pickable = rows.filter(canPick);
  const allOn = pickable.length > 0 && pickable.every(r => picked.includes(r.id));
  const togglePick = id => setPicked(picked.includes(id) ? picked.filter(x => x !== id) : [...picked, id]);
  const toggleAll = () => setPicked(allOn ? picked.filter(id => !pickable.some(r => r.id === id)) : [...new Set([...picked, ...pickable.map(r => r.id)])]);
  const pickedRows = all.filter(r => picked.includes(r.id));
  const people = [...new Set(pickedRows.map(r => r.p.id))].length;
  const pickedTotal = pickedRows.reduce((s, r) => s + r.total, 0);
  const sendBulk = () => { pickedRows.forEach(r => { r.p.src.notified = true; }); setBulk(false); setPicked([]); setAll(); setModal({ tone: 'success', icon: 'fab fa-line', title: 'ส่งแจ้งเตือนสำเร็จ', msg: 'ส่งข้อความแจ้งเตือนผ่าน LINE OA ' + pickedRows.length + ' รายการ ถึงผู้เสียภาษี ' + people + ' ราย เรียบร้อยแล้ว' }); };
  const notify = r => setLineRow(r);
  const sendLine = () => { const r = lineRow; r.p.src.notified = true; setLineRow(null); setAll(); setModal({ tone: 'success', icon: 'fab fa-line', title: 'ส่งแจ้งเตือนสำเร็จ', msg: 'ส่งข้อความแจ้งเตือนผ่าน LINE OA ถึง ' + r.p.name + ' เรียบร้อยแล้ว' }); };
  const cats = [['land', 'ภาษีที่ดิน', 'fas fa-map-marked-alt'], ['sign', 'ภาษีป้าย', 'fas fa-sign'], ['license', 'ใบอนุญาต', 'fas fa-id-card']];
  return (
    <div>
      <Card padding="14px 20px" className="mb-3">
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <div style={{ flex: '1 1 220px', minWidth: 0 }}><Input icon="fas fa-search" placeholder="ค้นหาชื่อผู้เสียภาษี / เลขที่เสียภาษี" value={q} onChange={e => setQ(e.target.value)} /></div>
          <Button variant="outline" icon="fas fa-sync-alt" onClick={() => { setQ(''); setCat(null); setSt('all'); }}>รีเฟรช</Button>
          <Button variant="success" icon="fas fa-file-excel" onClick={() => setModal({ tone: 'success', icon: 'fas fa-file-excel', title: 'ส่งออก Excel', msg: 'ส่งออกข้อมูล ' + rows.length + ' รายการ เรียบร้อยแล้ว' })}>ส่งออก Excel</Button>
        </div>
      </Card>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div className="d-flex flex-wrap gap-2"><Button icon="fas fa-user-plus" onClick={() => setForm({ mode: 'add', p: null })}>เพิ่มผู้เสียภาษี</Button><Button variant="outline" icon="fas fa-upload" onClick={() => setModal({ upload: true })}>อัพโหลดไฟล์ภาษีที่ดิน / ป้าย</Button></div>
        <Select options={DK.YEARS} value={year} onChange={e => setYear(e.target.value)} />
      </div>
      <div className="row g-3 mb-3">
        {cats.map(([k, t, i], ci) => <div key={k} className="col-md-4"><StatCard variant="tile" tone={['primary', 'info', 'success'][ci]} label={t} value={all.filter(r => r.kind === k).length} unit="รายการ" icon={i} selected={cat === k} onClick={() => setCat(cat === k ? null : k)} sub={cat === k ? 'กำลังกรอง · คลิกอีกครั้งเพื่อยกเลิก' : 'คลิกเพื่อกรองข้อมูล'} /></div>)}
      </div>
      <div className="mb-3"><StatusFilter value={st} onChange={setSt} counts={counts} /></div>
      {picked.length ? <div className="d-flex align-items-center flex-wrap gap-2 mb-2 px-3 py-2 rounded-3" style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)', position: 'sticky', top: 8, zIndex: 5 }}>
        <span className="fw-medium" style={{ color: 'var(--primary)' }}><i className="fas fa-check-square me-2"></i>เลือก {pickedRows.length} รายการ · ผู้เสียภาษี {people} ราย · ยอดรวม {DK.money(pickedTotal)} บาท</span>
        <div className="ms-auto d-flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setPicked([])}>ยกเลิกการเลือก</Button>
          <Button size="sm" icon="fab fa-line" style={{ background: '#06c755', borderColor: '#06c755' }} onClick={() => setBulk(true)}>แจ้งเตือนผ่าน LINE ({people} ราย)</Button>
        </div>
      </div> : null}
      <Card padding="8px 16px">
        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ fontFamily: 'var(--font-sans)' }}>
            <thead className="table-light"><tr>
              {[[<input type="checkbox" className="form-check-input" title="เลือกทั้งหมดที่ยังไม่ชำระ" checked={allOn} disabled={!pickable.length} onChange={toggleAll} />, '', 36], [<button type="button" className="btn btn-link p-0 text-decoration-none" style={{ color: 'var(--text-muted)' }} title={allOpen ? 'ย่อทั้งหมด' : 'ขยายทั้งหมด'} onClick={() => setClosed(allOpen ? groups.map(g => g.id) : [])}><i className={'fas ' + (allOpen ? 'fa-angle-double-up' : 'fa-angle-double-down')}></i></button>, '', 28], ['ผู้เสียภาษี / รายการ'], ['ยอดรวม', 'end'], ['วันที่ครบกำหนด'], ['วันที่ชำระ'], ['สถานะ'], ['', 'end']].map(([t, al, w], i) => <th key={i} className={al === 'end' ? 'text-end' : ''} style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', width: w }}>{t}</th>)}
            </tr></thead>
            <tbody>
              {groups.length === 0 ? <tr><td colSpan="8" className="text-center text-muted py-4">ไม่พบข้อมูล</td></tr> : groups.slice(0, limit).map(g => {
                const open = !closed.includes(g.id);
                const gp = g.items.filter(canPick), gOn = gp.length > 0 && gp.every(r => picked.includes(r.id)), gSome = gp.some(r => picked.includes(r.id));
                const togG = () => setPicked(gOn ? picked.filter(id => !gp.some(r => r.id === id)) : [...new Set([...picked, ...gp.map(r => r.id)])]);
                return <React.Fragment key={g.id}>
                  <tr style={{ background: '#f7f9fc', cursor: 'pointer' }} onClick={() => setClosed(open ? [...closed, g.id] : closed.filter(x => x !== g.id))}>
                    <td onClick={e => e.stopPropagation()}><input type="checkbox" className="form-check-input" checked={gOn} ref={el => el && (el.indeterminate = gSome && !gOn)} disabled={!gp.length} onChange={togG} /></td>
                    <td><i className={'fas fa-chevron-' + (open ? 'down' : 'right')} style={{ color: 'var(--text-muted)', fontSize: 12 }}></i></td>
                    <td><div className="fw-bold">{g.p.name}</div><div className="small text-muted d-flex flex-wrap" style={{ gap: '0 10px' }}><span>{g.p.id}</span><span>{g.items.length} รายการ</span>{g.paid ? <span style={{ color: 'var(--success, #198754)' }}>ชำระแล้ว {g.paid}</span> : null}{g.items.length - g.paid ? <span style={{ color: 'var(--danger)' }}>ค้างชำระ {g.items.length - g.paid}</span> : null}</div></td>
                    <td className="text-end"><div className="fw-bold">{DK.money(g.outstanding)}</div><div className="small text-muted">ค้างชำระ</div></td>
                    <td>{g.nextDue ? DK.thDate(g.nextDue) : '-'}</td>
                    <td>-</td>
                    <td><StatusBadge status={g.status} /></td>
                    <td className="text-end" onClick={e => e.stopPropagation()}><div className="d-flex gap-1 justify-content-end">
                      <IconButton icon="fas fa-eye" title="ดูรายละเอียด" size={32} onClick={() => setView(g.p)} />
                      <IconButton icon="fas fa-pen" tone="warning" title="แก้ไข" size={32} onClick={() => setForm({ mode: 'edit', p: g.p.src })} />
                      <IconButton icon="fas fa-trash" tone="danger" title="ลบ" size={32} onClick={() => setModal({ confirm: g })} />
                      <IconButton icon="fab fa-line" tone="line" active={g.p.notified} title={g.p.notified ? 'แจ้งเตือนแล้ว' : 'แจ้งเตือนผ่านไลน์'} size={32} onClick={() => notify(g.items.find(canPick) || g.items[0])} />
                    </div></td>
                  </tr>
                  {open ? g.items.map(r => <tr key={r.id}>
                    <td></td>
                    <td><input type="checkbox" className="form-check-input" checked={picked.includes(r.id)} disabled={!canPick(r)} title={canPick(r) ? '' : 'ชำระแล้ว'} onChange={() => togglePick(r.id)} /></td>
                    <td><div className="d-flex align-items-center gap-2" style={{ paddingLeft: 4 }}><i className={(r.kind === 'land' ? 'fas fa-map-marked-alt' : r.kind === 'sign' ? 'fas fa-sign' : 'fas fa-id-card')} style={{ color: 'var(--primary)', width: 16, opacity: .8 }}></i><span className="small">{r.label}</span></div></td>
                    <td className="text-end small">{DK.money(r.total)}</td>
                    <td className="small">{DK.thDate(r.due)}</td>
                    <td className="small">{DK.thDate(r.paid)}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td></td>
                  </tr>) : null}
                </React.Fragment>;
              })}
            </tbody>
          </table>
        </div>
        {groups.length > 0 ? <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 py-2 small text-muted"><span>แสดง {Math.min(limit, groups.length).toLocaleString()} จาก {groups.length.toLocaleString()} ราย</span>{groups.length > limit ? <Button size="sm" variant="outline" icon="fas fa-chevron-down" onClick={() => setLimit(limit + 100)}>แสดงเพิ่ม 100 ราย</Button> : null}</div> : null}
      </Card>
      <AppModal open={bulk} onClose={() => setBulk(false)} icon="fab fa-line" title={'แจ้งเตือนผ่าน LINE OA · ' + people + ' ราย'} size="lg"
        footer={<><Button variant="secondary" onClick={() => setBulk(false)}>ยกเลิก</Button><Button icon="fab fa-line" style={{ background: '#06c755', borderColor: '#06c755' }} onClick={sendBulk}>ส่งแจ้งเตือน {pickedRows.length} รายการ</Button></>}>
        {bulk ? <div className="row g-3">
          <div className="col-md-6">
            <div className="fw-bold small mb-2">ผู้รับ ({pickedRows.length} รายการ)</div>
            <div className="d-flex flex-column" style={{ maxHeight: 420, overflowY: 'auto', gap: 6 }}>{pickedRows.map(r => <div key={r.id} className="d-flex justify-content-between align-items-center gap-2 p-2 rounded-3" style={{ border: '1px solid var(--border-card)' }}>
              <div style={{ minWidth: 0 }}><div className="fw-medium small">{r.p.name}{r.p.notified ? <span className="badge rounded-pill ms-2" style={{ background: '#e6f9ee', color: '#06a048' }}>เคยแจ้งแล้ว</span> : null}</div><div className="text-muted" style={{ fontSize: 12 }}>{r.label} · {DK.money(r.total)} บาท</div></div>
              <StatusBadge status={r.status} />
            </div>)}</div>
          </div>
          <div className="col-md-6"><div className="fw-bold small mb-2">ตัวอย่างข้อความ (รายการแรก)</div><LinePreview r={pickedRows[0]} /><div className="small text-muted text-center mt-2">ข้อความแต่ละรายการจะใส่ชื่อ ยอด และวันครบกำหนดของผู้รับนั้นๆ</div></div>
        </div> : null}
      </AppModal>
      <AppModal open={!!lineRow} onClose={() => setLineRow(null)} icon="fab fa-line" title={lineRow && lineRow.p.notified ? 'ข้อความที่ส่งผ่าน LINE OA' : 'ตัวอย่างข้อความ LINE OA'}
        footer={<><Button variant="secondary" onClick={() => setLineRow(null)}>{lineRow && lineRow.p.notified ? 'ปิด' : 'ยกเลิก'}</Button><Button icon={lineRow && lineRow.p.notified ? 'fas fa-redo' : 'fab fa-line'} style={{ background: '#06c755', borderColor: '#06c755' }} onClick={sendLine}>{lineRow && lineRow.p.notified ? 'ส่งซ้ำ' : 'ส่งแจ้งเตือน'}</Button></>}>
        {lineRow ? <><LinePreview r={lineRow} sent={lineRow.p.notified} />{lineRow.p.notified ? <div className="small text-muted text-center mt-2"><i className="fas fa-check-circle text-success me-1"></i>ส่งการแจ้งเตือนถึงผู้เสียภาษีรายนี้แล้ว</div> : null}</> : null}
      </AppModal>
      <DetailModal p={view} onClose={() => setView(null)} onEdit={() => { setForm({ mode: 'edit', p: view.src }); setView(null); }} />
      <TaxpayerForm open={!!form} mode={form && form.mode} p={form && form.p} year={year} onClose={() => setForm(null)} onSave={(info, y, data) => {
        let p = form.p;
        if (form.mode === 'add') p = DK.addTaxpayer(info, y, data); else { Object.assign(p, info); DK.saveYear(p, y, data); }
        setForm(null); if (y !== year) setYear(y); setVer(v => v + 1);
        setModal({ tone: 'success', icon: 'fas fa-check-circle', title: form.mode === 'add' ? 'เพิ่มผู้เสียภาษีสำเร็จ' : 'บันทึกสำเร็จ', msg: (form.mode === 'add' ? 'เพิ่ม ' : 'แก้ไขข้อมูล ') + info.name + ' ปีงบประมาณ ' + y + ' เรียบร้อยแล้ว' });
      }} />
      <AppModal open={!!(modal && modal.msg)} onClose={() => setModal(null)} tone={modal && modal.tone} icon={modal && modal.icon} title={modal && modal.title} centeredBody><h5 className="mb-0">{modal && modal.msg}</h5></AppModal>
      <AppModal open={!!(modal && modal.confirm)} onClose={() => setModal(null)} tone="danger" icon="fas fa-trash" title="ยืนยันการลบ" centeredBody
        footer={<><Button variant="secondary" onClick={() => setModal(null)}>ยกเลิก</Button><Button variant="danger" icon="fas fa-trash" onClick={() => { setRemoved([...removed, ...(modal.confirm.items ? modal.confirm.items.map(r => r.id) : [modal.confirm.id])]); setModal(null); }}>ลบรายการ</Button></>}>
        <h5 className="mb-1">{modal && modal.confirm && modal.confirm.items ? 'ต้องการลบผู้เสียภาษีรายนี้ใช่หรือไม่?' : 'ต้องการลบรายการนี้ใช่หรือไม่?'}</h5><div className="text-muted">{modal && modal.confirm && (modal.confirm.items ? modal.confirm.p.name + ' · ' + modal.confirm.items.length + ' รายการในปีงบประมาณนี้' : modal.confirm.p.name + ' · ' + modal.confirm.label)}</div>
      </AppModal>
      <UploadModal open={!!(modal && modal.upload)} onClose={() => setModal(null)} onDone={(res, n, y) => { if (y !== year) setYear(y); setVer(v => v + 1); setModal({ tone: 'success', icon: 'fas fa-check-circle', title: 'นำเข้าข้อมูลสำเร็จ', msg: 'นำเข้า' + (res.typeLabel) + ' ปีงบประมาณ ' + y + ' จำนวน ' + res.records.length.toLocaleString() + ' ราย (เพิ่มใหม่ ' + n.add.toLocaleString() + ' · อัพเดท ' + n.upd.toLocaleString() + ')' }); }} />
    </div>
  );
}
Object.assign(window, { Registry, KV });
