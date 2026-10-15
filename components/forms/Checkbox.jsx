import React from 'react';
export function Checkbox({ label, id, className = '', ...rest }) {
  const cid = id || 'cb-' + Math.random().toString(36).slice(2, 8);
  return (
    <div className={'form-check mb-0 ' + className}>
      <input className="form-check-input" type="checkbox" id={cid} style={{ cursor: 'pointer' }} {...rest} />
      {label ? <label className="form-check-label" htmlFor={cid}>{label}</label> : null}
    </div>
  );
}
