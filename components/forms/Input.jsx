import React from 'react';
export function Input({ label, type = 'text', size, icon, hint, error, className = '', id, ...rest }) {
  const [show, setShow] = React.useState(false);
  const isPw = type === 'password';
  const inputId = id || (label ? 'in-' + label.replace(/\s/g, '') : undefined);
  const cls = ['form-control', size === 'lg' ? 'form-control-lg' : size === 'sm' ? 'form-control-sm' : '', error ? 'is-invalid' : ''].join(' ');
  const field = <input id={inputId} type={isPw && show ? 'text' : type} className={cls} {...rest} style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.5, letterSpacing: isPw && !show ? '.08em' : 'normal', textOverflow: 'ellipsis', minWidth: 0, ...(rest.style || {}) }} />;
  return (
    <div className={'text-start ' + className}>
      {label ? <label htmlFor={inputId} className="form-label fw-bold">{label}</label> : null}
      {icon || isPw ? (
        <div className="input-group has-validation">
          {icon ? <span className="input-group-text bg-white text-muted" style={{ width: 46, justifyContent: 'center' }}><i className={icon} style={{ width: 16, textAlign: 'center' }}></i></span> : null}
          {field}
          {isPw ? <button type="button" className="btn btn-outline-secondary" style={{ borderColor: 'var(--bs-border-color)', width: 46, flex: '0 0 46px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShow(!show)} aria-label={show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}><i className={show ? 'fas fa-eye-slash' : 'fas fa-eye'} style={{ width: 20, textAlign: 'center' }}></i></button> : null}
          {error ? <div className="invalid-feedback">{error}</div> : null}
        </div>
      ) : <>{field}{error ? <div className="invalid-feedback">{error}</div> : null}</>}
      {hint && !error ? <div className="form-text">{hint}</div> : null}
    </div>
  );
}
