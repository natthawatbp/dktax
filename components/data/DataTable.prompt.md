Responsive data table used for registry, transactions, notifications, history. Money columns align end.
```jsx
<DataTable columns={[{key:'name',title:'ชื่อผู้เสียภาษี'},{key:'total',title:'ยอดรวม',align:'end'},{key:'s',title:'สถานะ',render:r=><StatusBadge status={r.status}/>}]} rows={rows} />
```
