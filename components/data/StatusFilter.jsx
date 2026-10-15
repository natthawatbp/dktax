import React from 'react';
const ITEMS = [
  { k: 'all', t: 'ทั้งหมด', c: 'var(--primary)' },
  { k: 'paid', t: 'ชำระแล้ว', c: 'var(--status-paid)' },
  { k: 'unpaid', t: 'ยังไม่ชำระ', c: 'var(--status-unpaid)' },
  { k: 'expiring', t: 'ใกล้หมดอายุ', c: 'var(--status-expiring)' },
  { k: 'overdue', t: 'เกินกำหนด', c: 'var(--status-overdue)' },
  { k: 'review', t: 'รอตรวจสอบ', c: 'var(--status-review)' },
  { k: 'other', t: 'อื่นๆ', c: 'var(--status-other)' }
];
export function StatusFilter({ value = 'all', counts = {}, onChange }) {
  return (
    <div className="d-flex flex-wrap" style={{ gap: 8 }}>
      {ITEMS.map(it => {
        const on = value === it.k;
        return (
          <button key={it.k} type="button" onClick={() => onChange && onChange(it.k)} className="btn btn-sm d-inline-flex align-items-center" style={{ gap: 6, whiteSpace: 'nowrap', flexShrink: 0, borderRadius: 'var(--radius-pill)', padding: '6px 14px', fontWeight: 500, border: '1px solid ' + (on ? it.c : 'var(--border-default)'), background: on ? it.c : '#fff', color: on ? '#fff' : 'var(--text-body)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: on ? '#fff' : it.c }}></span>
            {it.t}
            {counts[it.k] != null ? <span style={{ fontSize: 12, opacity: on ? .9 : .6 }}>{counts[it.k]}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
