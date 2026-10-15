import React from 'react';
export function StatCard({ label, value, unit, icon, tone = 'primary', sub, progress, selected = false, onClick, accent = 'none', variant = 'default' }) {
  if (variant === 'tile') return <TileStat {...{ label, value, unit, icon, tone, sub, progress, selected, onClick }} />;
  if (variant === 'filled') return <FilledStat {...{ label, value, unit, icon, tone, sub, progress, selected, onClick }} />;
  const c = { primary: 'var(--primary)', success: 'var(--status-paid)', warning: '#b58100', orange: 'var(--status-expiring)', danger: 'var(--status-overdue)', info: 'var(--status-review)', muted: 'var(--status-other)' }[tone] || 'var(--primary)';
  const clickable = !!onClick;
  return (
    <div onClick={onClick} role={clickable ? 'button' : undefined} style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', padding: 'var(--card-pad)', boxShadow: selected ? '0 0 0 2px ' + c + ', var(--shadow-card)' : 'var(--shadow-card)', border: '1px solid var(--border-card)', borderTop: accent === 'top' ? '4px solid ' + c : '1px solid var(--border-card)', cursor: clickable ? 'pointer' : 'default', height: '100%', transition: 'box-shadow .2s, transform .2s' }}>
      <div className="d-flex justify-content-between align-items-start gap-2">
        <div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-label)', marginBottom: 5 }}>{label}</div>
        {icon ? <span className="d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40, borderRadius: 10, background: 'color-mix(in srgb, ' + c + ' 12%, white)', color: c, fontSize: '1.1rem' }}><i className={icon}></i></span> : null}
      </div>
      <div style={{ fontSize: 'var(--fs-stat)', fontWeight: 700, color: c, lineHeight: 1.2 }}>{value}{unit ? <span className="fs-5 text-muted fw-normal ms-1">{unit}</span> : null}</div>
      {typeof progress === 'number' ? <div className="progress mt-2" style={{ height: 6 }}><div className="progress-bar" style={{ width: progress + '%', background: c }}></div></div> : null}
      {sub ? <div className="mt-2" style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>{sub}</div> : null}
    </div>
  );
}
const FILL = { primary: ['#123a6e', '#2563b0'], success: ['#0f7a45', '#1f9d5e'], warning: ['#9a6200', '#c27c00'], orange: ['#b83a0b', '#e0560f'], danger: ['#a51d1d', '#d62828'], info: ['#0b627e', '#1385a8'], muted: ['#3f4a5a', '#647084'] };
function FilledStat({ label, value, unit, icon, tone, sub, progress, selected, onClick }) {
  const [a, b] = FILL[tone] || FILL.primary;
  const [hv, setHv] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHv(true)} onMouseLeave={() => setHv(false)} role={onClick ? 'button' : undefined} style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, ' + a + ' 0%, ' + b + ' 100%)', color: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--card-pad)', height: '100%', boxShadow: (selected ? '0 0 0 3px #fff, 0 0 0 5px ' + a + ', ' : '') + (hv ? '0 12px 26px ' + a + '55' : '0 6px 16px ' + a + '33'), transform: hv ? 'translateY(-2px)' : 'none', transition: 'box-shadow .2s, transform .2s', cursor: onClick ? 'pointer' : 'default', fontFamily: 'var(--font-sans)' }}>
      {icon ? <i className={icon} style={{ position: 'absolute', right: -10, bottom: -14, fontSize: 92, opacity: .12, pointerEvents: 'none' }}></i> : null}
      <div className="d-flex justify-content-between align-items-start gap-2" style={{ position: 'relative' }}>
        <div style={{ fontSize: 'var(--fs-label)', fontWeight: 500, marginBottom: 5 }}>{label}</div>
        {icon ? <span className="d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,.18)', fontSize: '1.1rem' }}><i className={icon}></i></span> : null}
      </div>
      <div style={{ position: 'relative', fontSize: 'var(--fs-stat)', fontWeight: 700, lineHeight: 1.2 }}>{value}{unit ? <span className="fs-5 fw-normal ms-1">{unit}</span> : null}</div>
      {typeof progress === 'number' ? <div className="progress mt-2" style={{ height: 6, background: 'rgba(255,255,255,.25)', position: 'relative' }}><div className="progress-bar" style={{ width: progress + '%', background: '#fff' }}></div></div> : null}
      {sub ? <div className="mt-2" style={{ position: 'relative', fontSize: 'var(--fs-sm)' }}>{sub}</div> : null}
    </div>
  );
}
const TINT = { primary: ['#e6eefb', '#1d4a9a'], success: ['#e3f6ec', '#1f9d5e'], warning: ['#fff3d9', '#c27c00'], orange: ['#ffe9dd', '#e0560f'], danger: ['#fde6e6', '#d62828'], info: ['#def3f8', '#1385a8'], muted: ['#eceff3', '#647084'], purple: ['#efe8fb', '#7a4cc4'] };
function TileStat({ label, value, unit, icon, tone, sub, progress, selected, onClick }) {
  const [bg, fg] = TINT[tone] || TINT.primary;
  const [hv, setHv] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHv(true)} onMouseLeave={() => setHv(false)} role={onClick ? 'button' : undefined} style={{ background: '#fff', borderRadius: 18, border: '1px solid ' + (selected ? fg : '#e8edf4'), boxShadow: selected ? '0 0 0 3px ' + bg + ', 0 8px 20px rgba(21,62,117,.10)' : hv ? '0 10px 24px rgba(21,62,117,.12)' : '0 4px 14px rgba(21,62,117,.06)', padding: '18px 20px', height: '100%', display: 'flex', alignItems: 'center', gap: 16, cursor: onClick ? 'pointer' : 'default', transform: hv && onClick ? 'translateY(-2px)' : 'none', transition: 'box-shadow .2s, transform .2s, border-color .2s', fontFamily: 'var(--font-sans)' }}>
      {icon ? <span className="d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 58, height: 58, borderRadius: 16, background: bg, color: fg, fontSize: '1.45rem' }}><i className={icon}></i></span> : null}
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.1, color: '#1d2735' }}>{value}{unit ? <span style={{ fontSize: '.95rem', fontWeight: 400, color: '#6b7686', marginLeft: 6 }}>{unit}</span> : null}</div>
        <div style={{ fontSize: '.95rem', color: '#6b7686', marginTop: 2 }}>{label}</div>
        {typeof progress === 'number' ? <div className="progress mt-2" style={{ height: 6, background: bg }}><div className="progress-bar" style={{ width: progress + '%', background: fg }}></div></div> : null}
        {sub ? <div style={{ fontSize: '.82rem', color: '#8a94a3', marginTop: 4 }}>{sub}</div> : null}
      </div>
    </div>
  );
}
