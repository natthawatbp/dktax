# UI kit — DK One Tax Bill web app

Interactive recreation of the full app, built from `Tax/Index.html` patterns + the brief. Composes components from `_ds_bundle.js`.

- `index.html` — shell: login gate, role-filtered `Sidebar`, `TopNavbar`, login-success + logout modals. Session persisted in localStorage.
- `data.js` — mock taxpayers / payments / notifications + penalty, surcharge, licence-fine calculators.
- `Login.jsx` — login card, register modal, "ลงทะเบียนสำเร็จ รอ Admin กดยืนยัน" modal showing Username/Password.
- `Dashboard.jsx` — ภาพรวมการจัดเก็บรายได้: 8 KPI cards, สัดส่วนจัดเก็บตามประเภท, งานที่ต้องติดตาม.
- `Registry.jsx` — ทะเบียนผู้เสียภาษี: search/refresh/export, Excel upload modal, 3 clickable category cards, 7-status filter, table with view/edit/delete/LINE actions, 5-section detail modal.
- `Citizen.jsx` — รายการของฉัน (multi-select → auto-generated Thai QR PromptPay with exact amount + ref, slip upload, LINE OA) and ประวัติการชำระ.
- `promptpay.js` — payment config (localStorage `dk_settings`) + Thai QR builder: PromptPay (tag 29, tax ID 0994000424621) or Bill Payment/Biller ID (tag 30, ref1/ref2). CRC16.
- `Settings.jsx` — ตั้งค่าระบบ (Admin): บัญชีรับชำระเงิน + ทดลอง QR, LINE OA/LINE Login, Licenses/Payments sheet mapping.
- `Staff.jsx` — แจ้งเตือน, ธุรกรรม (confirm only for เจ้าหน้าที่การเงิน), ผู้ลงทะเบียน (admin).

Demo logins: `admin/admin1234`, `finance/finance1234`, `revenue/revenue1234`, `health/health1234`, `exec/exec1234`, `3500100123456/user1234`.
