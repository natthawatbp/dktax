import React from 'react';
export function TopNavbar({ title, onToggle, user = {}, onLogout, extra }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const initials = (user.name || 'U').trim().charAt(0);
  return (
    <nav style={{ background: '#fff', padding: 'var(--navbar-pad)', boxShadow: 'var(--shadow-navbar)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, gap: 12, fontFamily: 'var(--font-sans)' }}>
      <div className="d-flex align-items-center" style={{ minWidth: 0, gap: 16 }}>
        <button onClick={onToggle} aria-label="ย่อ/ขยายเมนู" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}><span style={{ display: 'inline-flex', width: 26, height: 22, border: '2px solid var(--text-body)', borderRadius: 4, padding: 2, boxSizing: 'border-box' }}><span style={{ width: 6, background: 'var(--text-body)', borderRadius: 1 }}></span></span></button>
        <h5 className="mb-0 fw-bold text-truncate" style={{ color: 'var(--text-body)' }}>{title}</h5>
      </div>
      <div className="d-flex align-items-center" style={{ gap: 12 }} ref={ref}>
        {extra}
        <div className="text-end d-none d-md-block" style={{ lineHeight: 1.3 }}>
          <div className="fw-bold">{user.name}</div>
          <small className="d-inline-flex align-items-center text-muted" style={{ gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: user.online === false ? 'var(--gray-400)' : 'var(--status-paid)' }}></span>{user.role}</small>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setOpen(!open)} aria-label="ข้อมูลผู้ใช้งาน" style={{ width: 'var(--avatar-size)', height: 'var(--avatar-size)', borderRadius: '50%', border: '2px solid ' + (open ? 'var(--blue-500)' : 'var(--blue-100)'), background: user.avatar ? 'center/cover url(' + user.avatar + ')' : 'var(--primary)', color: '#fff', fontWeight: 700, padding: 0, cursor: 'pointer' }}>{user.avatar ? null : initials}</button>
          {open ? (
            <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 10px)', width: 280, background: '#fff', borderRadius: 'var(--radius-card)', boxShadow: '0 10px 30px rgba(12,37,71,.15)', border: '1px solid var(--border-card)', overflow: 'hidden', zIndex: 1100 }}>
              <div style={{ background: 'var(--primary)', color: '#fff', padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ width: 48, height: 48, borderRadius: '50%', background: user.avatar ? 'center/cover url(' + user.avatar + ')' : 'rgba(255,255,255,.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, flexShrink: 0 }}>{user.avatar ? null : initials}</span>
                <div style={{ minWidth: 0 }}><div className="fw-bold text-truncate">{user.name}</div><small style={{ opacity: .85 }}>{user.role}</small></div>
              </div>
              <div style={{ padding: '12px 16px', fontSize: '.9rem' }}>
                {(user.fields || []).map(f => <div key={f.label} className="d-flex justify-content-between py-1" style={{ gap: 12 }}><span className="text-muted">{f.label}</span><span className="fw-medium text-end">{f.value}</span></div>)}
              </div>
              {onLogout ? <div style={{ borderTop: '1px solid var(--border-card)', padding: 8 }}><button className="btn btn-sm w-100 text-danger fw-medium" onClick={onLogout}><i className="fas fa-sign-out-alt me-2"></i>ออกจากระบบ</button></div> : null}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
