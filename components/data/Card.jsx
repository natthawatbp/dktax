import React from 'react';
export function Card({ title, icon, actions, padding = 'var(--card-pad)', className = '', style, children }) {
  return (
    <div className={className} style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', padding, boxShadow: 'var(--shadow-card)', border: '1px solid var(--border-card)', ...style }}>
      {title || actions ? (
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          {title ? <h5 className="fw-bold mb-0" style={{ color: 'var(--text-body)' }}>{icon ? <i className={icon + ' me-2'} style={{ color: 'var(--primary)' }}></i> : null}{title}</h5> : <span></span>}
          {actions ? <div className="d-flex gap-2 flex-wrap">{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
