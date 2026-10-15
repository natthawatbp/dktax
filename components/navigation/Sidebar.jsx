import React from 'react';
import { Logo } from '../brand/Logo.jsx';
export function Sidebar({ items = [], active, onSelect, collapsed = false, mobileOpen = false, onCloseMobile, isMobile = false, footer = [] }) {
  const rail = collapsed && !isMobile;
  const [hover, setHover] = React.useState(null);
  const w = rail ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
  const pos = isMobile ? { position: 'fixed', top: 0, bottom: 0, left: 0, transform: mobileOpen ? 'none' : 'translateX(-100%)', boxShadow: mobileOpen ? '0 0 40px rgba(0,0,0,.35)' : 'none' } : { position: 'relative' };
  return (
    <>
      {isMobile && mobileOpen ? <div onClick={onCloseMobile} style={{ position: 'fixed', inset: 0, background: 'var(--overlay)', zIndex: 1040 }}></div> : null}
      <aside style={{ width: w, minWidth: w, height: '100%', background: 'linear-gradient(180deg, #1a4a9c 0%, #153e75 55%, #0f2f5e 100%)', color: '#fff', display: 'flex', flexDirection: 'column', zIndex: 1045, transition: 'all var(--dur-base) var(--ease)', fontFamily: 'var(--font-sans)', overflow: 'hidden', ...pos }}>
        {!rail ? (
          <div style={{ textAlign: 'center', padding: '34px 20px 18px' }}>
            <Logo onDark style={{ borderRadius: 8, padding: '6px 8px' }} />
            <div style={{ fontWeight: 700, fontSize: 20, marginTop: 22, lineHeight: 1.2 }}>DK One Tax Bill</div>
            <div style={{ fontSize: 14, opacity: .85, marginTop: 4 }}>เทศบาลเมืองดอนแก้ว</div>
          </div>
        ) : <div style={{ height: 30 }}></div>}
        <ul style={{ listStyle: 'none', padding: rail ? '0 12px' : '10px 14px', margin: 0, flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.filter(it => it.key !== 'logout').map(it => {
            const on = active === it.key;
            const hv = hover === it.key && !on;
            return (
              <li key={it.key}>
                <a href="#" title={rail ? it.label : undefined} onMouseEnter={() => setHover(it.key)} onMouseLeave={() => setHover(null)} onClick={e => { e.preventDefault(); onSelect && onSelect(it.key); }} style={{ height: 58, padding: rail ? 0 : '0 18px', display: 'flex', alignItems: 'center', justifyContent: rail ? 'center' : 'flex-start', gap: 16, color: '#fff', textDecoration: 'none', fontWeight: on ? 600 : 500, fontSize: 16, borderRadius: 16, background: on ? 'rgba(255,255,255,.22)' : hv ? 'rgba(255,255,255,.09)' : 'transparent', transition: '.2s', whiteSpace: 'nowrap' }}>
                  <i className={it.icon} style={{ width: 24, textAlign: 'center', fontSize: rail ? '1.3rem' : '1.15rem' }}></i>
                  {!rail ? <span className="flex-grow-1">{it.label}</span> : null}
                  {!rail && it.badge ? <span className="badge rounded-pill bg-danger">{it.badge}</span> : null}
                </a>
              </li>
            );
          })}
        </ul>
        {items.some(it => it.key === 'logout') ? <div style={{ padding: rail ? '10px 12px 18px' : '8px 14px 18px' }}><a href="#" title={rail ? 'ออกจากระบบ' : undefined} onClick={e => { e.preventDefault(); onSelect && onSelect('logout'); }} style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: rail ? 'center' : 'flex-start', gap: 16, padding: rail ? 0 : '0 18px', color: '#fff', textDecoration: 'none', fontWeight: 500, borderRadius: 16, border: '1px solid rgba(255,255,255,.35)', background: 'rgba(255,255,255,.12)' }}><i className="fas fa-sign-out-alt" style={{ width: 24, textAlign: 'center', fontSize: '1.15rem' }}></i>{!rail ? <span>ออกจากระบบ</span> : null}</a></div> : null}
        {!rail && footer && footer.length ? <div style={{ padding: '16px 20px 22px', fontSize: 13, lineHeight: 1.75, opacity: .9 }}>{footer.map((f, i) => <div key={i}>{f}</div>)}</div> : null}
      </aside>
    </>
  );
}
