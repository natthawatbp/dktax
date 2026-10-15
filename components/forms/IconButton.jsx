import React from 'react';
export function IconButton({ icon, tone = 'primary', active = false, title, size = 34, ...rest }) {
  const c = { primary: 'var(--primary)', danger: 'var(--danger)', warning: '#b58100', line: 'var(--line-green)', muted: 'var(--text-muted)' }[tone] || 'var(--primary)';
  return (
    <button type="button" title={title} aria-label={title} className="btn p-0 d-inline-flex align-items-center justify-content-center" style={{ width: size, height: size, borderRadius: 'var(--radius-md)', border: '1px solid ' + (active ? c : 'var(--border-default)'), background: active ? c : '#fff', color: active ? '#fff' : c, transition: 'all .2s' }} {...rest}>
      <i className={icon}></i>
    </button>
  );
}
