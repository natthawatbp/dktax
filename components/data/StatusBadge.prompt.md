Status pill — always use for payment state, never raw colored text.
```jsx
<StatusBadge status="paid" /> <StatusBadge status="overdue" /> <StatusBadge status="review" label="รอการเงินตรวจสอบ" />
```
paid=ชำระแล้ว (green), unpaid=ยังไม่ชำระ (amber), expiring=ใกล้หมดอายุ (orange), overdue=เกินกำหนด (red), review=รอตรวจสอบ (blue), other=อื่นๆ (gray).
