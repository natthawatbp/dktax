Bootstrap modal for every popup: success/error alerts, register form, detail views, confirm dialogs.
```jsx
<AppModal open={ok} onClose={()=>setOk(false)} tone="success" icon="fas fa-check-circle" title="เข้าสู่ระบบสำเร็จ" centeredBody>
  <h5 className="mb-0">ยินดีต้อนรับ คุณสมชาย ใจดี</h5>
</AppModal>
```
tone: primary (info), success, danger (errors / delete confirm), warning. size lg/xl for detail views.
