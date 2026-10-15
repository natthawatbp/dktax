# DK One Tax Bill — Design System

**DK One Tax Bill** (ระบบรวมใบแจ้งภาระภาษีและค่าธรรมเนียม) is a web application for **เทศบาลเมืองดอนแก้ว (Don Kaeo Town Municipality, Mae Rim, Chiang Mai)**. It consolidates land & building tax, signboard tax and licence fees into a single bill per taxpayer, lets citizens pay by QR code and receive LINE OA reminders, and gives municipal staff a registry, transaction-verification queue and revenue dashboard.

## Sources
- **Codebase:** `Tax/` (local mount) — `Tax/Index.html` (Bootstrap 5.3 + Font Awesome 6.4 single-page front-end, Google Apps Script `google.script.run`) and `Tax/Code.gs.txt` (Apps Script back-end: sheets `TaxBillItems`, `Payments`, users/sessions, LINE OA push).
- **Logo:** long partner strip supplied by the user → `assets/logo-long.png` (2400×338, white bg). Municipality seal remains remote: https://cdn.imagetourls.com/uploads/tyImg/11jeXW6ac.png
- **Licence data source (product):** Google Sheet `1W4PxRNkWAKHoJ5RXwL697qxYcicsMRN4VLoX0I9Jtfo`, sheets *Licenses* and *Payments*.
- **Brief (Thai):** Guardian-blue theme, Prompt font, modern; every alert/popup is a Bootstrap modal (never `window.alert`); responsive; collapsible sidebar.

## Product surface
One product: the **web app** (responsive desktop ↔ phone). Roles:
- **ประชาชนทั่วไป (User / citizen)** → lands on *รายการของฉัน*; sees own bills, pays selected items by QR, uploads slip, views payment history, links LINE OA.
- **เจ้าหน้าที่จัดเก็บรายได้, เจ้าหน้าที่การเงิน, เจ้าหน้าที่สาธารณสุข, Admin** → land on *ภาพรวมการจัดเก็บรายได้*; access ทะเบียนผู้เสียภาษี, แจ้งเตือน, ธุรกรรม. Only **การเงิน** can press *ยืนยันการชำระ*. Admin also gets *ผู้ลงทะเบียน* (approve/edit/delete; default `admin / admin1234`).
- **ผู้บริหาร** → dashboard only.

Business rules encoded in `ui_kits/web-app/data.js`: late penalty (<15 days 10%, >15 days 20%, >1 month 40%), surcharge 1%/month (partial month = 1), licence fine 20% of outstanding fee for *หนังสือรับรองการแจ้ง* only.

---

## CONTENT FUNDAMENTALS
- **Language:** Thai first. English only for product name (*DK One Tax Bill*), `Username`/`Password`, `Admin`, `LINE OA`, `QR Code`, `Excel`, `Ref:`.
- **Voice:** formal-polite government Thai, addressing the citizen as **ท่าน** in system messages ("ไม่พบรายการที่ท่านมีหน้าที่ชำระ") and *คุณ* in friendly UI ("ภาษีและค่าธรรมเนียมของคุณ", "สวัสดี, …"). No slang, no exclamation spam (one "!" at most on success).
- **Requests** begin with **กรุณา…** — "กรุณากรอก Username และ Password", "กรุณาเปลี่ยนรหัสผ่านเพื่อความปลอดภัยก่อนเริ่มใช้งาน".
- **Outcomes** are short noun-phrase + สำเร็จ / เรียบร้อยแล้ว — "ลงทะเบียนสำเร็จ รอ Admin กดยืนยัน", "เข้าสู่ระบบสำเร็จ", "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว".
- **Progress** uses กำลัง…  + ellipsis — "กำลังเข้าสู่ระบบ...", "กำลังบันทึกข้อมูล...".
- **Labels** are compact nouns, with slashes for alternatives: "เลขประจำตัวประชาชน / เลขนิติบุคคล", "รายการ / ผู้มีหน้าที่ชำระ", "ชื่อ – นามสกุล".
- **Money:** `th-TH` locale, always 2 decimals, unit **บาท** (or ฿ in dense rows): `4,120,500.00 บาท`. **Dates:** Buddhist Era, short Thai month — `30 เม.ย. 2569`. Fiscal year shown as **ปีงบประมาณ 2569**.
- **Statuses** (fixed vocabulary): ชำระแล้ว · ยังไม่ชำระ · ใกล้หมดอายุ · เกินกำหนด · รอตรวจสอบ · อื่นๆ.
- **Emoji:** never. Icons come from Font Awesome.

## VISUAL FOUNDATIONS
- **Color:** *Guardian Blue* `#153e75` is the single brand colour — sidebar header, primary buttons, page-title accents, stat numbers, modal headers. Hover = `#1a5299`; press = `#0c2547`. Page background is cool grey `#f4f6f9`; cards are white; text `#263238`; muted `#6c757d`. Status colours follow Bootstrap semantics (green/amber/orange/red/blue/grey) as **tinted pill backgrounds with dark text** (`#d4edda/#155724`, `#fff3cd/#856404` straight from source). LINE green `#06c755` only on LINE actions.
- **Type:** **Prompt** for everything (Thai + Latin, 300–700). Headings 700; menu 500; form labels bold; KPI numbers 2.2rem/700/1.2 in brand blue; meta 0.85rem muted.
- **Backgrounds:** flat. The only gradient is the login/register backdrop `135deg #153e75 → #2a6fb3` (re-used for the citizen balance hero card). No imagery, textures or patterns.
- **Cards:** white, `12px` radius, `1px #f0f0f0` hairline, whisper shadow `0 2px 10px rgba(0,0,0,.03)`, `20px` padding. Login card: `16px` radius, `0 10px 30px rgba(0,0,0,.2)`, `40px` padding, max 450px. Optional 4px coloured top border on summary cards (source citizen summary).
- **Sidebar:** 260px white, `1px #e0e0e0` right border, blue header with logo on a white plate + "DK One Tax Bill / เทศบาลเมืองดอนแก้ว". Items `15px 25px`, grey `#555` 500; active/hover = `#f4f6f9` fill + blue text + **4px blue left bar**. Collapses to a 76px icon rail on desktop; off-canvas drawer + 50% black overlay ≤768px. *Logout* in red below a divider.
- **Top bar:** white, sticky, `0 2px 4px rgba(0,0,0,.05)`, `15px 25px`. Hamburger (blue, 1.5rem) + bold page title left; name / role with green status dot + 40px round avatar right. Avatar opens a profile card with blue header.
- **Modals:** Bootstrap 5 `.modal-dialog-centered`; **solid coloured header** (blue info, green success, red error/delete, orange warning) with white title + Font Awesome icon and `btn-close-white`; borderless footer; alert-style modals centre body and a single **ตกลง** button. 12px radius, deep blue-tinted shadow.
- **Tables:** Bootstrap `.table-hover`, `.table-light` header with 600 muted labels, money right-aligned and bold, row actions as 32–34px square outline icon buttons (eye / pen / trash / LINE); LINE icon fills green once notified.
- **Radii:** 6 · 8 (controls) · 12 (cards, modals) · 16 (login) · 20 (pills) · 50% (avatars).
- **Animation:** minimal — `0.3s ease` sidebar width/slide, `0.2s` menu hover, Bootstrap modal fade, `fa-spin` spinner in loading buttons. No bounces.
- **Hover/press:** buttons darken (blue 900→800→950); outline buttons fill blue; icon buttons fill on active; menu items tint. No scale/shrink.
- **Transparency/blur:** only the 50% black mobile overlay and Bootstrap modal backdrop. No glass/blur.
- **Layout:** fixed sidebar + scrolling main column; content padding 25px (15px mobile); Bootstrap 12-col grid with `g-3` gutters; KPI rows wrap 4→2→1.

## ICONOGRAPHY
- **Font Awesome 6.4.0 Free** via CDN (`cdnjs …/font-awesome/6.4.0/css/all.min.css`), loaded through `styles.css`. Solid style (`fas`) throughout; brand `fab fa-line` for LINE OA.
- Menu: `fa-chart-pie` ภาพรวม, `fa-users` ทะเบียน, `fa-file-invoice-dollar` รายการของฉัน, `fa-history` ประวัติ, `fa-bell` แจ้งเตือน, `fa-exchange-alt` ธุรกรรม, `fa-sign-out-alt` ออกจากระบบ. Actions: `fa-sign-in-alt`, `fa-user-plus`, `fa-sync-alt`, `fa-file-excel`, `fa-upload`, `fa-eye`, `fa-pen`, `fa-trash`, `fa-qrcode`, `fa-receipt`, `fa-check-circle`, `fa-clock`, `fa-spinner fa-spin`.
- Icons sit 20px wide, centred, `margin-right:12px` in menus; inline icons inherit text colour. No emoji, no unicode glyph icons, no custom SVG set.
- **Logo:** `assets/logo-long.png` — horizontal strip of partner marks (MHESI, Thailand Rise Fund, สกสว, รวพ., บพท, CMU, เทศบาลเมืองดอนแก้ว). Used full-width at top of login card and sidebar header; on blue it sits on a white 8px-radius plate. Collapsed sidebar rail uses the round seal. Never crop or recolour the strip.

---

## Index
- `styles.css` — entry; `@import`s only.
- `tokens/` — `vendor.css` (Bootstrap 5.3 + FA 6.4 CDN), `fonts.css` (self-hosted Prompt), `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css` (Bootstrap theme overrides).
- `assets/` — `logo-long.png`.
- `fonts/` — Prompt 300–700 woff2 (Thai + Latin subsets).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — React primitives (below), one card HTML per folder.
- `ui_kits/web-app/` — interactive recreation of the full app (login → role-based screens). See its README.
- `SKILL.md` — Agent Skill entry point.
- `thumbnail.html` — project tile.

### Components
- **brand/** — `Logo`
- **forms/** — `Button`, `IconButton`, `Input`, `Select`, `Checkbox`
- **data/** — `Card`, `StatCard`, `StatusBadge`, `StatusFilter`, `DataTable`
- **feedback/** — `AppModal`
- **navigation/** — `Sidebar`, `TopNavbar`

### Intentional additions
The source front-end is plain Bootstrap markup without a component library, so components were derived from its repeated patterns (`custom-card`, `summary-value`, `status-badge`, sidebar, top-navbar, `appModal`) plus the brief: `StatusFilter` (7-status filter row), `IconButton` (table row actions), `DataTable` (table wrapper), `Checkbox` (multi-select payment) and the profile popover in `TopNavbar` are required by the brief but not yet in code.

## Caveats
- The round seal (collapsed rail) is still hot-linked from the remote URL.
- Status colours for ใกล้หมดอายุ / เกินกำหนด / รอตรวจสอบ / อื่นๆ are not in the source; they use Bootstrap's orange/red/blue/grey.
- QR code in the UI kit is a Font Awesome placeholder, not a real PromptPay payload.
