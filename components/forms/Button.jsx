import React from 'react';
export function Button({ variant = 'primary', size = 'md', icon, iconRight, loading = false, block = false, disabled, className = '', children, ...rest }) {
  const v = { primary: 'btn-primary', outline: 'btn-outline-primary', secondary: 'btn-light border', danger: 'btn-danger', success: 'btn-success', line: 'btn-line', ghost: 'btn-link text-decoration-none' }[variant] || 'btn-primary';
  const s = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  const lineStyle = variant === 'line' ? { background: 'var(--line-green)', borderColor: 'var(--line-green)', color: '#fff' } : null;
  return (
    <button className={['btn', v, s, block ? 'w-100' : '', 'fw-medium d-inline-flex align-items-center justify-content-center gap-2', className].join(' ')} disabled={disabled || loading} style={{ fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', flexShrink: 0, ...lineStyle, ...rest.style }} {...rest}>
      {loading ? <i className="fas fa-spinner fa-spin"></i> : icon ? <i className={icon}></i> : null}
      {children}
      {iconRight && !loading ? <i className={iconRight}></i> : null}
    </button>
  );
}
