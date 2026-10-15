import React from 'react';
export function AppModal({ open, onClose, title = 'แจ้งเตือน', icon = 'fas fa-bell', tone = 'primary', size, centeredBody = false, footer, children }) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => { if (e.key === 'Escape' && onClose) onClose(); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  const bg = { primary: 'var(--primary)', danger: 'var(--danger)', success: 'var(--status-paid)', warning: 'var(--status-expiring)' }[tone] || 'var(--primary)';
  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget && onClose) onClose(); }} style={{ zIndex: 1055 }}>
        <div className={'modal-dialog modal-dialog-centered modal-dialog-scrollable ' + (size === 'lg' ? 'modal-lg' : size === 'xl' ? 'modal-xl' : size === 'sm' ? 'modal-sm' : '')}>
          <div className="modal-content">
            <div className="modal-header text-white border-0" style={{ background: bg }}>
              <h5 className="modal-title fw-semibold"><i className={icon + ' me-2'}></i>{title}</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className={'modal-body ' + (centeredBody ? 'text-center py-4' : '')}>{children}</div>
            {footer !== null ? <div className={'modal-footer border-0 ' + (centeredBody ? 'justify-content-center' : '')}>{footer || <button type="button" className="btn btn-primary px-4" onClick={onClose}>ตกลง</button>}</div> : null}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
    </>
  );
}
