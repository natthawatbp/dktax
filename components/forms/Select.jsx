import React from 'react';
export function Select({ label, options = [], size, className = '', value, defaultValue, onChange, disabled, style, id }) {
  const opts = options.map(o => typeof o === 'object' ? o : { value: o, label: String(o) });
  const [inner, setInner] = React.useState(defaultValue ?? (opts[0] && opts[0].value));
  const cur = value !== undefined ? value : inner;
  const [open, setOpen] = React.useState(false);
  const [hi, setHi] = React.useState(-1);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const sel = opts.find(o => String(o.value) === String(cur)) || opts[0];
  const pick = o => { setOpen(false); if (value === undefined) setInner(o.value); onChange && onChange({ target: { value: String(o.value) }, currentTarget: { value: String(o.value) } }); };
  const key = e => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!open) { setOpen(true); setHi(opts.indexOf(sel)); return; } setHi(i => Math.max(0, Math.min(opts.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)))); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (open && hi >= 0) pick(opts[hi]); else { setOpen(true); setHi(opts.indexOf(sel)); } }
    else if (e.key === 'Escape') setOpen(false);
  };
  const cls = 'form-select text-start ' + (size === 'sm' ? 'form-select-sm' : size === 'lg' ? 'form-select-lg' : '');
  return (
    <div className={'text-start ' + className} style={{ position: 'relative', ...style }} ref={ref}>
      {label ? <label className="form-label fw-bold" htmlFor={id}>{label}</label> : null}
      <button type="button" id={id} className={cls} disabled={disabled} aria-haspopup="listbox" aria-expanded={open} onClick={() => { setOpen(!open); setHi(opts.indexOf(sel)); }} onKeyDown={key} style={{ fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', ...(open ? { borderColor: '#4a8fd6', boxShadow: '0 0 0 .25rem rgba(21,62,117,.18)' } : null) }}>{sel ? sel.label : ''}</button>
      {open ? (
        <ul role="listbox" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 4px)', zIndex: 1080, margin: 0, padding: 6, listStyle: 'none', background: '#fff', border: '1px solid var(--border-card)', borderRadius: 10, boxShadow: '0 10px 30px rgba(12,37,71,.15)', maxHeight: 260, overflowY: 'auto', minWidth: 'max-content', fontFamily: 'var(--font-sans)' }}>
          {opts.map((o, i) => {
            const on = String(o.value) === String(cur);
            return <li key={o.value} role="option" aria-selected={on} onMouseEnter={() => setHi(i)} onMouseDown={e => { e.preventDefault(); pick(o); }} style={{ padding: size === 'sm' ? '6px 10px' : '8px 12px', borderRadius: 6, cursor: 'pointer', fontSize: size === 'sm' ? '.875rem' : '1rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', color: on ? 'var(--primary)' : 'var(--text-body)', fontWeight: on ? 600 : 400, background: hi === i ? 'var(--blue-50)' : 'transparent' }}>{o.label}{on ? <i className="fas fa-check" style={{ fontSize: 12 }}></i> : null}</li>;
          })}
        </ul>
      ) : null}
    </div>
  );
}
