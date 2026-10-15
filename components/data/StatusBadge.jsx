import React from 'react';
const MAP = {
  paid: { t: 'ชำระแล้ว', i: 'fas fa-check-circle', k: 'paid' },
  unpaid: { t: 'ยังไม่ชำระ', i: 'fas fa-clock', k: 'unpaid' },
  expiring: { t: 'ใกล้หมดอายุ', i: 'fas fa-hourglass-half', k: 'expiring' },
  overdue: { t: 'เกินกำหนด', i: 'fas fa-exclamation-circle', k: 'overdue' },
  review: { t: 'รอตรวจสอบ', i: 'fas fa-search-dollar', k: 'review' },
  other: { t: 'อื่นๆ', i: 'fas fa-ellipsis-h', k: 'other' }
};
export function StatusBadge({ status = 'unpaid', label, icon = true }) {
  const m = MAP[status] || MAP.other;
  return (
    <span style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', fontSize: 'var(--fs-sm)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', background: 'var(--status-' + m.k + '-bg)', color: 'var(--status-' + m.k + '-fg)' }}>
      {icon ? <i className={m.i}></i> : null}{label || m.t}
    </span>
  );
}
