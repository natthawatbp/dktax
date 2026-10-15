Primary app navigation. Standard menu: ภาพรวม, ทะเบียนผู้เสียภาษี, รายการของฉัน, ประวัติการชำระ, แจ้งเตือน, ธุรกรรม, ออกจากระบบ. Full-height blue gradient, all items white; active item = translucent white rounded pill. Collapsed = 96px icon rail with no logo. `footer` lines sit at the bottom.
```jsx
<Sidebar items={[{key:'dash',label:'ภาพรวม',icon:'fas fa-chart-pie'},{key:'out',label:'ออกจากระบบ',icon:'fas fa-sign-out-alt',tone:'danger',divider:true}]} active="dash" collapsed={c} isMobile={m} mobileOpen={o} />
```
Filter items by role before passing.
