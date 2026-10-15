import React from 'react';
export function DataTable({ columns = [], rows = [], rowKey = 'id', empty = 'ไม่พบข้อมูล', footer }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0" style={{ fontFamily: 'var(--font-sans)' }}>
        <thead className="table-light">
          <tr>{columns.map(c => <th key={c.key} className={c.align === 'end' ? 'text-end' : c.align === 'center' ? 'text-center' : ''} style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', width: c.width }}>{c.title}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? <tr><td colSpan={columns.length} className="text-center text-muted py-4">{empty}</td></tr> :
            rows.map((r, i) => <tr key={r[rowKey] ?? i}>{columns.map(c => <td key={c.key} className={c.align === 'end' ? 'text-end' : c.align === 'center' ? 'text-center' : ''}>{c.render ? c.render(r, i) : r[c.key]}</td>)}</tr>)}
        </tbody>
        {footer ? <tfoot>{footer}</tfoot> : null}
      </table>
    </div>
  );
}
