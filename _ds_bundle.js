/* @ds-bundle: {"format":4,"namespace":"DKOneTaxBillDesignSystem_3069af","components":[{"name":"LOGO_URL","sourcePath":"components/brand/Logo.jsx"},{"name":"SEAL_URL","sourcePath":"components/brand/Logo.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"StatusBadge","sourcePath":"components/data/StatusBadge.jsx"},{"name":"StatusFilter","sourcePath":"components/data/StatusFilter.jsx"},{"name":"AppModal","sourcePath":"components/feedback/AppModal.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"TopNavbar","sourcePath":"components/navigation/TopNavbar.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"d671d520b67f","components/data/Card.jsx":"47d08b68a722","components/data/DataTable.jsx":"46e76d45fa42","components/data/StatCard.jsx":"9d04ddb81a96","components/data/StatusBadge.jsx":"6599cdd6417b","components/data/StatusFilter.jsx":"e2734c08ccce","components/feedback/AppModal.jsx":"fb83241d741c","components/forms/Button.jsx":"d400d0823a4f","components/forms/Checkbox.jsx":"e899b6eb86ac","components/forms/IconButton.jsx":"2cc93f02dd54","components/forms/Input.jsx":"1080132e4b04","components/forms/Select.jsx":"a9e5ce4b5715","components/navigation/Sidebar.jsx":"d4b77be0f540","components/navigation/TopNavbar.jsx":"45fade4d9d14","ui_kits/web-app/Citizen.jsx":"d742fd9b0cc2","ui_kits/web-app/Dashboard.jsx":"ef54f0b70113","ui_kits/web-app/LinePreview.jsx":"68a8fe4450bb","ui_kits/web-app/Login.jsx":"e136c316f20e","ui_kits/web-app/Registry.jsx":"2a6be1008186","ui_kits/web-app/Settings.jsx":"f9ec821c4034","ui_kits/web-app/Staff.jsx":"e5578adf73e9","ui_kits/web-app/data.js":"5bc283c0fe84","ui_kits/web-app/elaas.js":"c7064fb6ac04","ui_kits/web-app/notice.js":"1484353e5a4b","ui_kits/web-app/promptpay.js":"53d52a33e88c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DKOneTaxBillDesignSystem_3069af = window.DKOneTaxBillDesignSystem_3069af || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
const BUNDLE_SRC = typeof document !== 'undefined' && (document.currentScript && document.currentScript.src || (document.querySelector('script[src*="_ds_bundle.js"]') || {}).src) || '';
const resolve = p => {
  try {
    return BUNDLE_SRC ? new URL(p, BUNDLE_SRC).href : p;
  } catch (e) {
    return p;
  }
};
const LOGO_URL = resolve('assets/logo-long.png');
const SEAL_URL = 'https://cdn.imagetourls.com/uploads/tyImg/11jeXW6ac.png';
function Logo({
  variant = 'long',
  height,
  width,
  maxWidth = '100%',
  onDark = false,
  style
}) {
  const [err, setErr] = React.useState(false);
  const long = variant === 'long';
  const h = height || (long ? undefined : 56);
  const w = width || (long && !height ? '100%' : undefined);
  if (err) return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      color: onDark ? '#fff' : 'var(--primary)',
      fontSize: 18
    }
  }, "\u0E40\u0E17\u0E28\u0E1A\u0E32\u0E25\u0E40\u0E21\u0E37\u0E2D\u0E07\u0E14\u0E2D\u0E19\u0E41\u0E01\u0E49\u0E27");
  return /*#__PURE__*/React.createElement("img", {
    src: long ? LOGO_URL : SEAL_URL,
    alt: long ? 'DK One Tax Bill — เทศบาลเมืองดอนแก้ว และหน่วยงานภาคี' : 'เทศบาลเมืองดอนแก้ว',
    onError: () => setErr(true),
    style: {
      height: h,
      width: w,
      maxWidth,
      objectFit: 'contain',
      display: 'block',
      ...(onDark ? {
        background: '#fff',
        borderRadius: 8,
        padding: long ? '6px 8px' : '6px 10px'
      } : null),
      ...style
    }
  });
}
Object.assign(__ds_scope, { LOGO_URL, SEAL_URL, Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function Card({
  title,
  icon,
  actions,
  padding = 'var(--card-pad)',
  className = '',
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card)',
      padding,
      boxShadow: 'var(--shadow-card)',
      border: '1px solid var(--border-card)',
      ...style
    }
  }, title || actions ? /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"
  }, title ? /*#__PURE__*/React.createElement("h5", {
    className: "fw-bold mb-0",
    style: {
      color: 'var(--text-body)'
    }
  }, icon ? /*#__PURE__*/React.createElement("i", {
    className: icon + ' me-2',
    style: {
      color: 'var(--primary)'
    }
  }) : null, title) : /*#__PURE__*/React.createElement("span", null), actions ? /*#__PURE__*/React.createElement("div", {
    className: "d-flex gap-2 flex-wrap"
  }, actions) : null) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  empty = 'ไม่พบข้อมูล',
  footer
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-hover align-middle mb-0",
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", {
    className: "table-light"
  }, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    className: c.align === 'end' ? 'text-end' : c.align === 'center' ? 'text-center' : '',
    style: {
      fontWeight: 600,
      fontSize: '.9rem',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      width: c.width
    }
  }, c.title)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    className: "text-center text-muted py-4"
  }, empty)) : rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r[rowKey] ?? i
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: c.align === 'end' ? 'text-end' : c.align === 'center' ? 'text-center' : ''
  }, c.render ? c.render(r, i) : r[c.key]))))), footer ? /*#__PURE__*/React.createElement("tfoot", null, footer) : null));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function StatCard({
  label,
  value,
  unit,
  icon,
  tone = 'primary',
  sub,
  progress,
  selected = false,
  onClick,
  accent = 'none',
  variant = 'default'
}) {
  if (variant === 'tile') return /*#__PURE__*/React.createElement(TileStat, {
    label,
    value,
    unit,
    icon,
    tone,
    sub,
    progress,
    selected,
    onClick
  });
  if (variant === 'filled') return /*#__PURE__*/React.createElement(FilledStat, {
    label,
    value,
    unit,
    icon,
    tone,
    sub,
    progress,
    selected,
    onClick
  });
  const c = {
    primary: 'var(--primary)',
    success: 'var(--status-paid)',
    warning: '#b58100',
    orange: 'var(--status-expiring)',
    danger: 'var(--status-overdue)',
    info: 'var(--status-review)',
    muted: 'var(--status-other)'
  }[tone] || 'var(--primary)';
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    role: clickable ? 'button' : undefined,
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card)',
      padding: 'var(--card-pad)',
      boxShadow: selected ? '0 0 0 2px ' + c + ', var(--shadow-card)' : 'var(--shadow-card)',
      border: '1px solid var(--border-card)',
      borderTop: accent === 'top' ? '4px solid ' + c : '1px solid var(--border-card)',
      cursor: clickable ? 'pointer' : 'default',
      height: '100%',
      transition: 'box-shadow .2s, transform .2s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-start gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--fs-label)',
      marginBottom: 5
    }
  }, label), icon ? /*#__PURE__*/React.createElement("span", {
    className: "d-inline-flex align-items-center justify-content-center flex-shrink-0",
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'color-mix(in srgb, ' + c + ' 12%, white)',
      color: c,
      fontSize: '1.1rem'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon
  })) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-stat)',
      fontWeight: 700,
      color: c,
      lineHeight: 1.2
    }
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    className: "fs-5 text-muted fw-normal ms-1"
  }, unit) : null), typeof progress === 'number' ? /*#__PURE__*/React.createElement("div", {
    className: "progress mt-2",
    style: {
      height: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-bar",
    style: {
      width: progress + '%',
      background: c
    }
  })) : null, sub ? /*#__PURE__*/React.createElement("div", {
    className: "mt-2",
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)'
    }
  }, sub) : null);
}
const FILL = {
  primary: ['#123a6e', '#2563b0'],
  success: ['#0f7a45', '#1f9d5e'],
  warning: ['#9a6200', '#c27c00'],
  orange: ['#b83a0b', '#e0560f'],
  danger: ['#a51d1d', '#d62828'],
  info: ['#0b627e', '#1385a8'],
  muted: ['#3f4a5a', '#647084']
};
function FilledStat({
  label,
  value,
  unit,
  icon,
  tone,
  sub,
  progress,
  selected,
  onClick
}) {
  const [a, b] = FILL[tone] || FILL.primary;
  const [hv, setHv] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHv(true),
    onMouseLeave: () => setHv(false),
    role: onClick ? 'button' : undefined,
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, ' + a + ' 0%, ' + b + ' 100%)',
      color: '#fff',
      borderRadius: 'var(--radius-card)',
      padding: 'var(--card-pad)',
      height: '100%',
      boxShadow: (selected ? '0 0 0 3px #fff, 0 0 0 5px ' + a + ', ' : '') + (hv ? '0 12px 26px ' + a + '55' : '0 6px 16px ' + a + '33'),
      transform: hv ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow .2s, transform .2s',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-sans)'
    }
  }, icon ? /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      position: 'absolute',
      right: -10,
      bottom: -14,
      fontSize: 92,
      opacity: .12,
      pointerEvents: 'none'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-start gap-2",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-label)',
      fontWeight: 500,
      marginBottom: 5
    }
  }, label), icon ? /*#__PURE__*/React.createElement("span", {
    className: "d-inline-flex align-items-center justify-content-center flex-shrink-0",
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'rgba(255,255,255,.18)',
      fontSize: '1.1rem'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon
  })) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      fontSize: 'var(--fs-stat)',
      fontWeight: 700,
      lineHeight: 1.2
    }
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    className: "fs-5 fw-normal ms-1"
  }, unit) : null), typeof progress === 'number' ? /*#__PURE__*/React.createElement("div", {
    className: "progress mt-2",
    style: {
      height: 6,
      background: 'rgba(255,255,255,.25)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-bar",
    style: {
      width: progress + '%',
      background: '#fff'
    }
  })) : null, sub ? /*#__PURE__*/React.createElement("div", {
    className: "mt-2",
    style: {
      position: 'relative',
      fontSize: 'var(--fs-sm)'
    }
  }, sub) : null);
}
const TINT = {
  primary: ['#e6eefb', '#1d4a9a'],
  success: ['#e3f6ec', '#1f9d5e'],
  warning: ['#fff3d9', '#c27c00'],
  orange: ['#ffe9dd', '#e0560f'],
  danger: ['#fde6e6', '#d62828'],
  info: ['#def3f8', '#1385a8'],
  muted: ['#eceff3', '#647084'],
  purple: ['#efe8fb', '#7a4cc4']
};
function TileStat({
  label,
  value,
  unit,
  icon,
  tone,
  sub,
  progress,
  selected,
  onClick
}) {
  const [bg, fg] = TINT[tone] || TINT.primary;
  const [hv, setHv] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHv(true),
    onMouseLeave: () => setHv(false),
    role: onClick ? 'button' : undefined,
    style: {
      background: '#fff',
      borderRadius: 18,
      border: '1px solid ' + (selected ? fg : '#e8edf4'),
      boxShadow: selected ? '0 0 0 3px ' + bg + ', 0 8px 20px rgba(21,62,117,.10)' : hv ? '0 10px 24px rgba(21,62,117,.12)' : '0 4px 14px rgba(21,62,117,.06)',
      padding: '18px 20px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      cursor: onClick ? 'pointer' : 'default',
      transform: hv && onClick ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow .2s, transform .2s, border-color .2s',
      fontFamily: 'var(--font-sans)'
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    className: "d-inline-flex align-items-center justify-content-center flex-shrink-0",
    style: {
      width: 58,
      height: 58,
      borderRadius: 16,
      background: bg,
      color: fg,
      fontSize: '1.45rem'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.1,
      color: '#1d2735'
    }
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.95rem',
      fontWeight: 400,
      color: '#6b7686',
      marginLeft: 6
    }
  }, unit) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '.95rem',
      color: '#6b7686',
      marginTop: 2
    }
  }, label), typeof progress === 'number' ? /*#__PURE__*/React.createElement("div", {
    className: "progress mt-2",
    style: {
      height: 6,
      background: bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-bar",
    style: {
      width: progress + '%',
      background: fg
    }
  })) : null, sub ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '.82rem',
      color: '#8a94a3',
      marginTop: 4
    }
  }, sub) : null));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusBadge.jsx
try { (() => {
const MAP = {
  paid: {
    t: 'ชำระแล้ว',
    i: 'fas fa-check-circle',
    k: 'paid'
  },
  unpaid: {
    t: 'ยังไม่ชำระ',
    i: 'fas fa-clock',
    k: 'unpaid'
  },
  expiring: {
    t: 'ใกล้หมดอายุ',
    i: 'fas fa-hourglass-half',
    k: 'expiring'
  },
  overdue: {
    t: 'เกินกำหนด',
    i: 'fas fa-exclamation-circle',
    k: 'overdue'
  },
  review: {
    t: 'รอตรวจสอบ',
    i: 'fas fa-search-dollar',
    k: 'review'
  },
  other: {
    t: 'อื่นๆ',
    i: 'fas fa-ellipsis-h',
    k: 'other'
  }
};
function StatusBadge({
  status = 'unpaid',
  label,
  icon = true
}) {
  const m = MAP[status] || MAP.other;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 12px',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      whiteSpace: 'nowrap',
      background: 'var(--status-' + m.k + '-bg)',
      color: 'var(--status-' + m.k + '-fg)'
    }
  }, icon ? /*#__PURE__*/React.createElement("i", {
    className: m.i
  }) : null, label || m.t);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusFilter.jsx
try { (() => {
const ITEMS = [{
  k: 'all',
  t: 'ทั้งหมด',
  c: 'var(--primary)'
}, {
  k: 'paid',
  t: 'ชำระแล้ว',
  c: 'var(--status-paid)'
}, {
  k: 'unpaid',
  t: 'ยังไม่ชำระ',
  c: 'var(--status-unpaid)'
}, {
  k: 'expiring',
  t: 'ใกล้หมดอายุ',
  c: 'var(--status-expiring)'
}, {
  k: 'overdue',
  t: 'เกินกำหนด',
  c: 'var(--status-overdue)'
}, {
  k: 'review',
  t: 'รอตรวจสอบ',
  c: 'var(--status-review)'
}, {
  k: 'other',
  t: 'อื่นๆ',
  c: 'var(--status-other)'
}];
function StatusFilter({
  value = 'all',
  counts = {},
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap",
    style: {
      gap: 8
    }
  }, ITEMS.map(it => {
    const on = value === it.k;
    return /*#__PURE__*/React.createElement("button", {
      key: it.k,
      type: "button",
      onClick: () => onChange && onChange(it.k),
      className: "btn btn-sm d-inline-flex align-items-center",
      style: {
        gap: 6,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        borderRadius: 'var(--radius-pill)',
        padding: '6px 14px',
        fontWeight: 500,
        border: '1px solid ' + (on ? it.c : 'var(--border-default)'),
        background: on ? it.c : '#fff',
        color: on ? '#fff' : 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: on ? '#fff' : it.c
      }
    }), it.t, counts[it.k] != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        opacity: on ? .9 : .6
      }
    }, counts[it.k]) : null);
  }));
}
Object.assign(__ds_scope, { StatusFilter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusFilter.jsx", error: String((e && e.message) || e) }); }

// components/feedback/AppModal.jsx
try { (() => {
function AppModal({
  open,
  onClose,
  title = 'แจ้งเตือน',
  icon = 'fas fa-bell',
  tone = 'primary',
  size,
  centeredBody = false,
  footer,
  children
}) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  const bg = {
    primary: 'var(--primary)',
    danger: 'var(--danger)',
    success: 'var(--status-paid)',
    warning: 'var(--status-expiring)'
  }[tone] || 'var(--primary)';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "modal fade show d-block",
    tabIndex: -1,
    role: "dialog",
    "aria-modal": "true",
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      zIndex: 1055
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'modal-dialog modal-dialog-centered modal-dialog-scrollable ' + (size === 'lg' ? 'modal-lg' : size === 'xl' ? 'modal-xl' : size === 'sm' ? 'modal-sm' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header text-white border-0",
    style: {
      background: bg
    }
  }, /*#__PURE__*/React.createElement("h5", {
    className: "modal-title fw-semibold"
  }, /*#__PURE__*/React.createElement("i", {
    className: icon + ' me-2'
  }), title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-close btn-close-white",
    "aria-label": "Close",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    className: 'modal-body ' + (centeredBody ? 'text-center py-4' : '')
  }, children), footer !== null ? /*#__PURE__*/React.createElement("div", {
    className: 'modal-footer border-0 ' + (centeredBody ? 'justify-content-center' : '')
  }, footer || /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary px-4",
    onClick: onClose
  }, "\u0E15\u0E01\u0E25\u0E07")) : null))), /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop fade show",
    style: {
      zIndex: 1050
    }
  }));
}
Object.assign(__ds_scope, { AppModal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/AppModal.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  block = false,
  disabled,
  className = '',
  children,
  ...rest
}) {
  const v = {
    primary: 'btn-primary',
    outline: 'btn-outline-primary',
    secondary: 'btn-light border',
    danger: 'btn-danger',
    success: 'btn-success',
    line: 'btn-line',
    ghost: 'btn-link text-decoration-none'
  }[variant] || 'btn-primary';
  const s = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  const lineStyle = variant === 'line' ? {
    background: 'var(--line-green)',
    borderColor: 'var(--line-green)',
    color: '#fff'
  } : null;
  return /*#__PURE__*/React.createElement("button", _extends({
    className: ['btn', v, s, block ? 'w-100' : '', 'fw-medium d-inline-flex align-items-center justify-content-center gap-2', className].join(' '),
    disabled: disabled || loading,
    style: {
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      ...lineStyle,
      ...rest.style
    }
  }, rest), loading ? /*#__PURE__*/React.createElement("i", {
    className: "fas fa-spinner fa-spin"
  }) : icon ? /*#__PURE__*/React.createElement("i", {
    className: icon
  }) : null, children, iconRight && !loading ? /*#__PURE__*/React.createElement("i", {
    className: iconRight
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  id,
  className = '',
  ...rest
}) {
  const cid = id || 'cb-' + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("div", {
    className: 'form-check mb-0 ' + className
  }, /*#__PURE__*/React.createElement("input", _extends({
    className: "form-check-input",
    type: "checkbox",
    id: cid,
    style: {
      cursor: 'pointer'
    }
  }, rest)), label ? /*#__PURE__*/React.createElement("label", {
    className: "form-check-label",
    htmlFor: cid
  }, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  tone = 'primary',
  active = false,
  title,
  size = 34,
  ...rest
}) {
  const c = {
    primary: 'var(--primary)',
    danger: 'var(--danger)',
    warning: '#b58100',
    line: 'var(--line-green)',
    muted: 'var(--text-muted)'
  }[tone] || 'var(--primary)';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    title: title,
    "aria-label": title,
    className: "btn p-0 d-inline-flex align-items-center justify-content-center",
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (active ? c : 'var(--border-default)'),
      background: active ? c : '#fff',
      color: active ? '#fff' : c,
      transition: 'all .2s'
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: icon
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  type = 'text',
  size,
  icon,
  hint,
  error,
  className = '',
  id,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const isPw = type === 'password';
  const inputId = id || (label ? 'in-' + label.replace(/\s/g, '') : undefined);
  const cls = ['form-control', size === 'lg' ? 'form-control-lg' : size === 'sm' ? 'form-control-sm' : '', error ? 'is-invalid' : ''].join(' ');
  const field = /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: isPw && show ? 'text' : type,
    className: cls
  }, rest, {
    style: {
      fontFamily: 'var(--font-sans)',
      lineHeight: 1.5,
      letterSpacing: isPw && !show ? '.08em' : 'normal',
      textOverflow: 'ellipsis',
      minWidth: 0,
      ...(rest.style || {})
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: 'text-start ' + className
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    className: "form-label fw-bold"
  }, label) : null, icon || isPw ? /*#__PURE__*/React.createElement("div", {
    className: "input-group has-validation"
  }, icon ? /*#__PURE__*/React.createElement("span", {
    className: "input-group-text bg-white text-muted",
    style: {
      width: 46,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      width: 16,
      textAlign: 'center'
    }
  })) : null, field, isPw ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-outline-secondary",
    style: {
      borderColor: 'var(--bs-border-color)',
      width: 46,
      flex: '0 0 46px',
      padding: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onClick: () => setShow(!show),
    "aria-label": show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'
  }, /*#__PURE__*/React.createElement("i", {
    className: show ? 'fas fa-eye-slash' : 'fas fa-eye',
    style: {
      width: 20,
      textAlign: 'center'
    }
  })) : null, error ? /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback"
  }, error) : null) : /*#__PURE__*/React.createElement(React.Fragment, null, field, error ? /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback"
  }, error) : null), hint && !error ? /*#__PURE__*/React.createElement("div", {
    className: "form-text"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  size,
  className = '',
  value,
  defaultValue,
  onChange,
  disabled,
  style,
  id
}) {
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: String(o)
  });
  const [inner, setInner] = React.useState(defaultValue ?? (opts[0] && opts[0].value));
  const cur = value !== undefined ? value : inner;
  const [open, setOpen] = React.useState(false);
  const [hi, setHi] = React.useState(-1);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const sel = opts.find(o => String(o.value) === String(cur)) || opts[0];
  const pick = o => {
    setOpen(false);
    if (value === undefined) setInner(o.value);
    onChange && onChange({
      target: {
        value: String(o.value)
      },
      currentTarget: {
        value: String(o.value)
      }
    });
  };
  const key = e => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHi(opts.indexOf(sel));
        return;
      }
      setHi(i => Math.max(0, Math.min(opts.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1))));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open && hi >= 0) pick(opts[hi]);else {
        setOpen(true);
        setHi(opts.indexOf(sel));
      }
    } else if (e.key === 'Escape') setOpen(false);
  };
  const cls = 'form-select text-start ' + (size === 'sm' ? 'form-select-sm' : size === 'lg' ? 'form-select-lg' : '');
  return /*#__PURE__*/React.createElement("div", {
    className: 'text-start ' + className,
    style: {
      position: 'relative',
      ...style
    },
    ref: ref
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "form-label fw-bold",
    htmlFor: id
  }, label) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: id,
    className: cls,
    disabled: disabled,
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    onClick: () => {
      setOpen(!open);
      setHi(opts.indexOf(sel));
    },
    onKeyDown: key,
    style: {
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...(open ? {
        borderColor: '#4a8fd6',
        boxShadow: '0 0 0 .25rem rgba(21,62,117,.18)'
      } : null)
    }
  }, sel ? sel.label : ''), open ? /*#__PURE__*/React.createElement("ul", {
    role: "listbox",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 'calc(100% + 4px)',
      zIndex: 1080,
      margin: 0,
      padding: 6,
      listStyle: 'none',
      background: '#fff',
      border: '1px solid var(--border-card)',
      borderRadius: 10,
      boxShadow: '0 10px 30px rgba(12,37,71,.15)',
      maxHeight: 260,
      overflowY: 'auto',
      minWidth: 'max-content',
      fontFamily: 'var(--font-sans)'
    }
  }, opts.map((o, i) => {
    const on = String(o.value) === String(cur);
    return /*#__PURE__*/React.createElement("li", {
      key: o.value,
      role: "option",
      "aria-selected": on,
      onMouseEnter: () => setHi(i),
      onMouseDown: e => {
        e.preventDefault();
        pick(o);
      },
      style: {
        padding: size === 'sm' ? '6px 10px' : '8px 12px',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: size === 'sm' ? '.875rem' : '1rem',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between',
        color: on ? 'var(--primary)' : 'var(--text-body)',
        fontWeight: on ? 600 : 400,
        background: hi === i ? 'var(--blue-50)' : 'transparent'
      }
    }, o.label, on ? /*#__PURE__*/React.createElement("i", {
      className: "fas fa-check",
      style: {
        fontSize: 12
      }
    }) : null);
  })) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function Sidebar({
  items = [],
  active,
  onSelect,
  collapsed = false,
  mobileOpen = false,
  onCloseMobile,
  isMobile = false,
  footer = []
}) {
  const rail = collapsed && !isMobile;
  const [hover, setHover] = React.useState(null);
  const w = rail ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
  const pos = isMobile ? {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    transform: mobileOpen ? 'none' : 'translateX(-100%)',
    boxShadow: mobileOpen ? '0 0 40px rgba(0,0,0,.35)' : 'none'
  } : {
    position: 'relative'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, isMobile && mobileOpen ? /*#__PURE__*/React.createElement("div", {
    onClick: onCloseMobile,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--overlay)',
      zIndex: 1040
    }
  }) : null, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: w,
      minWidth: w,
      height: '100%',
      background: 'linear-gradient(180deg, #1a4a9c 0%, #153e75 55%, #0f2f5e 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1045,
      transition: 'all var(--dur-base) var(--ease)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      ...pos
    }
  }, !rail ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '34px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    onDark: true,
    style: {
      borderRadius: 8,
      padding: '6px 8px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 20,
      marginTop: 22,
      lineHeight: 1.2
    }
  }, "DK One Tax Bill"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      opacity: .85,
      marginTop: 4
    }
  }, "\u0E40\u0E17\u0E28\u0E1A\u0E32\u0E25\u0E40\u0E21\u0E37\u0E2D\u0E07\u0E14\u0E2D\u0E19\u0E41\u0E01\u0E49\u0E27")) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: rail ? '0 12px' : '10px 14px',
      margin: 0,
      flexGrow: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, items.filter(it => it.key !== 'logout').map(it => {
    const on = active === it.key;
    const hv = hover === it.key && !on;
    return /*#__PURE__*/React.createElement("li", {
      key: it.key
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      title: rail ? it.label : undefined,
      onMouseEnter: () => setHover(it.key),
      onMouseLeave: () => setHover(null),
      onClick: e => {
        e.preventDefault();
        onSelect && onSelect(it.key);
      },
      style: {
        height: 58,
        padding: rail ? 0 : '0 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: rail ? 'center' : 'flex-start',
        gap: 16,
        color: '#fff',
        textDecoration: 'none',
        fontWeight: on ? 600 : 500,
        fontSize: 16,
        borderRadius: 16,
        background: on ? 'rgba(255,255,255,.22)' : hv ? 'rgba(255,255,255,.09)' : 'transparent',
        transition: '.2s',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: it.icon,
      style: {
        width: 24,
        textAlign: 'center',
        fontSize: rail ? '1.3rem' : '1.15rem'
      }
    }), !rail ? /*#__PURE__*/React.createElement("span", {
      className: "flex-grow-1"
    }, it.label) : null, !rail && it.badge ? /*#__PURE__*/React.createElement("span", {
      className: "badge rounded-pill bg-danger"
    }, it.badge) : null));
  })), items.some(it => it.key === 'logout') ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: rail ? '10px 12px 18px' : '8px 14px 18px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    title: rail ? 'ออกจากระบบ' : undefined,
    onClick: e => {
      e.preventDefault();
      onSelect && onSelect('logout');
    },
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: rail ? 'center' : 'flex-start',
      gap: 16,
      padding: rail ? 0 : '0 18px',
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 500,
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,.35)',
      background: 'rgba(255,255,255,.12)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-sign-out-alt",
    style: {
      width: 24,
      textAlign: 'center',
      fontSize: '1.15rem'
    }
  }), !rail ? /*#__PURE__*/React.createElement("span", null, "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A") : null)) : null, !rail && footer && footer.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 22px',
      fontSize: 13,
      lineHeight: 1.75,
      opacity: .9
    }
  }, footer.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, f))) : null));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopNavbar.jsx
try { (() => {
function TopNavbar({
  title,
  onToggle,
  user = {},
  onLogout,
  extra
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const initials = (user.name || 'U').trim().charAt(0);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      background: '#fff',
      padding: 'var(--navbar-pad)',
      boxShadow: 'var(--shadow-navbar)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      gap: 12,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center",
    style: {
      minWidth: 0,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-label": "\u0E22\u0E48\u0E2D/\u0E02\u0E22\u0E32\u0E22\u0E40\u0E21\u0E19\u0E39",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 4,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 26,
      height: 22,
      border: '2px solid var(--text-body)',
      borderRadius: 4,
      padding: 2,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      background: 'var(--text-body)',
      borderRadius: 1
    }
  }))), /*#__PURE__*/React.createElement("h5", {
    className: "mb-0 fw-bold text-truncate",
    style: {
      color: 'var(--text-body)'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center",
    style: {
      gap: 12
    },
    ref: ref
  }, extra, /*#__PURE__*/React.createElement("div", {
    className: "text-end d-none d-md-block",
    style: {
      lineHeight: 1.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold"
  }, user.name), /*#__PURE__*/React.createElement("small", {
    className: "d-inline-flex align-items-center text-muted",
    style: {
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: user.online === false ? 'var(--gray-400)' : 'var(--status-paid)'
    }
  }), user.role)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    "aria-label": "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    style: {
      width: 'var(--avatar-size)',
      height: 'var(--avatar-size)',
      borderRadius: '50%',
      border: '2px solid ' + (open ? 'var(--blue-500)' : 'var(--blue-100)'),
      background: user.avatar ? 'center/cover url(' + user.avatar + ')' : 'var(--primary)',
      color: '#fff',
      fontWeight: 700,
      padding: 0,
      cursor: 'pointer'
    }
  }, user.avatar ? null : initials), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 'calc(100% + 10px)',
      width: 280,
      background: '#fff',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 10px 30px rgba(12,37,71,.15)',
      border: '1px solid var(--border-card)',
      overflow: 'hidden',
      zIndex: 1100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--primary)',
      color: '#fff',
      padding: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: user.avatar ? 'center/cover url(' + user.avatar + ')' : 'rgba(255,255,255,.18)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 20,
      flexShrink: 0
    }
  }, user.avatar ? null : initials), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold text-truncate"
  }, user.name), /*#__PURE__*/React.createElement("small", {
    style: {
      opacity: .85
    }
  }, user.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      fontSize: '.9rem'
    }
  }, (user.fields || []).map(f => /*#__PURE__*/React.createElement("div", {
    key: f.label,
    className: "d-flex justify-content-between py-1",
    style: {
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, f.label), /*#__PURE__*/React.createElement("span", {
    className: "fw-medium text-end"
  }, f.value)))), onLogout ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-card)',
      padding: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm w-100 text-danger fw-medium",
    onClick: onLogout
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-sign-out-alt me-2"
  }), "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A")) : null) : null)));
}
Object.assign(__ds_scope, { TopNavbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopNavbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/Citizen.jsx
try { (() => {
function UserHead({
  user,
  year,
  setYear
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "16px 20px",
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d-inline-flex align-items-center justify-content-center text-white fw-bold",
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'var(--primary)',
      fontSize: 20
    }
  }, user.name.charAt(0)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
    className: "fw-bold mb-0"
  }, user.name), /*#__PURE__*/React.createElement("small", {
    className: "text-muted"
  }, "\u0E40\u0E25\u0E02\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 ", user.taxId))), /*#__PURE__*/React.createElement(Select, {
    options: DK.YEARS,
    value: year,
    onChange: e => setYear(e.target.value)
  })));
}
function myItems(taxId) {
  return DK.rows().filter(r => r.p.id === taxId).map(r => ({
    ...r,
    owner: r.p.name
  }));
}
function MyBills({
  user,
  year,
  setYear
}) {
  const items = myItems(user.taxId);
  const open = items.filter(r => r.status !== 'paid');
  const [sel, setSel] = React.useState(open.map(r => r.id));
  const [pay, setPay] = React.useState(false);
  const [slip, setSlip] = React.useState(null);
  const [done, setDone] = React.useState(null);
  const [line, setLine] = React.useState(false);
  const [method, setMethod] = React.useState('online');
  const [cashDone, setCashDone] = React.useState(null);
  const outstanding = open.reduce((s, r) => s + r.total, 0);
  const selTotal = items.filter(r => sel.includes(r.id)).reduce((s, r) => s + r.total, 0);
  const payRef = 'DK' + user.taxId.slice(-6) + String(Math.round(selTotal * 100)).padStart(8, '0');
  const PP = window.PromptPay,
    cfg = PP.load(),
    qrOn = PP.enabled(cfg),
    cashOn = cfg.cashOn !== 'off';
  const isCash = method === 'cash' && cashOn;
  const selItems = items.filter(r => sel.includes(r.id));
  const toggle = id => setSel(sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserHead, {
    user: user,
    year: year,
    setYear: setYear
  }), /*#__PURE__*/React.createElement("div", {
    className: "mb-3 p-4 text-white d-flex justify-content-between align-items-center flex-wrap gap-3",
    style: {
      borderRadius: 'var(--radius-card)',
      background: 'var(--gradient-login)',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: .85
    }
  }, "\u0E22\u0E2D\u0E14\u0E04\u0E07\u0E04\u0E49\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35 ", year), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '2.2rem',
      fontWeight: 700,
      lineHeight: 1.2
    }
  }, DK.money(outstanding), " ", /*#__PURE__*/React.createElement("span", {
    className: "fs-5 fw-normal"
  }, "\u0E1A\u0E32\u0E17")), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: .85
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-file-invoice me-1"
  }), "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30 ", open.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-light btn-lg fw-bold d-inline-flex align-items-center gap-2",
    style: {
      color: 'var(--primary)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    },
    disabled: !sel.length,
    onClick: () => setPay(true)
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-wallet"
  }), "\u0E0A\u0E33\u0E23\u0E30\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01 (", sel.length, ")")), /*#__PURE__*/React.createElement(Card, {
    title: "\u0E20\u0E32\u0E29\u0E35\u0E41\u0E25\u0E30\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13",
    icon: "fas fa-list-ul",
    padding: "20px 20px 12px"
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: items,
    columns: [{
      key: 'c',
      title: 'เลือก',
      width: 60,
      render: r => r.status === 'paid' ? /*#__PURE__*/React.createElement("i", {
        className: "fas fa-check text-success ms-1"
      }) : /*#__PURE__*/React.createElement(Checkbox, {
        checked: sel.includes(r.id),
        onChange: () => toggle(r.id)
      })
    }, {
      key: 'l',
      title: 'รายการ / ผู้มีหน้าที่ชำระ',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "fw-medium"
      }, r.label), /*#__PURE__*/React.createElement("small", {
        className: "text-muted"
      }, r.owner, " \xB7 \u0E04\u0E23\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14 ", DK.thDate(r.due)))
    }, {
      key: 't',
      title: 'จำนวนเงิน',
      align: 'end',
      render: r => /*#__PURE__*/React.createElement("b", null, DK.money(r.total))
    }, {
      key: 's',
      title: 'สถานะ',
      align: 'center',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status
      })
    }],
    footer: /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      colSpan: 2,
      className: "fw-bold border-0 pt-3"
    }, "\u0E22\u0E2D\u0E14\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01 ", sel.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("td", {
      className: "text-end border-0 pt-3",
      style: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--primary)'
      }
    }, DK.money(selTotal)), /*#__PURE__*/React.createElement("td", {
      className: "border-0"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3 pt-3",
    style: {
      borderTop: '1px solid var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("small", {
    className: "text-muted"
  }, "\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E22\u0E2D\u0E14\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E25\u0E30\u0E43\u0E1A\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E1C\u0E48\u0E32\u0E19 LINE"), /*#__PURE__*/React.createElement(Button, {
    variant: "line",
    icon: "fab fa-line",
    onClick: () => setLine(true)
  }, "\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E1C\u0E48\u0E32\u0E19 LINE OA"))), /*#__PURE__*/React.createElement(AppModal, {
    open: pay,
    onClose: () => setPay(false),
    icon: isCash ? 'fas fa-money-bill-wave' : qrOn ? 'fas fa-qrcode' : 'fas fa-university',
    title: isCash ? 'ชำระเงินสดที่เคาน์เตอร์' : qrOn ? 'ชำระเงินผ่าน QR Code' : 'ชำระเงิน / โอนเงิน',
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setPay(false)
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), isCash ? /*#__PURE__*/React.createElement(Button, {
      icon: "fas fa-check",
      onClick: () => {
        setPay(false);
        setCashDone(selTotal);
      }
    }, "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14") : /*#__PURE__*/React.createElement(Button, {
      icon: "fas fa-paper-plane",
      disabled: !slip,
      onClick: () => {
        setPay(false);
        setDone(selTotal);
        setSlip(null);
      }
    }, "\u0E2A\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, "\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30 ", sel.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("div", {
    className: "mb-3",
    style: {
      fontSize: '2rem',
      fontWeight: 700,
      color: 'var(--primary)'
    }
  }, DK.money(selTotal), " \u0E1A\u0E32\u0E17"), cashOn ? /*#__PURE__*/React.createElement("div", {
    className: "btn-group w-100 mb-3",
    role: "group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'btn ' + (!isCash ? 'btn-primary' : 'btn-outline-primary'),
    onClick: () => setMethod('online')
  }, /*#__PURE__*/React.createElement("i", {
    className: (qrOn ? 'fas fa-qrcode' : 'fas fa-university') + ' me-2'
  }), qrOn ? 'QR / โอนเงิน' : 'โอนเงิน'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'btn ' + (isCash ? 'btn-primary' : 'btn-outline-primary'),
    onClick: () => setMethod('cash')
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-money-bill-wave me-2"
  }), "\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14")) : null, isCash ? /*#__PURE__*/React.createElement("div", {
    className: "text-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-3 p-3 mb-3",
    style: {
      background: 'var(--blue-50)',
      border: '1px solid var(--blue-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex gap-3 align-items-start mb-2"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-map-marker-alt mt-1",
    style: {
      color: 'var(--primary)',
      width: 16
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, "\u0E08\u0E38\u0E14\u0E23\u0E31\u0E1A\u0E0A\u0E33\u0E23\u0E30"), /*#__PURE__*/React.createElement("div", {
    className: "fw-medium"
  }, cfg.cashPoint))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex gap-3 align-items-start"
  }, /*#__PURE__*/React.createElement("i", {
    className: "far fa-clock mt-1",
    style: {
      color: 'var(--primary)',
      width: 16
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, "\u0E27\u0E31\u0E19-\u0E40\u0E27\u0E25\u0E32\u0E17\u0E33\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("div", {
    className: "fw-medium"
  }, cfg.cashHours)))), /*#__PURE__*/React.createElement("div", {
    className: "fw-bold small mb-1"
  }, "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E08\u0E30\u0E0A\u0E33\u0E23\u0E30"), selItems.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "d-flex justify-content-between small py-1",
    style: {
      borderBottom: '1px dashed var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("span", null, r.label), /*#__PURE__*/React.createElement("b", null, DK.money(r.total)))), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, "\u0E41\u0E2A\u0E14\u0E07\u0E40\u0E25\u0E02\u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07\u0E19\u0E35\u0E49\u0E15\u0E48\u0E2D\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48"), /*#__PURE__*/React.createElement("div", {
    className: "fw-bold",
    style: {
      fontSize: '1.4rem',
      letterSpacing: '.06em',
      color: 'var(--primary)'
    }
  }, payRef)), /*#__PURE__*/React.createElement("div", {
    className: "small text-muted mt-2"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-info-circle me-1"
  }), "\u0E22\u0E2D\u0E14\u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E15\u0E32\u0E21\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30\u0E08\u0E23\u0E34\u0E07 \u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E08\u0E32\u0E01\u0E40\u0E1A\u0E35\u0E49\u0E22\u0E1B\u0E23\u0E31\u0E1A\u0E41\u0E25\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E34\u0E14\u0E15\u0E32\u0E21\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14 \u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E08\u0E30\u0E2D\u0E2D\u0E01\u0E43\u0E1A\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E43\u0E2B\u0E49\u0E17\u0E35\u0E48\u0E40\u0E04\u0E32\u0E19\u0E4C\u0E40\u0E15\u0E2D\u0E23\u0E4C")) : null, !isCash && qrOn ? /*#__PURE__*/React.createElement("div", {
    className: "d-inline-flex flex-column align-items-center p-3 rounded-3 mb-3 bg-white",
    style: {
      border: '1px solid var(--blue-200)',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-100 text-white fw-bold rounded-2 mb-2 py-1",
    style: {
      background: '#113566',
      fontSize: 13,
      letterSpacing: '.04em'
    }
  }, "THAI QR PAYMENT"), /*#__PURE__*/React.createElement("img", {
    src: PP.imageUrl(PP.payload(selTotal, payRef, user.taxId)),
    width: "200",
    height: "200",
    alt: 'QR ' + DK.money(selTotal) + ' บาท',
    style: {
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fw-bold mt-2",
    style: {
      color: 'var(--primary)'
    }
  }, "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19: ", cfg.accountName), /*#__PURE__*/React.createElement("small", {
    className: "text-muted"
  }, "\u0E2A\u0E41\u0E01\u0E19\u0E14\u0E49\u0E27\u0E22\u0E41\u0E2D\u0E1B\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23\u0E43\u0E14\u0E01\u0E47\u0E44\u0E14\u0E49 \u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19\u0E01\u0E23\u0E2D\u0E01\u0E43\u0E2B\u0E49\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")) : null, !isCash && cfg.bankAccount ? /*#__PURE__*/React.createElement("div", {
    className: "text-start rounded-3 p-3 mb-2 d-flex align-items-center",
    style: {
      gap: 14,
      background: 'var(--blue-50)',
      border: '1px solid var(--blue-200)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0",
    style: {
      width: 48,
      height: 48,
      background: '#00a6e6',
      fontSize: 13
    }
  }, cfg.bankShort), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow-1",
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, "\u0E42\u0E2D\u0E19\u0E40\u0E02\u0E49\u0E32\u0E1A\u0E31\u0E0D\u0E0A\u0E35 ", cfg.bankName), /*#__PURE__*/React.createElement("div", {
    className: "fw-bold",
    style: {
      fontSize: '1.25rem',
      letterSpacing: '.03em',
      color: 'var(--primary)'
    }
  }, PP.fmtAcct(cfg.bankAccount)), /*#__PURE__*/React.createElement("div", {
    className: "small"
  }, "\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35 ", cfg.accountName)), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    icon: "far fa-copy",
    onClick: () => navigator.clipboard && navigator.clipboard.writeText(cfg.bankAccount)
  }, "\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01")) : null, !isCash ? /*#__PURE__*/React.createElement("div", {
    className: "small text-muted mb-3"
  }, "\u0E40\u0E25\u0E02\u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07: ", payRef) : null), !isCash ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    className: "form-label fw-bold"
  }, "\u0E41\u0E19\u0E1A\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*,.pdf",
    className: "form-control",
    onChange: e => setSlip(e.target.files[0] || null)
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-text"
  }, "\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E1F\u0E25\u0E4C JPG, PNG, PDF")) : null), /*#__PURE__*/React.createElement(AppModal, {
    open: cashDone != null,
    onClose: () => setCashDone(null),
    tone: "success",
    icon: "fas fa-money-bill-wave",
    title: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E41\u0E25\u0E49\u0E27",
    centeredBody: true
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-1"
  }, "\u0E19\u0E33\u0E40\u0E25\u0E02\u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)'
    }
  }, payRef), " \u0E44\u0E1B\u0E0A\u0E33\u0E23\u0E30\u0E17\u0E35\u0E48\u0E40\u0E04\u0E32\u0E19\u0E4C\u0E40\u0E15\u0E2D\u0E23\u0E4C"), /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, "\u0E22\u0E2D\u0E14 ", DK.money(cashDone), " \u0E1A\u0E32\u0E17 \xB7 ", cfg.cashPoint), /*#__PURE__*/React.createElement("div", {
    className: "text-muted small mt-1"
  }, "\u0E2A\u0E16\u0E32\u0E19\u0E30: \u0E23\u0E2D\u0E0A\u0E33\u0E23\u0E30\u0E17\u0E35\u0E48\u0E40\u0E04\u0E32\u0E19\u0E4C\u0E40\u0E15\u0E2D\u0E23\u0E4C \u0E43\u0E1A\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E08\u0E30\u0E41\u0E2A\u0E14\u0E07\u0E43\u0E19\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19")), /*#__PURE__*/React.createElement(AppModal, {
    open: done != null,
    onClose: () => setDone(null),
    tone: "success",
    icon: "fas fa-check-circle",
    title: "\u0E2A\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",
    centeredBody: true
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-1"
  }, "\u0E2A\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30 ", DK.money(done), " \u0E1A\u0E32\u0E17 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27"), /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, "\u0E2A\u0E16\u0E32\u0E19\u0E30: \u0E23\u0E2D\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A")), /*#__PURE__*/React.createElement(AppModal, {
    open: line,
    onClose: () => setLine(false),
    icon: "fab fa-line",
    title: "\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D LINE OA",
    centeredBody: true,
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "line",
      icon: "fab fa-line",
      onClick: () => setLine(false)
    }, "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 LINE OA")
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-line mb-2",
    style: {
      fontSize: 56,
      color: 'var(--line-green)'
    }
  }), /*#__PURE__*/React.createElement("h5", null, "\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E1C\u0E48\u0E32\u0E19 LINE OA \u0E40\u0E17\u0E28\u0E1A\u0E32\u0E25\u0E40\u0E21\u0E37\u0E2D\u0E07\u0E14\u0E2D\u0E19\u0E41\u0E01\u0E49\u0E27"), /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E41\u0E25\u0E30\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E40\u0E25\u0E02\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E22\u0E2D\u0E14\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30")));
}
function History({
  user,
  year,
  setYear
}) {
  const [v, setV] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserHead, {
    user: user,
    year: year,
    setYear: setYear
  }), /*#__PURE__*/React.createElement(Card, {
    title: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E25\u0E49\u0E27",
    icon: "fas fa-history",
    padding: "20px 20px 8px"
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: DK.HISTORY,
    columns: [{
      key: 'id',
      title: 'เลขรายการ',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "fw-medium",
        style: {
          color: 'var(--primary)'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-receipt me-2"
      }), r.id)
    }, {
      key: 'd',
      title: 'รายละเอียด',
      render: r => r.detail
    }, {
      key: 's',
      title: 'สถานะ',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status
      })
    }, {
      key: 'x',
      title: '',
      align: 'end',
      render: r => /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        icon: "fas fa-eye",
        onClick: () => setV(r)
      }, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14")
    }]
  })), /*#__PURE__*/React.createElement(AppModal, {
    open: !!v,
    onClose: () => setV(null),
    icon: "fas fa-receipt",
    title: v ? v.id : ''
  }, v ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KV, {
    k: "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14",
    v: v.detail
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
    v: DK.thDate(v.date)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E34\u0E18\u0E35\u0E0A\u0E33\u0E23\u0E30",
    v: v.method
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E22\u0E2D\u0E14\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
    v: DK.money(v.amount) + ' บาท',
    strong: true,
    tone: "var(--status-paid)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 fw-bold mb-2"
  }, "\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    className: "d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none",
    style: {
      border: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: (v.slip.endsWith('.pdf') ? 'fas fa-file-pdf text-danger' : 'fas fa-file-image') + ' fs-3',
    style: {
      color: 'var(--primary)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "flex-grow-1 text-body"
  }, v.slip), /*#__PURE__*/React.createElement("i", {
    className: "fas fa-download"
  }))) : null));
}
Object.assign(window, {
  MyBills,
  History
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/Citizen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/Dashboard.jsx
try { (() => {
function PageHead({
  title,
  sub,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("h4", {
    className: "fw-bold mb-1"
  }, title) : null, sub ? /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, sub) : null), /*#__PURE__*/React.createElement("div", {
    className: "d-flex gap-2 flex-wrap align-items-center"
  }, right));
}
function Dashboard({
  year,
  setYear,
  go
}) {
  const rows = DK.rows();
  const billed = rows.reduce((s, r) => s + r.total, 0);
  const collected = rows.filter(r => r.status === 'paid').reduce((s, r) => s + r.total, 0);
  const pct = Math.round(collected / billed * 100);
  const cnt = k => rows.filter(r => r.status === k).length;
  const byType = [{
    k: 'land',
    t: 'ภาษีที่ดินและสิ่งปลูกสร้าง',
    icon: 'fas fa-map-marked-alt'
  }, {
    k: 'sign',
    t: 'ภาษีป้าย',
    icon: 'fas fa-sign'
  }, {
    k: 'license',
    t: 'ใบอนุญาต / ค่าธรรมเนียม',
    icon: 'fas fa-id-card'
  }].map(x => {
    const rs = rows.filter(r => r.kind === x.k);
    const b = rs.reduce((s, r) => s + r.total, 0);
    const c = rs.filter(r => r.status === 'paid').reduce((s, r) => s + r.total, 0);
    return {
      ...x,
      b,
      c,
      p: b ? Math.round(c / b * 100) : 0
    };
  });
  const tasks = rows.filter(r => ['overdue', 'expiring', 'review'].includes(r.status)).slice(0, 5);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    sub: 'ข้อมูล ณ วันที่ ' + DK.thDate(DK.TODAY),
    right: /*#__PURE__*/React.createElement(Select, {
      options: DK.YEARS,
      value: year,
      onChange: e => setYear(e.target.value)
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "row g-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-xl-6 col-12"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: 'ยอดจัดเก็บแล้วประจำปี ' + year,
    value: DK.money(collected),
    unit: "\u0E1A\u0E32\u0E17",
    icon: "fas fa-coins",
    progress: pct,
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\u0E08\u0E32\u0E01\u0E22\u0E2D\u0E14\u0E40\u0E23\u0E35\u0E22\u0E01\u0E40\u0E01\u0E47\u0E1A ", DK.money(billed), " \u0E1A\u0E32\u0E17 \xB7 \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ", /*#__PURE__*/React.createElement("b", null, pct, "%"))
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-3 col-sm-6"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 / \u0E1C\u0E39\u0E49\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E01\u0E32\u0E23",
    value: DK.TAXPAYERS.length,
    unit: "\u0E23\u0E32\u0E22",
    icon: "fas fa-users"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-3 col-sm-6"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E25\u0E49\u0E27",
    value: cnt('paid'),
    unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
    icon: "fas fa-check-circle",
    tone: "success"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-3 col-sm-6 col-6"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E0A\u0E33\u0E23\u0E30",
    value: cnt('unpaid'),
    icon: "fas fa-clock",
    tone: "warning"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-3 col-sm-6 col-6"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "\u0E43\u0E01\u0E25\u0E49\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38",
    value: cnt('expiring'),
    icon: "fas fa-hourglass-half",
    tone: "orange"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-2 col-sm-4 col-6"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14",
    value: cnt('overdue'),
    icon: "fas fa-exclamation-circle",
    tone: "danger"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-2 col-sm-4 col-6"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "\u0E23\u0E2D\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A",
    value: cnt('review'),
    icon: "fas fa-search-dollar",
    tone: "info"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xl-2 col-sm-4 col-6"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    label: "\u0E2D\u0E37\u0E48\u0E19\u0E46",
    value: cnt('other'),
    icon: "fas fa-ellipsis-h",
    tone: "muted"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row g-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-lg-7"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17",
    icon: "fas fa-chart-bar",
    style: {
      height: '100%'
    }
  }, byType.map(x => /*#__PURE__*/React.createElement("div", {
    key: x.k,
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-end mb-2 gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: x.icon + ' me-2',
    style: {
      color: 'var(--primary)',
      width: 18
    }
  }), x.t), /*#__PURE__*/React.createElement("div", {
    className: "text-end small"
  }, /*#__PURE__*/React.createElement("b", null, DK.money(x.c)), /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, " / ", DK.money(x.b)))), /*#__PURE__*/React.createElement("div", {
    className: "progress",
    style: {
      height: 10,
      background: 'var(--blue-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-bar",
    style: {
      width: x.p + '%',
      background: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "small text-muted mt-1"
  }, x.p, "% \u0E02\u0E2D\u0E07\u0E22\u0E2D\u0E14\u0E40\u0E23\u0E35\u0E22\u0E01\u0E40\u0E01\u0E47\u0E1A"))))), /*#__PURE__*/React.createElement("div", {
    className: "col-lg-5"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
    icon: "fas fa-tasks",
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      onClick: () => go('registry')
    }, "\u0E14\u0E39\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"),
    style: {
      height: '100%'
    }
  }, tasks.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "d-flex justify-content-between align-items-center py-2 gap-2",
    style: {
      borderBottom: '1px solid var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-medium text-truncate"
  }, r.p.name), /*#__PURE__*/React.createElement("small", {
    className: "text-muted"
  }, r.label, " \xB7 ", DK.thDate(r.due))), /*#__PURE__*/React.createElement(StatusBadge, {
    status: r.status
  })))))));
}
Object.assign(window, {
  Dashboard,
  PageHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/LinePreview.jsx
try { (() => {
// LINE OA message preview (chat bubble + Flex-style card) for tax reminders.
function LinePreview({
  r,
  sent
}) {
  const PP = window.PromptPay,
    cfg = PP ? PP.load() : {};
  const status = {
    overdue: ['เกินกำหนดชำระ', '#e5383b'],
    unpaid: ['รอชำระ', '#f4a100'],
    expiring: ['ใกล้หมดอายุ', '#f4a100'],
    review: ['รอตรวจสอบ', '#6c7a91'],
    paid: ['ชำระแล้ว', '#06c755']
  }[r.status] || ['แจ้งเตือน', '#153e75'];
  const now = new Date(),
    time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  const kv = (k, v, b) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 10,
      fontSize: 12.5,
      padding: '3px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8a94a3'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: b ? 700 : 500,
      color: b ? '#153e75' : '#1d2735',
      textAlign: 'right'
    }
  }, v));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#8cabd9',
      borderRadius: 14,
      overflow: 'hidden',
      maxWidth: 380,
      margin: '0 auto',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      borderBottom: '1px solid #e3e7ee'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-chevron-left",
    style: {
      color: '#1d2735'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14,
      flex: 1
    }
  }, "DK One Tax Bill ", /*#__PURE__*/React.createElement("i", {
    className: "fas fa-check-circle",
    style: {
      color: '#06c755',
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("i", {
    className: "fas fa-bars",
    style: {
      color: '#8a94a3'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 12px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(0,0,0,.18)',
      color: '#fff',
      fontSize: 11,
      padding: '2px 10px',
      borderRadius: 10
    }
  }, "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-long.png",
    alt: "",
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      objectFit: 'cover',
      objectPosition: 'right',
      background: '#fff',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#fff'
    }
  }, "DK One Tax Bill"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: '4px 16px 16px 16px',
      padding: '9px 12px',
      fontSize: 13,
      lineHeight: 1.5,
      maxWidth: 260
    }
  }, "\u0E40\u0E23\u0E35\u0E22\u0E19 ", r.p.name, /*#__PURE__*/React.createElement("br", null), "\u0E40\u0E17\u0E28\u0E1A\u0E32\u0E25\u0E40\u0E21\u0E37\u0E2D\u0E07\u0E14\u0E2D\u0E19\u0E41\u0E01\u0E49\u0E27\u0E02\u0E2D\u0E41\u0E08\u0E49\u0E07\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", r.label, "\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E0A\u0E33\u0E23\u0E30 \u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E15\u0E32\u0E21\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07\u0E04\u0E48\u0E30"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: '#fff',
      whiteSpace: 'nowrap'
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      width: 260,
      boxShadow: '0 1px 2px rgba(0,0,0,.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#153e75',
      color: '#fff',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: .85
    }
  }, "\u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E20\u0E32\u0E23\u0E30\u0E20\u0E32\u0E29\u0E35\u0E41\u0E25\u0E30\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      marginTop: 6,
      background: status[1],
      fontSize: 11,
      fontWeight: 600,
      padding: '1px 9px',
      borderRadius: 10
    }
  }, status[0])), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px'
    }
  }, kv('ผู้เสียภาษี', r.p.name), kv('เลขที่เสียภาษี', r.p.id), kv('ปีงบประมาณ', r.p.year), kv(r.kind === 'license' ? 'วันหมดอายุ' : 'ครบกำหนดชำระ', DK.thDate(r.due)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px dashed #dde4ee',
      margin: '6px 0'
    }
  }), kv('ยอดที่ต้องชำระ', DK.money(r.total) + ' บาท', true), r.status === 'overdue' ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#e5383b',
      marginTop: 4
    }
  }, "\u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21\u0E40\u0E1A\u0E35\u0E49\u0E22\u0E1B\u0E23\u0E31\u0E1A/\u0E40\u0E07\u0E34\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21 \u0E13 \u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ", DK.thDate(DK.TODAY)) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 12px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#06c755',
      color: '#fff',
      textAlign: 'center',
      borderRadius: 8,
      padding: '8px 0',
      fontSize: 13,
      fontWeight: 600
    }
  }, "\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E1C\u0E48\u0E32\u0E19 QR \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E1E\u0E22\u0E4C"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid #cdd8e6',
      color: '#153e75',
      textAlign: 'center',
      borderRadius: 8,
      padding: '7px 0',
      fontSize: 13,
      fontWeight: 500
    }
  }, "\u0E14\u0E39\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 / \u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07 PDF"))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: '#fff',
      whiteSpace: 'nowrap'
    }
  }, time)), cfg.cashOn !== 'off' ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 16,
      padding: '8px 12px',
      fontSize: 12,
      lineHeight: 1.5,
      maxWidth: 260,
      color: '#55606e'
    }
  }, "\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E44\u0E14\u0E49\u0E17\u0E35\u0E48 ", cfg.cashPoint, /*#__PURE__*/React.createElement("br", null), cfg.cashHours) : null)), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 10,
      color: '#fff'
    }
  }, "\u0E2A\u0E48\u0E07\u0E41\u0E25\u0E49\u0E27") : null));
}
Object.assign(window, {
  LinePreview
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/LinePreview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/Login.jsx
try { (() => {
function Login({
  onLogin,
  accounts,
  setAccounts
}) {
  const [u, setU] = React.useState('');
  const [p, setP] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const [regOpen, setRegOpen] = React.useState(false);
  const [reg, setReg] = React.useState({
    taxId: '',
    name: '',
    phone: '',
    password: ''
  });
  const [regErr, setRegErr] = React.useState('');
  const [regDone, setRegDone] = React.useState(null);
  const submit = e => {
    e && e.preventDefault();
    if (!u || !p) return setErr('กรุณากรอก Username และ Password');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const acc = accounts.find(a => a.username === u.trim() && a.password === p);
      if (!acc) return setErr('Username หรือ Password ไม่ถูกต้อง');
      if (acc.pending) return setErr('บัญชีของท่านอยู่ระหว่างรอ Admin ยืนยัน');
      onLogin(acc);
    }, 600);
  };
  const doRegister = () => {
    if (!reg.taxId || !reg.name || !reg.phone || !reg.password) return setRegErr('กรุณากรอกข้อมูลให้ครบถ้วน');
    if (reg.password.length < 8) return setRegErr('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
    setAccounts([...accounts, {
      username: reg.taxId,
      password: reg.password,
      role: 'citizen',
      name: reg.name,
      phone: reg.phone,
      taxId: reg.taxId,
      pending: true
    }]);
    setRegOpen(false);
    setRegErr('');
    setRegDone({
      ...reg
    });
    setReg({
      taxId: '',
      name: '',
      phone: '',
      password: ''
    });
  };
  const f = k => e => setReg({
    ...reg,
    [k]: e.target.value
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f2f5e 0%, #153e75 45%, #2563b0 100%)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("style", null, '.lg-card .input-group{border:1px solid #d6dfec;border-radius:14px;overflow:hidden;background:#f7f9fd;flex-wrap:nowrap}.lg-card .input-group>*{border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}.lg-card .input-group:focus-within{border-color:#2563b0;box-shadow:0 0 0 4px rgba(37,99,176,.15)}.lg-card .form-control{height:54px}.lg-card .btn{border-radius:14px!important;height:56px;font-weight:600}.lg-card .btn-primary{background:linear-gradient(90deg,#153e75,#2563b0)!important;border:0!important;box-shadow:0 10px 22px rgba(21,62,117,.28)}.lg-card .btn-outline-primary{background:#fff;border-color:#c9d6ea}'), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 560,
      height: 560,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.07)',
      top: -200,
      right: -140
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 460,
      height: 460,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.07)',
      bottom: -230,
      left: -150
    }
  }), /*#__PURE__*/React.createElement("form", {
    className: "lg-card",
    onSubmit: submit,
    style: {
      position: 'relative',
      background: 'rgba(255,255,255,.97)',
      borderRadius: 28,
      boxShadow: '0 24px 60px rgba(8,24,52,.35)',
      padding: '36px 40px 40px',
      width: '100%',
      maxWidth: 480,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center mb-3"
  }, /*#__PURE__*/React.createElement(Logo, {
    maxWidth: 380
  })), /*#__PURE__*/React.createElement("h4", {
    className: "mb-2 fw-bold",
    style: {
      color: 'var(--primary)'
    }
  }, "DK One Tax Bill"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted mb-4"
  }, "\u0E23\u0E30\u0E1A\u0E1A\u0E23\u0E27\u0E21\u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E20\u0E32\u0E23\u0E30\u0E20\u0E32\u0E29\u0E35\u0E41\u0E25\u0E30\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21", /*#__PURE__*/React.createElement("br", null), "\u0E40\u0E17\u0E28\u0E1A\u0E32\u0E25\u0E40\u0E21\u0E37\u0E2D\u0E07\u0E14\u0E2D\u0E19\u0E41\u0E01\u0E49\u0E27"), /*#__PURE__*/React.createElement(Input, {
    className: "mb-3",
    label: "Username",
    icon: "fas fa-user",
    placeholder: "\u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 / Username",
    value: u,
    onChange: e => setU(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    className: "mb-4",
    label: "Password",
    type: "password",
    icon: "fas fa-lock",
    placeholder: "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19",
    value: p,
    onChange: e => setP(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    block: true,
    icon: "fas fa-sign-in-alt",
    loading: loading,
    className: "fw-bold"
  }, loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    variant: "outline",
    size: "lg",
    block: true,
    icon: "fas fa-user-plus",
    className: "mt-2",
    onClick: () => setRegOpen(true)
  }, "\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19")), /*#__PURE__*/React.createElement(AppModal, {
    open: regOpen,
    onClose: () => setRegOpen(false),
    icon: "fas fa-user-plus",
    title: "\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setRegOpen(false)
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
      icon: "fas fa-check",
      onClick: doRegister
    }, "\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19"))
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted small mb-3"
  }, "\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19 / \u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35"), regErr ? /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger py-2 small"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-exclamation-circle me-1"
  }), regErr) : null, /*#__PURE__*/React.createElement(Input, {
    className: "mb-3",
    label: "\u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19 / \u0E40\u0E25\u0E02\u0E19\u0E34\u0E15\u0E34\u0E1A\u0E38\u0E04\u0E04\u0E25",
    placeholder: "\u0E40\u0E25\u0E02 13 \u0E2B\u0E25\u0E31\u0E01",
    maxLength: 13,
    value: reg.taxId,
    onChange: f('taxId')
  }), /*#__PURE__*/React.createElement(Input, {
    className: "mb-3",
    label: "\u0E0A\u0E37\u0E48\u0E2D \u2013 \u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 / \u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E16\u0E32\u0E19\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E01\u0E32\u0E23",
    placeholder: "\u0E0A\u0E37\u0E48\u0E2D\u0E41\u0E25\u0E30\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25",
    value: reg.name,
    onChange: f('name')
  }), /*#__PURE__*/React.createElement(Input, {
    className: "mb-3",
    label: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C",
    placeholder: "0xx-xxx-xxxx",
    value: reg.phone,
    onChange: f('phone')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19 (\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 8 \u0E15\u0E31\u0E27)",
    type: "password",
    placeholder: "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19",
    value: reg.password,
    onChange: f('password')
  })), /*#__PURE__*/React.createElement(AppModal, {
    open: !!regDone,
    onClose: () => setRegDone(null),
    tone: "success",
    icon: "fas fa-check-circle",
    title: "\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",
    centeredBody: true
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-user-clock mb-3",
    style: {
      fontSize: 44,
      color: 'var(--status-paid)'
    }
  }), /*#__PURE__*/React.createElement("h5", {
    className: "mb-3"
  }, "\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u0E23\u0E2D Admin \u0E01\u0E14\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19"), regDone ? /*#__PURE__*/React.createElement("div", {
    className: "d-inline-block text-start p-3 rounded-3",
    style: {
      background: 'var(--blue-50)',
      minWidth: 260
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, "Username"), /*#__PURE__*/React.createElement("b", null, regDone.taxId)), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, "Password"), /*#__PURE__*/React.createElement("b", null, regDone.password))) : null), /*#__PURE__*/React.createElement(AppModal, {
    open: !!err,
    onClose: () => setErr(null),
    tone: "danger",
    icon: "fas fa-exclamation-triangle",
    title: "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19",
    centeredBody: true
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0 text-danger"
  }, err)));
}
window.Login = Login;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/Registry.jsx
try { (() => {
function KV({
  k,
  v,
  strong,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between py-1 gap-3",
    style: {
      borderBottom: '1px dashed var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, k), /*#__PURE__*/React.createElement("span", {
    className: strong ? 'fw-bold' : 'fw-medium',
    style: {
      color: tone,
      textAlign: 'right'
    }
  }, v));
}
function SignBlock({
  t
}) {
  if (!t) return null;
  const c = DK.calcSign(t);
  return /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3 h-100",
    style: {
      border: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold mb-2",
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-sign me-2"
  }), "3. \u0E20\u0E32\u0E29\u0E35\u0E1B\u0E49\u0E32\u0E22"), /*#__PURE__*/React.createElement("div", {
    className: "small"
  }, /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19",
    v: DK.thDate(c.noticeDate)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E04\u0E23\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E0A\u0E33\u0E23\u0E30 (15 \u0E27\u0E31\u0E19)",
    v: DK.thDate(c.due)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
    v: DK.thDate(c.paid)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14",
    v: c.months + ' เดือน',
    tone: c.months ? 'var(--danger)' : undefined
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E40\u0E07\u0E34\u0E19\u0E20\u0E32\u0E29\u0E35",
    v: DK.money(c.assess)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E40\u0E07\u0E34\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30\u0E20\u0E32\u0E29\u0E35\u0E25\u0E48\u0E32\u0E0A\u0E49\u0E32",
    v: DK.money(c.surcharge)
  }), /*#__PURE__*/React.createElement(KV, {
    k: 'เงินเพิ่มจากการยื่นแบบล่าช้า' + (c.lateRate ? ' (' + c.lateRate * 100 + '%)' : ''),
    v: DK.money(c.lateFiling)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E23\u0E27\u0E21\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E34\u0E49\u0E19",
    v: DK.money(c.total),
    strong: true,
    tone: "var(--primary)"
  }), c.payMode !== 'full' ? /*#__PURE__*/React.createElement(KV, {
    k: c.payMode === 'inst1' ? 'ผ่อนชำระครั้งที่ 1' : 'ชำระตามจำนวนที่ระบุ',
    v: DK.money(c.payAmount),
    strong: true
  }) : null)));
}
function TaxBlock({
  title,
  icon,
  t
}) {
  if (!t) return null;
  const c = DK.calcTax(t);
  const props = t.properties && t.properties.length ? /*#__PURE__*/React.createElement("div", {
    className: "mt-2 pt-2 small",
    style: {
      borderTop: '1px solid var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold mb-1"
  }, "\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19 (", t.properties.length, ") \xB7 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E32\u0E01 ", t.source), t.properties.map((pp, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "d-flex justify-content-between gap-2 py-1",
    style: {
      borderBottom: '1px dashed var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, pp.address), /*#__PURE__*/React.createElement("span", {
    className: "text-nowrap"
  }, DK.money(pp.assess)))), t.paidAmount ? /*#__PURE__*/React.createElement(KV, {
    k: "\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E25\u0E49\u0E27 (e-LAAS)",
    v: DK.money(t.paidAmount)
  }) : null) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3 h-100",
    style: {
      border: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold mb-2",
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon + ' me-2'
  }), title), c.noticeNo ? /*#__PURE__*/React.createElement(KV, {
    k: "\u0E2B\u0E19\u0E31\u0E07\u0E2A\u0E37\u0E2D\u0E41\u0E08\u0E49\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48",
    v: c.noticeNo + (c.noticeDate ? ' ลว. ' + DK.thDate(c.noticeDate) : '')
  }) : null, /*#__PURE__*/React.createElement(KV, {
    k: "\u0E40\u0E07\u0E34\u0E19\u0E20\u0E32\u0E29\u0E35",
    v: DK.money(c.assess)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E04\u0E23\u0E1A\u0E0A\u0E33\u0E23\u0E30",
    v: DK.thDate(c.due)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
    v: t.paidNoDate ? 'ชำระแล้ว (ไม่ระบุวันที่)' : DK.thDate(c.paid)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14",
    v: c.days ? c.months + ' เดือน (' + c.days + ' วัน)' : '-',
    tone: c.days ? 'var(--danger)' : undefined
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30\u0E20\u0E32\u0E29\u0E35",
    v: DK.money(c.assess)
  }), /*#__PURE__*/React.createElement(KV, {
    k: 'เบี้ยปรับชำระล่าช้า' + (c.rate ? ' (' + c.rate * 100 + '%)' : ''),
    v: DK.money(c.penalty)
  }), /*#__PURE__*/React.createElement(KV, {
    k: 'เงินเพิ่ม ' + c.sRate * 100 + '% × ' + c.months + ' เดือน',
    v: DK.money(c.surcharge)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E23\u0E27\u0E21\u0E20\u0E32\u0E29\u0E35",
    v: DK.money(c.total),
    strong: true,
    tone: "var(--primary)"
  }), props));
}
function DetailModal({
  p,
  onClose,
  onEdit
}) {
  const [blocked, setBlocked] = React.useState(false);
  if (!p) return null;
  const alertBlocked = () => setBlocked(true);
  const land = DK.calcTax(p.land),
    sign = DK.calcSign(p.sign),
    lics = (p.licenses || []).map(DK.calcLicense);
  const licTotal = lics.reduce((s, l) => s + l.total, 0);
  const grand = (land ? land.total : 0) + (sign ? sign.total : 0) + licTotal;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppModal, {
    open: true,
    onClose: onClose,
    size: "xl",
    icon: "fas fa-file-invoice",
    title: "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, onEdit ? /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      icon: "fas fa-pen",
      onClick: onEdit
    }, "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25") : null, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      icon: "fas fa-file-pdf",
      onClick: () => {
        if (!window.printNotice(p)) alertBlocked();
      }
    }, "\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07 (PDF)"), /*#__PURE__*/React.createElement(Button, {
      onClick: onClose
    }, "\u0E1B\u0E34\u0E14"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "row g-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3",
    style: {
      background: 'var(--blue-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold mb-2 d-flex justify-content-between",
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-user me-2"
  }), "1. \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B"), /*#__PURE__*/React.createElement("span", {
    className: "badge rounded-pill",
    style: {
      background: 'var(--primary)'
    }
  }, "\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ", p.year)), /*#__PURE__*/React.createElement("div", {
    className: "row small g-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 / \u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E16\u0E32\u0E19\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E01\u0E32\u0E23: "), /*#__PURE__*/React.createElement("b", null, p.name)), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, "\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35: "), /*#__PURE__*/React.createElement("b", null, p.id)), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48: "), p.address), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23: "), p.phone)))), /*#__PURE__*/React.createElement(TaxBlock, {
    title: "2. \u0E20\u0E32\u0E29\u0E35\u0E17\u0E35\u0E48\u0E14\u0E34\u0E19\u0E41\u0E25\u0E30\u0E2A\u0E34\u0E48\u0E07\u0E1B\u0E25\u0E39\u0E01\u0E2A\u0E23\u0E49\u0E32\u0E07",
    icon: "fas fa-map-marked-alt",
    t: p.land
  }), /*#__PURE__*/React.createElement(SignBlock, {
    t: p.sign
  }), lics.length ? /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3",
    style: {
      border: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold mb-2 d-flex justify-content-between flex-wrap gap-2",
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-id-card me-2"
  }), "4. \u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15 (", lics.length, " \u0E43\u0E1A)"), /*#__PURE__*/React.createElement("span", null, "\u0E23\u0E27\u0E21 ", DK.money(licTotal), " \u0E1A\u0E32\u0E17")), /*#__PURE__*/React.createElement("div", {
    className: "row g-3"
  }, lics.map((lic, i) => /*#__PURE__*/React.createElement("div", {
    className: "col-md-6",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3 h-100",
    style: {
      background: 'var(--blue-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold small mb-1"
  }, "4.", i + 1, " ", lic.type), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15",
    v: lic.no
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38",
    v: DK.thDate(lic.expire)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21",
    v: DK.money(lic.fee)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1B\u0E35\u0E17\u0E35\u0E48\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30",
    v: lic.years + ' ปี',
    tone: lic.years ? 'var(--danger)' : undefined
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E17\u0E35\u0E48\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30",
    v: DK.money(lic.outstanding)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E04\u0E48\u0E32\u0E1B\u0E23\u0E31\u0E1A (20% \u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2B\u0E19\u0E31\u0E07\u0E2A\u0E37\u0E2D\u0E23\u0E31\u0E1A\u0E23\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07)",
    v: DK.money(lic.fine)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21",
    v: DK.money(lic.total),
    strong: true,
    tone: "var(--primary)"
  }))))))) : null, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center p-3 rounded-3 text-white flex-wrap gap-2",
    style: {
      background: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-calculator me-2"
  }), "5. \u0E22\u0E2D\u0E14\u0E20\u0E32\u0E29\u0E35\u0E41\u0E25\u0E30\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.6rem',
      fontWeight: 700
    }
  }, DK.money(grand), " ", /*#__PURE__*/React.createElement("span", {
    className: "fs-6 fw-normal"
  }, "\u0E1A\u0E32\u0E17")))))), /*#__PURE__*/React.createElement(AppModal, {
    open: blocked,
    onClose: () => setBlocked(false),
    tone: "warning",
    icon: "fas fa-exclamation-triangle",
    title: "\u0E40\u0E1B\u0E34\u0E14\u0E2B\u0E19\u0E49\u0E32\u0E15\u0E48\u0E32\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49",
    centeredBody: true
  }, "\u0E40\u0E1A\u0E23\u0E32\u0E27\u0E4C\u0E40\u0E0B\u0E2D\u0E23\u0E4C\u0E1A\u0E25\u0E47\u0E2D\u0E01\u0E1B\u0E4A\u0E2D\u0E1B\u0E2D\u0E31\u0E1B \u0E01\u0E23\u0E38\u0E13\u0E32\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E1B\u0E4A\u0E2D\u0E1B\u0E2D\u0E31\u0E1B\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E23\u0E30\u0E1A\u0E1A\u0E19\u0E35\u0E49 \u0E41\u0E25\u0E49\u0E27\u0E01\u0E14\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E43\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07"));
}
const EMPTY_TAX = {
  on: false,
  noticeNo: '',
  noticeDate: '',
  assess: '',
  due: '',
  paid: '',
  penaltyRate: '',
  surchargeRate: '0.01'
};
const EMPTY_SIGN = {
  on: false,
  filedDate: '',
  notFiled: false,
  noticeDate: '',
  paid: '',
  assess: '',
  surchargeAmt: '',
  lateFilingRate: 'auto',
  payMode: 'full',
  payAmount: ''
};
const EMPTY_LIC = {
  no: '',
  type: 'หนังสือรับรองการแจ้ง',
  expire: '',
  fee: '',
  years: 0
};
const toForm = (p, y) => {
  const b = p && p.byYear && p.byYear[y] || {};
  const t = x => x ? {
    ...EMPTY_TAX,
    on: true,
    noticeNo: x.noticeNo || '',
    noticeDate: x.noticeDate || '',
    assess: x.assess ?? '',
    due: x.due || '',
    paid: x.paid || '',
    penaltyRate: x.penaltyRate ?? '',
    surchargeRate: x.surchargeRate ?? '0.01',
    review: !!x.review
  } : {
    ...EMPTY_TAX
  };
  const sg = x => x ? {
    ...EMPTY_SIGN,
    on: true,
    noticeDate: x.noticeDate || '',
    paid: x.paid || '',
    assess: x.assess ?? '',
    surchargeAmt: x.surchargeAmt ?? '',
    filedDate: x.filedDate || '',
    notFiled: !!x.notFiled,
    lateFilingRate: x.lateFilingRate == null || x.lateFilingRate === 'auto' ? 'auto' : String(x.lateFilingRate),
    payMode: x.payMode || 'full',
    payAmount: x.payAmount ?? '',
    due: x.due,
    review: !!x.review
  } : {
    ...EMPTY_SIGN
  };
  return {
    land: t(b.land),
    sign: sg(b.sign),
    licenses: (b.licenses || []).map(l => ({
      ...l
    }))
  };
};
const fromForm = f => ({
  land: f.land.on ? {
    noticeNo: f.land.noticeNo,
    noticeDate: f.land.noticeDate,
    assess: Number(f.land.assess) || 0,
    due: f.land.due,
    paid: f.land.paid || null,
    penaltyRate: f.land.penaltyRate === '' ? null : Number(f.land.penaltyRate),
    surchargeRate: Number(f.land.surchargeRate),
    review: f.land.review
  } : null,
  sign: f.sign.on ? {
    noticeDate: f.sign.noticeDate,
    due: f.sign.due,
    paid: f.sign.paid || null,
    assess: Number(f.sign.assess) || 0,
    surchargeAmt: f.sign.surchargeAmt === '' ? null : Number(f.sign.surchargeAmt),
    filedDate: f.sign.filedDate,
    notFiled: f.sign.notFiled,
    lateFilingRate: f.sign.lateFilingRate === 'auto' ? 'auto' : Number(f.sign.lateFilingRate) || 0,
    payMode: f.sign.payMode,
    payAmount: f.sign.payMode === 'custom' ? Number(f.sign.payAmount) || 0 : null,
    review: f.sign.review
  } : null,
  licenses: f.licenses.map(l => ({
    no: l.no,
    type: l.type,
    expire: l.expire,
    fee: Number(l.fee) || 0,
    years: Number(l.years) || 0
  }))
});
function FormSection({
  n,
  title,
  icon,
  on,
  onToggle,
  children,
  preview,
  full
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: full ? 'col-12' : 'col-12 col-lg-6'
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3 h-100",
    style: {
      border: '1px solid ' + (on ? 'var(--blue-200)' : 'var(--border-default)'),
      background: on ? '#fff' : 'var(--gray-50, #f8f9fa)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center mb-2 gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold",
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon + ' me-2'
  }), n, ". ", title), onToggle ? /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E19\u0E1B\u0E35\u0E19\u0E35\u0E49",
    checked: on,
    onChange: e => onToggle(e.target.checked)
  }) : null), on ? /*#__PURE__*/React.createElement(React.Fragment, null, children, preview ? /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-2",
    style: {
      borderTop: '1px solid var(--border-card)'
    }
  }, preview) : null) : /*#__PURE__*/React.createElement("div", {
    className: "small text-muted py-2"
  }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u2014 \u0E15\u0E34\u0E4A\u0E01 \u201C\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E19\u0E1B\u0E35\u0E19\u0E35\u0E49\u201D \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25")));
}
function TaxpayerForm({
  open,
  mode,
  p,
  year,
  onClose,
  onSave
}) {
  const [y, setY] = React.useState(year);
  const [info, setInfo] = React.useState({
    name: '',
    id: '',
    address: '',
    phone: ''
  });
  const [f, setF] = React.useState(toForm(null, year));
  const [err, setErr] = React.useState('');
  React.useEffect(() => {
    if (!open) return;
    setY(year);
    setErr('');
    setInfo(p ? {
      name: p.name,
      id: p.id,
      address: p.address || '',
      phone: p.phone || ''
    } : {
      name: '',
      id: '',
      address: '',
      phone: ''
    });
    setF(toForm(p, year));
  }, [open, p, year]);
  if (!open) return null;
  const changeYear = v => {
    setY(v);
    setF(toForm(p, v));
  };
  const si = k => e => setInfo({
    ...info,
    [k]: e.target.value
  });
  const sf = (sec, k) => e => setF({
    ...f,
    [sec]: {
      ...f[sec],
      [k]: e.target.value
    }
  });
  const tog = sec => v => setF({
    ...f,
    [sec]: {
      ...f[sec],
      on: v
    }
  });
  const g2 = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px 14px'
  };
  const data = fromForm(f);
  const land = data.land && data.land.due ? DK.calcTax(data.land) : null,
    sign = data.sign ? DK.calcSign(data.sign) : null,
    lics = data.licenses.map(DK.calcLicense),
    licTotal = lics.reduce((s, l) => s + l.total, 0);
  const grand = (land ? land.total : 0) + (sign ? sign.total : 0) + licTotal;
  const sl = (i, k) => e => setF({
    ...f,
    licenses: f.licenses.map((l, j) => j === i ? {
      ...l,
      [k]: e.target.value
    } : l)
  });
  const addLic = () => setF({
    ...f,
    licenses: [...f.licenses, {
      ...EMPTY_LIC
    }]
  });
  const delLic = i => setF({
    ...f,
    licenses: f.licenses.filter((_, j) => j !== i)
  });
  const taxPrev = c => c ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KV, {
    k: "\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14",
    v: c.days ? c.months + ' เดือน (' + c.days + ' วัน)' : '-',
    tone: c.days ? 'var(--danger)' : undefined
  }), /*#__PURE__*/React.createElement(KV, {
    k: 'เบี้ยปรับชำระล่าช้า' + (c.rate ? ' (' + c.rate * 100 + '%)' : ''),
    v: DK.money(c.penalty)
  }), /*#__PURE__*/React.createElement(KV, {
    k: 'เงินเพิ่ม 1% × ' + c.months + ' เดือน',
    v: DK.money(c.surcharge)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E23\u0E27\u0E21\u0E20\u0E32\u0E29\u0E35",
    v: DK.money(c.total),
    strong: true,
    tone: "var(--primary)"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, "\u0E01\u0E23\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E04\u0E23\u0E1A\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E33\u0E19\u0E27\u0E13\u0E40\u0E1A\u0E35\u0E49\u0E22\u0E1B\u0E23\u0E31\u0E1A\u0E41\u0E25\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21");
  const taxFields = (sec, cc) => {
    const v = f[sec],
      ro = {
        background: '#e4e9f0',
        textAlign: 'right'
      };
    const money = (val, unit) => /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control",
      readOnly: true,
      value: val,
      style: ro
    }), /*#__PURE__*/React.createElement("span", {
      className: "input-group-text bg-white"
    }, unit));
    const radios = (k, opts) => /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap align-items-center",
      style: {
        gap: '6px 18px',
        minHeight: 38
      }
    }, opts.map(([val, l]) => /*#__PURE__*/React.createElement("label", {
      key: l,
      className: "d-flex align-items-center gap-2 m-0",
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      className: "form-check-input m-0",
      name: sec + k,
      checked: String(v[k]) === String(val),
      onChange: () => setF({
        ...f,
        [sec]: {
          ...v,
          [k]: val
        }
      })
    }), l)));
    const row = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '10px 16px',
      alignItems: 'end'
    };
    const lbl = t => /*#__PURE__*/React.createElement("label", {
      className: "form-label fw-bold mb-1"
    }, t);
    return /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-column",
      style: {
        gap: 14,
        maxWidth: 940
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement(Input, {
      label: "\u0E2B\u0E19\u0E31\u0E07\u0E2A\u0E37\u0E2D\u0E41\u0E08\u0E49\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48",
      placeholder: "\u0E40\u0E0A\u0E48\u0E19 0359/2569",
      value: v.noticeNo,
      onChange: sf(sec, 'noticeNo')
    }), /*#__PURE__*/React.createElement(Input, {
      label: "\u0E25\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48",
      type: "date",
      value: v.noticeDate,
      onChange: sf(sec, 'noticeDate')
    })), /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement(Input, {
      label: "\u0E27\u0E31\u0E19\u0E04\u0E23\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E01\u0E32\u0E23\u0E02\u0E22\u0E32\u0E22\u0E40\u0E27\u0E25\u0E32\u0E0A\u0E33\u0E23\u0E30\u0E20\u0E32\u0E29\u0E35",
      type: "date",
      value: v.due,
      onChange: sf(sec, 'due')
    }), /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement(Input, {
      label: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
      type: "date",
      value: v.paid,
      onChange: sf(sec, 'paid'),
      hint: "\u0E40\u0E27\u0E49\u0E19\u0E27\u0E48\u0E32\u0E07\u0E2B\u0E32\u0E01\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E0A\u0E33\u0E23\u0E30 (\u0E04\u0E33\u0E19\u0E27\u0E13\u0E16\u0E36\u0E07\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49)"
    }), /*#__PURE__*/React.createElement("div", null, lbl(/*#__PURE__*/React.createElement(React.Fragment, null, "\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14 ", /*#__PURE__*/React.createElement("span", {
      className: "text-danger"
    }, "*"))), money(cc ? cc.months : 0, 'เดือน'))), /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement("div", null, lbl('เงินภาษี'), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      step: "0.01",
      className: "form-control text-end",
      value: v.assess,
      onChange: sf(sec, 'assess')
    }), /*#__PURE__*/React.createElement("span", {
      className: "input-group-text bg-white"
    }, "\u0E1A\u0E32\u0E17"))), /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement("div", null, lbl('เบี้ยปรับจากการชำระภาษีล่าช้า'), money(DK.money(cc ? cc.penalty : 0), 'บาท')), /*#__PURE__*/React.createElement("div", null, radios('penaltyRate', [['', 'อัตโนมัติ' + (cc && cc.autoRate ? ' (' + cc.autoRate * 100 + '%)' : '')], [0.4, '40 %'], [0.2, '20 %'], [0.1, '10 %'], [0, 'ไม่คิด']]))), /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement("div", null, lbl('เงินเพิ่มจากการชำระภาษีล่าช้า'), money(DK.money(cc ? cc.surcharge : 0), 'บาท')), /*#__PURE__*/React.createElement("div", null, radios('surchargeRate', [['0.01', '1 %'], ['0.005', '0.5 %'], ['0', 'ไม่คิดเงินเพิ่ม']]))), /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement("div", null, lbl('รวมเงินที่ต้องชำระทั้งสิ้น'), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("input", {
      className: "form-control fw-bold",
      readOnly: true,
      value: DK.money(cc ? cc.total : Number(v.assess) || 0),
      style: {
        ...ro,
        color: 'var(--primary)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "input-group-text bg-white"
    }, "\u0E1A\u0E32\u0E17"))), /*#__PURE__*/React.createElement("div", null)));
  };
  const signFields = cc => {
    const v = f.sign,
      ro = {
        background: '#e4e9f0',
        textAlign: 'right'
      };
    const setV = patch => setF({
      ...f,
      sign: {
        ...v,
        ...patch
      }
    });
    const unit = (input, u) => /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, input, /*#__PURE__*/React.createElement("span", {
      className: "input-group-text bg-white"
    }, u));
    const roBox = (val, u) => unit(/*#__PURE__*/React.createElement("input", {
      className: "form-control",
      readOnly: true,
      value: val,
      style: ro
    }), u);
    const lbl = (t, req) => /*#__PURE__*/React.createElement("label", {
      className: "form-label fw-bold mb-1"
    }, t, req ? /*#__PURE__*/React.createElement("span", {
      className: "text-danger"
    }, " *") : null);
    const radio = (name, val, l, cur, onPick, block) => /*#__PURE__*/React.createElement("label", {
      key: l,
      className: 'd-flex align-items-center gap-2 m-0' + (block ? ' py-1' : ''),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      className: "form-check-input m-0",
      name: name,
      checked: String(cur) === String(val),
      onChange: onPick
    }), l);
    const two = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '10px 16px',
      alignItems: 'end'
    };
    const showSurcharge = v.surchargeAmt === '' ? cc ? cc.autoSurcharge.toFixed(2) : '0.00' : v.surchargeAmt;
    return /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-column",
      style: {
        gap: 14,
        maxWidth: 640
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19",
      type: "date",
      value: v.noticeDate,
      onChange: e => setV({
        noticeDate: e.target.value
      }),
      hint: cc && cc.due ? 'ครบกำหนดชำระภายใน 15 วัน: ' + DK.thDate(cc.due) : ''
    }), /*#__PURE__*/React.createElement("div", {
      style: two
    }, /*#__PURE__*/React.createElement(Input, {
      label: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
      type: "date",
      value: v.paid,
      onChange: e => setV({
        paid: e.target.value
      })
    }), /*#__PURE__*/React.createElement("div", null, lbl('เกินกำหนด', true), roBox(cc ? cc.months : 0, 'เดือน'))), /*#__PURE__*/React.createElement("div", null, lbl('เงินภาษี'), unit(/*#__PURE__*/React.createElement("input", {
      type: "number",
      step: "0.01",
      className: "form-control text-end",
      value: v.assess,
      onChange: e => setV({
        assess: e.target.value
      })
    }), 'บาท')), /*#__PURE__*/React.createElement("div", null, lbl('เงินเพิ่มจากการชำระภาษีล่าช้า'), unit(/*#__PURE__*/React.createElement("input", {
      type: "number",
      step: "0.01",
      className: "form-control text-end",
      value: showSurcharge,
      onChange: e => setV({
        surchargeAmt: e.target.value
      })
    }), 'บาท'), /*#__PURE__*/React.createElement("div", {
      className: "form-text d-flex gap-2 align-items-center"
    }, v.surchargeAmt === '' ? 'คำนวณอัตโนมัติ 1% ต่อเดือน แก้ไขได้' : /*#__PURE__*/React.createElement(React.Fragment, null, "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E40\u0E2D\u0E07 \xB7 \u0E15\u0E32\u0E21\u0E23\u0E30\u0E1A\u0E1A ", DK.money(cc ? cc.autoSurcharge : 0), " \u0E1A\u0E32\u0E17 ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        setV({
          surchargeAmt: ''
        });
      }
    }, "\u0E43\u0E0A\u0E49\u0E04\u0E48\u0E32\u0E15\u0E32\u0E21\u0E23\u0E30\u0E1A\u0E1A")))), /*#__PURE__*/React.createElement("div", {
      style: two
    }, /*#__PURE__*/React.createElement(Input, {
      label: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E22\u0E37\u0E48\u0E19\u0E41\u0E1A\u0E1A \u0E20.\u0E1B.1",
      type: "date",
      value: v.filedDate,
      disabled: v.notFiled,
      onChange: e => setV({
        filedDate: e.target.value
      }),
      hint: 'กำหนดยื่นภายใน ' + DK.thDate(cc ? cc.fileDeadline : '')
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 26
      }
    }, /*#__PURE__*/React.createElement(Checkbox, {
      label: "\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E22\u0E37\u0E48\u0E19\u0E41\u0E1A\u0E1A (\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A)",
      checked: v.notFiled,
      onChange: e => setV({
        notFiled: e.target.checked,
        filedDate: e.target.checked ? '' : v.filedDate
      })
    }))), /*#__PURE__*/React.createElement("div", null, lbl('เงินเพิ่มยื่นแบบล่าช้า'), /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap",
      style: {
        gap: '6px 18px'
      }
    }, [['auto', 'อัตโนมัติ' + (cc ? ' (' + (cc.autoLateRate ? cc.autoLateRate * 100 + '%' : 'ไม่คิด') + ')' : '')], ['0', 'ไม่คิดเงินเพิ่ม'], ['0.05', 'เพิ่ม 5%'], ['0.1', 'เพิ่ม 10%']].map(([val, l]) => radio('signLate', val, l, v.lateFilingRate, () => setV({
      lateFilingRate: val
    })))), /*#__PURE__*/React.createElement("div", {
      className: "form-text"
    }, "\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34: \u0E22\u0E37\u0E48\u0E19\u0E41\u0E1A\u0E1A\u0E2B\u0E25\u0E31\u0E07\u0E01\u0E33\u0E2B\u0E19\u0E14 5% \xB7 \u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E22\u0E37\u0E48\u0E19\u0E41\u0E1A\u0E1A 10% \xB7 \u0E22\u0E37\u0E48\u0E19\u0E20\u0E32\u0E22\u0E43\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14 \u0E44\u0E21\u0E48\u0E04\u0E34\u0E14")), /*#__PURE__*/React.createElement("div", null, lbl('เงินเพิ่มจากการยื่นแบบล่าช้า'), roBox(DK.money(cc ? cc.lateFiling : 0), 'บาท')), /*#__PURE__*/React.createElement("div", null, lbl('รวมเงินที่ต้องชำระทั้งสิ้น'), roBox(DK.money(cc ? cc.total : 0), 'บาท')), /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-column"
    }, [['full', 'ชำระเงินเต็มจำนวน'], ['inst1', 'ผ่อนชำระครั้งที่ 1'], ['custom', 'ระบุจำนวนเงิน']].map(([val, l]) => radio('signPay', val, l, v.payMode, () => setV({
      payMode: val,
      payAmount: val === 'custom' ? v.payAmount || (cc ? String(cc.total) : '') : v.payAmount
    }), true))), /*#__PURE__*/React.createElement("div", null, lbl('จำนวนเงินภาษีที่ชำระ', true), v.payMode === 'custom' ? unit(/*#__PURE__*/React.createElement("input", {
      type: "number",
      step: "0.01",
      className: "form-control text-end",
      value: v.payAmount,
      onChange: e => setV({
        payAmount: e.target.value
      })
    }), 'บาท') : roBox(DK.money(cc ? cc.payAmount : 0), 'บาท'), v.payMode === 'inst1' ? /*#__PURE__*/React.createElement("div", {
      className: "form-text"
    }, "\u0E1C\u0E48\u0E2D\u0E19\u0E0A\u0E33\u0E23\u0E30 3 \u0E07\u0E27\u0E14 \u0E07\u0E27\u0E14\u0E25\u0E30 1/3 \u0E02\u0E2D\u0E07\u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21") : null), /*#__PURE__*/React.createElement("div", null, lbl('รวมชำระเงินทั้งสิ้น'), unit(/*#__PURE__*/React.createElement("input", {
      className: "form-control fw-bold",
      readOnly: true,
      value: DK.money(cc ? cc.payAmount : 0),
      style: {
        ...ro,
        color: 'var(--primary)'
      }
    }), 'บาท')));
  };
  const save = () => {
    const id = info.id.replace(/\D/g, '');
    if (!info.name.trim()) return setErr('กรุณากรอกชื่อ-นามสกุล / ชื่อสถานประกอบการ');
    if (id.length !== 13) return setErr('เลขที่เสียภาษีต้องเป็นตัวเลข 13 หลัก');
    if (DK.TAXPAYERS.some(t => t.id === id && t !== p)) return setErr('เลขที่เสียภาษีนี้มีอยู่ในทะเบียนแล้ว');
    if (f.sign.on && (!f.sign.assess || !f.sign.noticeDate)) return setErr('ภาษีป้าย: กรุณากรอกวันที่ได้รับการแจ้งประเมินและเงินภาษี');
    if (f.sign.on && f.sign.payMode === 'custom' && !(Number(f.sign.payAmount) > 0)) return setErr('ภาษีป้าย: กรุณาระบุจำนวนเงินภาษีที่ชำระ');
    for (const [k, l] of [['land', 'ภาษีที่ดิน']]) if (f[k].on && (!f[k].assess || !f[k].due)) return setErr(l + ': กรุณากรอกยอดประเมินภาษีและวันที่ครบชำระ');
    const bad = f.licenses.findIndex(l => !l.no || !l.expire);
    if (bad >= 0) return setErr('ใบอนุญาตใบที่ ' + (bad + 1) + ': กรุณากรอกเลขที่ใบอนุญาตและวันที่หมดอายุ');
    const nos = f.licenses.map(l => l.no.trim());
    if (new Set(nos).size !== nos.length) return setErr('เลขที่ใบอนุญาตซ้ำกัน');
    onSave({
      name: info.name.trim(),
      id,
      address: info.address,
      phone: info.phone
    }, y, data);
  };
  return /*#__PURE__*/React.createElement(AppModal, {
    open: true,
    onClose: onClose,
    size: "xl",
    tone: mode === 'add' ? 'primary' : 'warning',
    icon: mode === 'add' ? 'fas fa-user-plus' : 'fas fa-pen',
    title: mode === 'add' ? 'เพิ่มผู้เสียภาษี' : 'แก้ไขข้อมูลผู้เสียภาษี',
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: onClose
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
      icon: "fas fa-save",
      onClick: save
    }, mode === 'add' ? 'เพิ่มเข้าทะเบียน' : 'บันทึกการแก้ไข'))
  }, err ? /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger py-2 d-flex align-items-center gap-2"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-exclamation-circle"
  }), err) : null, /*#__PURE__*/React.createElement("div", {
    className: "row g-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3",
    style: {
      background: 'var(--blue-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold",
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-user me-2"
  }), "1. \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B"), /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "small fw-medium"
  }, "\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E20\u0E32\u0E29\u0E35\u0E02\u0E2D\u0E07"), /*#__PURE__*/React.createElement(Select, {
    size: "sm",
    options: DK.YEARS,
    value: y,
    onChange: e => changeYear(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 / \u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E16\u0E32\u0E19\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E01\u0E32\u0E23",
    value: info.name,
    onChange: si('name')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 (13 \u0E2B\u0E25\u0E31\u0E01)",
    value: info.id,
    onChange: si('id'),
    inputMode: "numeric",
    maxLength: 13
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48",
    value: info.address,
    onChange: si('address')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23",
    value: info.phone,
    onChange: si('phone')
  })))), /*#__PURE__*/React.createElement(FormSection, {
    n: "2",
    title: "\u0E20\u0E32\u0E29\u0E35\u0E17\u0E35\u0E48\u0E14\u0E34\u0E19\u0E41\u0E25\u0E30\u0E2A\u0E34\u0E48\u0E07\u0E1B\u0E25\u0E39\u0E01\u0E2A\u0E23\u0E49\u0E32\u0E07",
    icon: "fas fa-map-marked-alt",
    on: f.land.on,
    onToggle: tog('land'),
    full: true
  }, taxFields('land', land)), /*#__PURE__*/React.createElement(FormSection, {
    n: "3",
    title: "\u0E20\u0E32\u0E29\u0E35\u0E1B\u0E49\u0E32\u0E22",
    icon: "fas fa-sign",
    on: f.sign.on,
    onToggle: tog('sign'),
    full: true
  }, signFields(sign)), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3",
    style: {
      border: '1px solid var(--blue-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold",
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-id-card me-2"
  }), "4. \u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15 / \u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21 (", f.licenses.length, " \u0E43\u0E1A)"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    icon: "fas fa-plus",
    onClick: addLic
  }, "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15")), f.licenses.length ? /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column gap-3"
  }, f.licenses.map((l, i) => {
    const c = lics[i];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "p-3 rounded-3",
      style: {
        background: 'var(--blue-50)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between align-items-center mb-2 gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "fw-bold small"
    }, "\u0E43\u0E1A\u0E17\u0E35\u0E48 ", i + 1), /*#__PURE__*/React.createElement("div", {
      className: "d-flex align-items-center gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "small"
    }, "\u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--primary)'
      }
    }, DK.money(c.total)), " \u0E1A\u0E32\u0E17", c.fine ? ' (รวมค่าปรับ ' + DK.money(c.fine) + ')' : ''), /*#__PURE__*/React.createElement(IconButton, {
      icon: "fas fa-trash",
      tone: "danger",
      size: 30,
      title: "\u0E25\u0E1A\u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E19\u0E35\u0E49",
      onClick: () => delLic(i)
    }))), /*#__PURE__*/React.createElement("div", {
      style: g2
    }, /*#__PURE__*/React.createElement(Input, {
      label: "\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15",
      value: l.no,
      onChange: sl(i, 'no')
    }), /*#__PURE__*/React.createElement(Select, {
      label: "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17",
      value: l.type,
      onChange: sl(i, 'type'),
      options: ['หนังสือรับรองการแจ้ง', 'ใบอนุญาตประกอบกิจการ', 'ใบอนุญาตจำหน่ายอาหาร']
    }), /*#__PURE__*/React.createElement(Input, {
      label: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38",
      type: "date",
      value: l.expire,
      onChange: sl(i, 'expire')
    }), /*#__PURE__*/React.createElement(Input, {
      label: "\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21 (\u0E1A\u0E32\u0E17/\u0E1B\u0E35)",
      type: "number",
      value: l.fee,
      onChange: sl(i, 'fee')
    }), /*#__PURE__*/React.createElement(Input, {
      label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1B\u0E35\u0E17\u0E35\u0E48\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30",
      type: "number",
      value: l.years,
      onChange: sl(i, 'years')
    })));
  })) : /*#__PURE__*/React.createElement("div", {
    className: "small text-muted text-center py-3"
  }, "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E43\u0E19\u0E1B\u0E35\u0E19\u0E35\u0E49 \u2014 \u0E01\u0E14 \u201C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u201D"))), /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column justify-content-center h-100 p-3 rounded-3 text-white",
    style: {
      background: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-medium"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-calculator me-2"
  }), "5. \u0E22\u0E2D\u0E14\u0E20\u0E32\u0E29\u0E35\u0E41\u0E25\u0E30\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u0E1B\u0E35 ", y), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.8rem',
      fontWeight: 700
    }
  }, DK.money(grand), " ", /*#__PURE__*/React.createElement("span", {
    className: "fs-6 fw-normal"
  }, "\u0E1A\u0E32\u0E17")), /*#__PURE__*/React.createElement("small", {
    style: {
      opacity: .85
    }
  }, "\u0E04\u0E33\u0E19\u0E27\u0E13\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E01\u0E23\u0E2D\u0E01")))));
}
function UploadModal({
  open,
  onClose,
  onDone
}) {
  const [res, setRes] = React.useState(null),
    [err, setErr] = React.useState(''),
    [busy, setBusy] = React.useState(false),
    [type, setType] = React.useState('land'),
    [y, setY] = React.useState(DK.CUR_YEAR),
    [drag, setDrag] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setRes(null);
      setErr('');
      setBusy(false);
    }
  }, [open]);
  if (!open) return null;
  const TL = {
    land: 'ภาษีที่ดินและสิ่งปลูกสร้าง',
    sign: 'ภาษีป้าย'
  };
  const read = async file => {
    if (!file) return;
    setErr('');
    setRes(null);
    setBusy(true);
    try {
      const r = await window.Elaas.parse(file);
      if (r.type) setType(r.type);
      if (r.year) setY(r.year);
      setRes(r);
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  };
  const plan = res ? window.Elaas.plan(res) : null;
  const yearOpts = [...new Set([...(res && res.year ? [res.year] : []), ...DK.YEARS.map(o => o.value)])].map(v => ({
    value: v,
    label: 'ปีงบประมาณ ' + v
  }));
  const stat = (l, v, tone) => /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-3 text-center",
    style: {
      background: '#fff',
      border: '1px solid var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, l), /*#__PURE__*/React.createElement("div", {
    className: "fw-bold",
    style: {
      color: tone || 'var(--primary)',
      fontSize: '1.1rem'
    }
  }, v));
  const go = () => {
    setBusy(true);
    setTimeout(() => {
      const n = window.Elaas.apply(res, type, y);
      onDone({
        ...res,
        typeLabel: TL[type]
      }, n, y);
    }, 30);
  };
  return /*#__PURE__*/React.createElement(AppModal, {
    open: true,
    onClose: onClose,
    icon: "fas fa-upload",
    title: "\u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E20\u0E32\u0E29\u0E35\u0E17\u0E35\u0E48\u0E14\u0E34\u0E19\u0E41\u0E25\u0E30\u0E1B\u0E49\u0E32\u0E22 (e-LAAS)",
    size: "lg",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: onClose
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
      icon: busy ? 'fas fa-spinner fa-spin' : 'fas fa-check',
      disabled: !res || busy,
      onClick: go
    }, res ? 'นำเข้า ' + res.records.length.toLocaleString() + ' ราย' : 'นำเข้าข้อมูล'))
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label fw-bold"
  }, "\u0E44\u0E1F\u0E25\u0E4C\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19 \u0E01\u0E04.1 \u0E08\u0E32\u0E01 e-LAAS (.xlsx)"), /*#__PURE__*/React.createElement("label", {
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      read(e.dataTransfer.files[0]);
    },
    className: "d-block text-center p-4 rounded-3 mb-3",
    style: {
      border: '2px dashed ' + (drag ? 'var(--primary)' : 'var(--blue-200)'),
      background: 'var(--blue-50)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: busy ? 'fas fa-spinner fa-spin mb-2' : 'fas fa-file-excel mb-2',
    style: {
      fontSize: 36,
      color: 'var(--status-paid)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fw-medium"
  }, res ? res.fileName : 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์'), /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E1C\u0E39\u0E49\u0E0A\u0E33\u0E23\u0E30\u0E20\u0E32\u0E29\u0E35 (\u0E01\u0E04.1) \xB7 \u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E20\u0E32\u0E29\u0E35\u0E17\u0E35\u0E48\u0E14\u0E34\u0E19\u0E41\u0E25\u0E30\u0E2A\u0E34\u0E48\u0E07\u0E1B\u0E25\u0E39\u0E01\u0E2A\u0E23\u0E49\u0E32\u0E07 \u0E2B\u0E23\u0E37\u0E2D \u0E20\u0E32\u0E29\u0E35\u0E1B\u0E49\u0E32\u0E22"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".xlsx,.xls",
    className: "d-none",
    onChange: e => read(e.target.files[0])
  })), err ? /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger py-2 d-flex gap-2 align-items-center"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-exclamation-circle"
  }), err) : null, res ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "row g-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement(Select, {
    label: 'ประเภทข้อมูล' + (res.type ? ' (ตรวจพบจากไฟล์)' : ''),
    value: type,
    onChange: e => setType(e.target.value),
    options: [{
      value: 'land',
      label: TL.land
    }, {
      value: 'sign',
      label: TL.sign
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement(Select, {
    label: 'ปีงบประมาณ' + (res.year ? ' (ตรวจพบจากไฟล์)' : ''),
    value: y,
    onChange: e => setY(e.target.value),
    options: yearOpts
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-3 mb-3",
    style: {
      background: 'var(--blue-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: 8
    }
  }, stat('ผู้เสียภาษี', res.records.length.toLocaleString() + ' ราย'), stat('เพิ่มใหม่', plan.add.toLocaleString()), stat('อัพเดทรายเดิม', plan.upd.toLocaleString()), stat('ยังไม่ชำระ', plan.unpaid.toLocaleString() + ' ราย', 'var(--danger)')), /*#__PURE__*/React.createElement("div", {
    className: "small mt-3"
  }, /*#__PURE__*/React.createElement(KV, {
    k: "\u0E22\u0E2D\u0E14\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E20\u0E32\u0E29\u0E35\u0E23\u0E27\u0E21",
    v: DK.money(res.totals.assess) + ' บาท'
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E25\u0E49\u0E27",
    v: DK.money(res.totals.paid) + ' บาท'
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E04\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E0A\u0E33\u0E23\u0E30",
    v: DK.money(res.totals.bal) + ' บาท',
    strong: true,
    tone: "var(--danger)"
  })), res.footer ? /*#__PURE__*/React.createElement("div", {
    className: 'small mt-2 ' + (res.mismatch ? 'text-danger' : 'text-success')
  }, /*#__PURE__*/React.createElement("i", {
    className: 'fas ' + (res.mismatch ? 'fa-exclamation-triangle' : 'fa-check-circle') + ' me-1'
  }), res.mismatch ? 'ยอดรวมไม่ตรงกับแถว "รวม" ในไฟล์ (' + DK.money(res.footer.assess) + ') กรุณาตรวจสอบ' : 'ยอดรวมตรงกับแถว "รวม" ในไฟล์') : null, plan.noId ? /*#__PURE__*/React.createElement("div", {
    className: "small text-muted mt-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-info-circle me-1"
  }), plan.noId.toLocaleString(), " \u0E23\u0E32\u0E22\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27 \u0E08\u0E30\u0E08\u0E31\u0E1A\u0E04\u0E39\u0E48\u0E14\u0E49\u0E27\u0E22\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 \u0E41\u0E25\u0E30\u0E04\u0E27\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E25\u0E02\u0E20\u0E32\u0E22\u0E2B\u0E25\u0E31\u0E07") : null), /*#__PURE__*/React.createElement("div", {
    className: "fw-bold small mb-1"
  }, "\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 5 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E23\u0E01"), /*#__PURE__*/React.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-sm small mb-0"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "table-light"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u0E0A\u0E37\u0E48\u0E2D"), /*#__PURE__*/React.createElement("th", null, "\u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27"), /*#__PURE__*/React.createElement("th", {
    className: "text-end"
  }, "\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19"), /*#__PURE__*/React.createElement("th", {
    className: "text-end"
  }, "\u0E0A\u0E33\u0E23\u0E30"), /*#__PURE__*/React.createElement("th", {
    className: "text-end"
  }, "\u0E04\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D"))), /*#__PURE__*/React.createElement("tbody", null, res.records.slice(0, 5).map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.no
  }, /*#__PURE__*/React.createElement("td", null, r.name, r.properties.length > 1 ? /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, " (", r.properties.length, " \u0E41\u0E1B\u0E25\u0E07)") : null), /*#__PURE__*/React.createElement("td", {
    className: "text-muted"
  }, r.id || '-'), /*#__PURE__*/React.createElement("td", {
    className: "text-end"
  }, DK.money(r.assess)), /*#__PURE__*/React.createElement("td", {
    className: "text-end"
  }, DK.money(r.paid)), /*#__PURE__*/React.createElement("td", {
    className: "text-end",
    style: {
      color: r.bal ? 'var(--danger)' : undefined
    }
  }, DK.money(r.bal)))))))) : null, /*#__PURE__*/React.createElement("div", {
    className: "form-text mt-2"
  }, "\u0E43\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E14\u0E36\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E08\u0E32\u0E01 Google Sheets (\u0E0A\u0E35\u0E15 Licenses \u0E41\u0E25\u0E30 Payments)"));
}
function Registry({
  year,
  setYear
}) {
  const [ver, setVer] = React.useState(0);
  const [removed, setRemoved] = React.useState([]);
  const all = React.useMemo(() => DK.rows(year).filter(r => !removed.includes(r.id)), [year, ver, removed]);
  const setAll = () => setVer(v => v + 1);
  const [form, setForm] = React.useState(null);
  const [cat, setCat] = React.useState(null);
  const [st, setSt] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [view, setView] = React.useState(null);
  const [modal, setModal] = React.useState(null);
  const counts = {
    all: all.length
  };
  ['paid', 'unpaid', 'expiring', 'overdue', 'review', 'other'].forEach(k => counts[k] = all.filter(r => r.status === k).length);
  const rows = all.filter(r => (!cat || r.kind === cat) && (st === 'all' || r.status === st) && (!q || (r.p.name + r.p.id).includes(q.trim())));
  const [closed, setClosed] = React.useState([]);
  const SEV = ['overdue', 'unpaid', 'expiring', 'review', 'other', 'paid'];
  const groups = React.useMemo(() => {
    const m = new Map();
    rows.forEach(r => {
      if (!m.has(r.p.id)) m.set(r.p.id, {
        id: r.p.id,
        p: r.p,
        items: []
      });
      m.get(r.p.id).items.push(r);
    });
    return [...m.values()].map(g => {
      const open = g.items.filter(r => r.status !== 'paid');
      return {
        ...g,
        paid: g.items.length - open.length,
        outstanding: open.reduce((s, r) => s + r.total, 0),
        nextDue: open.map(r => r.due).filter(Boolean).sort()[0],
        status: SEV.find(s => g.items.some(r => r.status === s)) || 'other'
      };
    });
  }, [rows]);
  const allOpen = closed.length === 0;
  const [limit, setLimit] = React.useState(50);
  React.useEffect(() => setLimit(50), [q, cat, st, year]);
  const [lineRow, setLineRow] = React.useState(null);
  const [picked, setPicked] = React.useState([]);
  const [bulk, setBulk] = React.useState(false);
  const canPick = r => r.status !== 'paid';
  const pickable = rows.filter(canPick);
  const allOn = pickable.length > 0 && pickable.every(r => picked.includes(r.id));
  const togglePick = id => setPicked(picked.includes(id) ? picked.filter(x => x !== id) : [...picked, id]);
  const toggleAll = () => setPicked(allOn ? picked.filter(id => !pickable.some(r => r.id === id)) : [...new Set([...picked, ...pickable.map(r => r.id)])]);
  const pickedRows = all.filter(r => picked.includes(r.id));
  const people = [...new Set(pickedRows.map(r => r.p.id))].length;
  const pickedTotal = pickedRows.reduce((s, r) => s + r.total, 0);
  const sendBulk = () => {
    pickedRows.forEach(r => {
      r.p.src.notified = true;
    });
    setBulk(false);
    setPicked([]);
    setAll();
    setModal({
      tone: 'success',
      icon: 'fab fa-line',
      title: 'ส่งแจ้งเตือนสำเร็จ',
      msg: 'ส่งข้อความแจ้งเตือนผ่าน LINE OA ' + pickedRows.length + ' รายการ ถึงผู้เสียภาษี ' + people + ' ราย เรียบร้อยแล้ว'
    });
  };
  const notify = r => setLineRow(r);
  const sendLine = () => {
    const r = lineRow;
    r.p.src.notified = true;
    setLineRow(null);
    setAll();
    setModal({
      tone: 'success',
      icon: 'fab fa-line',
      title: 'ส่งแจ้งเตือนสำเร็จ',
      msg: 'ส่งข้อความแจ้งเตือนผ่าน LINE OA ถึง ' + r.p.name + ' เรียบร้อยแล้ว'
    });
  };
  const cats = [['land', 'ภาษีที่ดิน', 'fas fa-map-marked-alt'], ['sign', 'ภาษีป้าย', 'fas fa-sign'], ['license', 'ใบอนุญาต', 'fas fa-id-card']];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    padding: "14px 20px",
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex gap-2 flex-wrap align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 220px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "fas fa-search",
    placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 / \u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    icon: "fas fa-sync-alt",
    onClick: () => {
      setQ('');
      setCat(null);
      setSt('all');
    }
  }, "\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A"), /*#__PURE__*/React.createElement(Button, {
    variant: "success",
    icon: "fas fa-file-excel",
    onClick: () => setModal({
      tone: 'success',
      icon: 'fas fa-file-excel',
      title: 'ส่งออก Excel',
      msg: 'ส่งออกข้อมูล ' + rows.length + ' รายการ เรียบร้อยแล้ว'
    })
  }, "\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01 Excel"))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: "fas fa-user-plus",
    onClick: () => setForm({
      mode: 'add',
      p: null
    })
  }, "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    icon: "fas fa-upload",
    onClick: () => setModal({
      upload: true
    })
  }, "\u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14\u0E44\u0E1F\u0E25\u0E4C\u0E20\u0E32\u0E29\u0E35\u0E17\u0E35\u0E48\u0E14\u0E34\u0E19 / \u0E1B\u0E49\u0E32\u0E22")), /*#__PURE__*/React.createElement(Select, {
    options: DK.YEARS,
    value: year,
    onChange: e => setYear(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "row g-3 mb-3"
  }, cats.map(([k, t, i], ci) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "col-md-4"
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "tile",
    tone: ['primary', 'info', 'success'][ci],
    label: t,
    value: all.filter(r => r.kind === k).length,
    unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
    icon: i,
    selected: cat === k,
    onClick: () => setCat(cat === k ? null : k),
    sub: cat === k ? 'กำลังกรอง · คลิกอีกครั้งเพื่อยกเลิก' : 'คลิกเพื่อกรองข้อมูล'
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(StatusFilter, {
    value: st,
    onChange: setSt,
    counts: counts
  })), picked.length ? /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center flex-wrap gap-2 mb-2 px-3 py-2 rounded-3",
    style: {
      background: 'var(--blue-50)',
      border: '1px solid var(--blue-200)',
      position: 'sticky',
      top: 8,
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fw-medium",
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-check-square me-2"
  }), "\u0E40\u0E25\u0E37\u0E2D\u0E01 ", pickedRows.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \xB7 \u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35 ", people, " \u0E23\u0E32\u0E22 \xB7 \u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21 ", DK.money(pickedTotal), " \u0E1A\u0E32\u0E17"), /*#__PURE__*/React.createElement("div", {
    className: "ms-auto d-flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    onClick: () => setPicked([])
  }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E01\u0E32\u0E23\u0E40\u0E25\u0E37\u0E2D\u0E01"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "fab fa-line",
    style: {
      background: '#06c755',
      borderColor: '#06c755'
    },
    onClick: () => setBulk(true)
  }, "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E1C\u0E48\u0E32\u0E19 LINE (", people, " \u0E23\u0E32\u0E22)"))) : null, /*#__PURE__*/React.createElement(Card, {
    padding: "8px 16px"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table align-middle mb-0",
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", {
    className: "table-light"
  }, /*#__PURE__*/React.createElement("tr", null, [[/*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "form-check-input",
    title: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E0A\u0E33\u0E23\u0E30",
    checked: allOn,
    disabled: !pickable.length,
    onChange: toggleAll
  }), '', 36], [/*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-link p-0 text-decoration-none",
    style: {
      color: 'var(--text-muted)'
    },
    title: allOpen ? 'ย่อทั้งหมด' : 'ขยายทั้งหมด',
    onClick: () => setClosed(allOpen ? groups.map(g => g.id) : [])
  }, /*#__PURE__*/React.createElement("i", {
    className: 'fas ' + (allOpen ? 'fa-angle-double-up' : 'fa-angle-double-down')
  })), '', 28], ['ผู้เสียภาษี / รายการ'], ['ยอดรวม', 'end'], ['วันที่ครบกำหนด'], ['วันที่ชำระ'], ['สถานะ'], ['', 'end']].map(([t, al, w], i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    className: al === 'end' ? 'text-end' : '',
    style: {
      fontWeight: 600,
      fontSize: '.9rem',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      width: w
    }
  }, t)))), /*#__PURE__*/React.createElement("tbody", null, groups.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "8",
    className: "text-center text-muted py-4"
  }, "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25")) : groups.slice(0, limit).map(g => {
    const open = !closed.includes(g.id);
    const gp = g.items.filter(canPick),
      gOn = gp.length > 0 && gp.every(r => picked.includes(r.id)),
      gSome = gp.some(r => picked.includes(r.id));
    const togG = () => setPicked(gOn ? picked.filter(id => !gp.some(r => r.id === id)) : [...new Set([...picked, ...gp.map(r => r.id)])]);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: g.id
    }, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: '#f7f9fc',
        cursor: 'pointer'
      },
      onClick: () => setClosed(open ? [...closed, g.id] : closed.filter(x => x !== g.id))
    }, /*#__PURE__*/React.createElement("td", {
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "form-check-input",
      checked: gOn,
      ref: el => el && (el.indeterminate = gSome && !gOn),
      disabled: !gp.length,
      onChange: togG
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("i", {
      className: 'fas fa-chevron-' + (open ? 'down' : 'right'),
      style: {
        color: 'var(--text-muted)',
        fontSize: 12
      }
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "fw-bold"
    }, g.p.name), /*#__PURE__*/React.createElement("div", {
      className: "small text-muted d-flex flex-wrap",
      style: {
        gap: '0 10px'
      }
    }, /*#__PURE__*/React.createElement("span", null, g.p.id), /*#__PURE__*/React.createElement("span", null, g.items.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"), g.paid ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--success, #198754)'
      }
    }, "\u0E0A\u0E33\u0E23\u0E30\u0E41\u0E25\u0E49\u0E27 ", g.paid) : null, g.items.length - g.paid ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--danger)'
      }
    }, "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30 ", g.items.length - g.paid) : null)), /*#__PURE__*/React.createElement("td", {
      className: "text-end"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fw-bold"
    }, DK.money(g.outstanding)), /*#__PURE__*/React.createElement("div", {
      className: "small text-muted"
    }, "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30")), /*#__PURE__*/React.createElement("td", null, g.nextDue ? DK.thDate(g.nextDue) : '-'), /*#__PURE__*/React.createElement("td", null, "-"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusBadge, {
      status: g.status
    })), /*#__PURE__*/React.createElement("td", {
      className: "text-end",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex gap-1 justify-content-end"
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "fas fa-eye",
      title: "\u0E14\u0E39\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14",
      size: 32,
      onClick: () => setView(g.p)
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "fas fa-pen",
      tone: "warning",
      title: "\u0E41\u0E01\u0E49\u0E44\u0E02",
      size: 32,
      onClick: () => setForm({
        mode: 'edit',
        p: g.p.src
      })
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "fas fa-trash",
      tone: "danger",
      title: "\u0E25\u0E1A",
      size: 32,
      onClick: () => setModal({
        confirm: g
      })
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "fab fa-line",
      tone: "line",
      active: g.p.notified,
      title: g.p.notified ? 'แจ้งเตือนแล้ว' : 'แจ้งเตือนผ่านไลน์',
      size: 32,
      onClick: () => notify(g.items.find(canPick) || g.items[0])
    })))), open ? g.items.map(r => /*#__PURE__*/React.createElement("tr", {
      key: r.id
    }, /*#__PURE__*/React.createElement("td", null), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "form-check-input",
      checked: picked.includes(r.id),
      disabled: !canPick(r),
      title: canPick(r) ? '' : 'ชำระแล้ว',
      onChange: () => togglePick(r.id)
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "d-flex align-items-center gap-2",
      style: {
        paddingLeft: 4
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: r.kind === 'land' ? 'fas fa-map-marked-alt' : r.kind === 'sign' ? 'fas fa-sign' : 'fas fa-id-card',
      style: {
        color: 'var(--primary)',
        width: 16,
        opacity: .8
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "small"
    }, r.label))), /*#__PURE__*/React.createElement("td", {
      className: "text-end small"
    }, DK.money(r.total)), /*#__PURE__*/React.createElement("td", {
      className: "small"
    }, DK.thDate(r.due)), /*#__PURE__*/React.createElement("td", {
      className: "small"
    }, DK.thDate(r.paid)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusBadge, {
      status: r.status
    })), /*#__PURE__*/React.createElement("td", null))) : null);
  })))), groups.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center flex-wrap gap-2 py-2 small text-muted"
  }, /*#__PURE__*/React.createElement("span", null, "\u0E41\u0E2A\u0E14\u0E07 ", Math.min(limit, groups.length).toLocaleString(), " \u0E08\u0E32\u0E01 ", groups.length.toLocaleString(), " \u0E23\u0E32\u0E22"), groups.length > limit ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    icon: "fas fa-chevron-down",
    onClick: () => setLimit(limit + 100)
  }, "\u0E41\u0E2A\u0E14\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21 100 \u0E23\u0E32\u0E22") : null) : null), /*#__PURE__*/React.createElement(AppModal, {
    open: bulk,
    onClose: () => setBulk(false),
    icon: "fab fa-line",
    title: 'แจ้งเตือนผ่าน LINE OA · ' + people + ' ราย',
    size: "lg",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setBulk(false)
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
      icon: "fab fa-line",
      style: {
        background: '#06c755',
        borderColor: '#06c755'
      },
      onClick: sendBulk
    }, "\u0E2A\u0E48\u0E07\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19 ", pickedRows.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"))
  }, bulk ? /*#__PURE__*/React.createElement("div", {
    className: "row g-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold small mb-2"
  }, "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A (", pickedRows.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23)"), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column",
    style: {
      maxHeight: 420,
      overflowY: 'auto',
      gap: 6
    }
  }, pickedRows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "d-flex justify-content-between align-items-center gap-2 p-2 rounded-3",
    style: {
      border: '1px solid var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-medium small"
  }, r.p.name, r.p.notified ? /*#__PURE__*/React.createElement("span", {
    className: "badge rounded-pill ms-2",
    style: {
      background: '#e6f9ee',
      color: '#06a048'
    }
  }, "\u0E40\u0E04\u0E22\u0E41\u0E08\u0E49\u0E07\u0E41\u0E25\u0E49\u0E27") : null), /*#__PURE__*/React.createElement("div", {
    className: "text-muted",
    style: {
      fontSize: 12
    }
  }, r.label, " \xB7 ", DK.money(r.total), " \u0E1A\u0E32\u0E17")), /*#__PURE__*/React.createElement(StatusBadge, {
    status: r.status
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold small mb-2"
  }, "\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21 (\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E23\u0E01)"), /*#__PURE__*/React.createElement(LinePreview, {
    r: pickedRows[0]
  }), /*#__PURE__*/React.createElement("div", {
    className: "small text-muted text-center mt-2"
  }, "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E15\u0E48\u0E25\u0E30\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E08\u0E30\u0E43\u0E2A\u0E48\u0E0A\u0E37\u0E48\u0E2D \u0E22\u0E2D\u0E14 \u0E41\u0E25\u0E30\u0E27\u0E31\u0E19\u0E04\u0E23\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E19\u0E31\u0E49\u0E19\u0E46"))) : null), /*#__PURE__*/React.createElement(AppModal, {
    open: !!lineRow,
    onClose: () => setLineRow(null),
    icon: "fab fa-line",
    title: lineRow && lineRow.p.notified ? 'ข้อความที่ส่งผ่าน LINE OA' : 'ตัวอย่างข้อความ LINE OA',
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setLineRow(null)
    }, lineRow && lineRow.p.notified ? 'ปิด' : 'ยกเลิก'), /*#__PURE__*/React.createElement(Button, {
      icon: lineRow && lineRow.p.notified ? 'fas fa-redo' : 'fab fa-line',
      style: {
        background: '#06c755',
        borderColor: '#06c755'
      },
      onClick: sendLine
    }, lineRow && lineRow.p.notified ? 'ส่งซ้ำ' : 'ส่งแจ้งเตือน'))
  }, lineRow ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LinePreview, {
    r: lineRow,
    sent: lineRow.p.notified
  }), lineRow.p.notified ? /*#__PURE__*/React.createElement("div", {
    className: "small text-muted text-center mt-2"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-check-circle text-success me-1"
  }), "\u0E2A\u0E48\u0E07\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E16\u0E36\u0E07\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35\u0E23\u0E32\u0E22\u0E19\u0E35\u0E49\u0E41\u0E25\u0E49\u0E27") : null) : null), /*#__PURE__*/React.createElement(DetailModal, {
    p: view,
    onClose: () => setView(null),
    onEdit: () => {
      setForm({
        mode: 'edit',
        p: view.src
      });
      setView(null);
    }
  }), /*#__PURE__*/React.createElement(TaxpayerForm, {
    open: !!form,
    mode: form && form.mode,
    p: form && form.p,
    year: year,
    onClose: () => setForm(null),
    onSave: (info, y, data) => {
      let p = form.p;
      if (form.mode === 'add') p = DK.addTaxpayer(info, y, data);else {
        Object.assign(p, info);
        DK.saveYear(p, y, data);
      }
      setForm(null);
      if (y !== year) setYear(y);
      setVer(v => v + 1);
      setModal({
        tone: 'success',
        icon: 'fas fa-check-circle',
        title: form.mode === 'add' ? 'เพิ่มผู้เสียภาษีสำเร็จ' : 'บันทึกสำเร็จ',
        msg: (form.mode === 'add' ? 'เพิ่ม ' : 'แก้ไขข้อมูล ') + info.name + ' ปีงบประมาณ ' + y + ' เรียบร้อยแล้ว'
      });
    }
  }), /*#__PURE__*/React.createElement(AppModal, {
    open: !!(modal && modal.msg),
    onClose: () => setModal(null),
    tone: modal && modal.tone,
    icon: modal && modal.icon,
    title: modal && modal.title,
    centeredBody: true
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, modal && modal.msg)), /*#__PURE__*/React.createElement(AppModal, {
    open: !!(modal && modal.confirm),
    onClose: () => setModal(null),
    tone: "danger",
    icon: "fas fa-trash",
    title: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E25\u0E1A",
    centeredBody: true,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setModal(null)
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      icon: "fas fa-trash",
      onClick: () => {
        setRemoved([...removed, ...(modal.confirm.items ? modal.confirm.items.map(r => r.id) : [modal.confirm.id])]);
        setModal(null);
      }
    }, "\u0E25\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"))
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-1"
  }, modal && modal.confirm && modal.confirm.items ? 'ต้องการลบผู้เสียภาษีรายนี้ใช่หรือไม่?' : 'ต้องการลบรายการนี้ใช่หรือไม่?'), /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, modal && modal.confirm && (modal.confirm.items ? modal.confirm.p.name + ' · ' + modal.confirm.items.length + ' รายการในปีงบประมาณนี้' : modal.confirm.p.name + ' · ' + modal.confirm.label))), /*#__PURE__*/React.createElement(UploadModal, {
    open: !!(modal && modal.upload),
    onClose: () => setModal(null),
    onDone: (res, n, y) => {
      if (y !== year) setYear(y);
      setVer(v => v + 1);
      setModal({
        tone: 'success',
        icon: 'fas fa-check-circle',
        title: 'นำเข้าข้อมูลสำเร็จ',
        msg: 'นำเข้า' + res.typeLabel + ' ปีงบประมาณ ' + y + ' จำนวน ' + res.records.length.toLocaleString() + ' ราย (เพิ่มใหม่ ' + n.add.toLocaleString() + ' · อัพเดท ' + n.upd.toLocaleString() + ')'
      });
    }
  }));
}
Object.assign(window, {
  Registry,
  KV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/Registry.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/Settings.jsx
try { (() => {
function Settings({
  year,
  setYear
}) {
  const PP = window.PromptPay;
  const [s, setS] = React.useState(PP.load());
  const [msg, setMsg] = React.useState(null);
  const [preview, setPreview] = React.useState(false);
  const set = k => e => setS({
    ...s,
    [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  });
  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '18px 20px'
  };
  const validJson = t => {
    try {
      JSON.parse(t);
      return true;
    } catch (e) {
      return false;
    }
  };
  const save = () => {
    const pp = s.promptpayId.replace(/\D/g, ''),
      bl = s.billerId.replace(/\D/g, '');
    if (pp && pp.length !== 10 && pp.length !== 13) return setMsg({
      tone: 'danger',
      title: 'บันทึกไม่สำเร็จ',
      text: 'PromptPay ID ต้องเป็นตัวเลข 10 หรือ 13 หลัก'
    });
    if (bl && bl.length !== 15) return setMsg({
      tone: 'danger',
      title: 'บันทึกไม่สำเร็จ',
      text: 'Biller ID ต้องเป็นตัวเลข 15 หลัก'
    });
    if (s.qrType === 'biller' && !bl) return setMsg({
      tone: 'danger',
      title: 'บันทึกไม่สำเร็จ',
      text: 'เลือกรูปแบบ Bill Payment ต้องกรอก Biller ID'
    });
    if (!validJson(s.licensesMap) || !validJson(s.paymentsMap)) return setMsg({
      tone: 'danger',
      title: 'บันทึกไม่สำเร็จ',
      text: 'รูปแบบ JSON ของ mapping ไม่ถูกต้อง'
    });
    PP.save(s);
    setMsg({
      tone: 'success',
      title: 'บันทึกการตั้งค่าแล้ว',
      text: 'การตั้งค่าใหม่มีผลกับหน้าชำระเงินทันที'
    });
  };
  const testPayload = PP.payload(1, 'TEST0001', 'DK', s);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E23\u0E30\u0E1A\u0E1A",
    sub: "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19 LINE OA \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E08\u0E31\u0E1A\u0E04\u0E39\u0E48\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C\u0E15\u0E49\u0E19\u0E17\u0E32\u0E07",
    right: /*#__PURE__*/React.createElement(Select, {
      options: DK.YEARS,
      value: year,
      onChange: e => setYear(e.target.value)
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column",
    style: {
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E23\u0E31\u0E1A\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19",
    icon: "fas fa-university"
  }, /*#__PURE__*/React.createElement("div", {
    style: grid
  }, /*#__PURE__*/React.createElement(Select, {
    label: "\u0E40\u0E1B\u0E34\u0E14\u0E23\u0E31\u0E1A\u0E0A\u0E33\u0E23\u0E30\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C",
    value: s.online,
    onChange: set('online'),
    options: [{
      value: 'on',
      label: 'เปิดใช้งาน'
    }, {
      value: 'off',
      label: 'ปิดไว้ก่อน'
    }]
  }), /*#__PURE__*/React.createElement(Select, {
    label: "\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A QR",
    value: s.qrType,
    onChange: set('qrType'),
    options: [{
      value: 'promptpay',
      label: 'PromptPay (ตรวจรับเงินด้วยเจ้าหน้าที่)'
    }, {
      value: 'biller',
      label: 'Bill Payment / Biller ID (กระทบยอดอัตโนมัติ)'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19",
    value: s.accountName,
    onChange: set('accountName'),
    hint: "\u0E0A\u0E37\u0E48\u0E2D\u0E17\u0E35\u0E48\u0E41\u0E2A\u0E14\u0E07\u0E43\u0E19\u0E41\u0E2D\u0E1B\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23\u0E21\u0E32\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E1E\u0E22\u0E4C/Biller \u0E01\u0E31\u0E1A\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "PromptPay ID (10 \u0E2B\u0E23\u0E37\u0E2D 13 \u0E2B\u0E25\u0E31\u0E01)",
    value: s.promptpayId,
    onChange: set('promptpayId'),
    inputMode: "numeric"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Biller ID (15 \u0E2B\u0E25\u0E31\u0E01)",
    value: s.billerId,
    onChange: set('billerId'),
    inputMode: "numeric"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E27\u0E31\u0E19\u0E41\u0E08\u0E49\u0E07\u0E43\u0E01\u0E25\u0E49\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38",
    type: "number",
    value: s.expiryDays,
    onChange: set('expiryDays')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23 (\u0E42\u0E2D\u0E19\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07)",
    value: s.bankName,
    onChange: set('bankName')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35",
    value: s.bankAccount,
    onChange: set('bankAccount'),
    inputMode: "numeric"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "\u0E23\u0E31\u0E1A\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E17\u0E35\u0E48\u0E40\u0E04\u0E32\u0E19\u0E4C\u0E40\u0E15\u0E2D\u0E23\u0E4C",
    value: s.cashOn,
    onChange: set('cashOn'),
    options: [{
      value: 'on',
      label: 'เปิดใช้งาน'
    }, {
      value: 'off',
      label: 'ปิด'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E08\u0E38\u0E14\u0E23\u0E31\u0E1A\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14",
    value: s.cashPoint,
    onChange: set('cashPoint')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E27\u0E31\u0E19-\u0E40\u0E27\u0E25\u0E32\u0E17\u0E33\u0E01\u0E32\u0E23",
    value: s.cashHours,
    onChange: set('cashHours')
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center justify-content-between flex-wrap mt-3",
    style: {
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E02\u0E2D\u0E07\u0E40\u0E17\u0E28\u0E1A\u0E32\u0E25\u0E41\u0E25\u0E30\u0E17\u0E14\u0E25\u0E2D\u0E07 QR \u0E01\u0E31\u0E1A\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23\u0E41\u0E25\u0E49\u0E27",
    checked: s.verified,
    onChange: set('verified')
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    icon: "fas fa-qrcode",
    onClick: () => setPreview(true)
  }, "\u0E17\u0E14\u0E25\u0E2D\u0E07 QR (1.00 \u0E1A\u0E32\u0E17)"))), /*#__PURE__*/React.createElement(Card, {
    title: "LINE OA \u0E41\u0E25\u0E30 LINE Login",
    icon: "fab fa-line"
  }, /*#__PURE__*/React.createElement("div", {
    style: grid
  }, /*#__PURE__*/React.createElement(Input, {
    label: "LINE Login Channel ID",
    value: s.lineChannelId,
    onChange: set('lineChannelId')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "LINE OA URL \u0E40\u0E0A\u0E48\u0E19 https://lin.ee/...",
    value: s.lineOaUrl,
    onChange: set('lineOaUrl')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "LINE Login Channel Secret (\u0E40\u0E27\u0E49\u0E19\u0E27\u0E48\u0E32\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E07\u0E40\u0E14\u0E34\u0E21)",
    type: "password",
    value: s.lineSecret,
    onChange: set('lineSecret')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Messaging API Channel Access Token (\u0E40\u0E27\u0E49\u0E19\u0E27\u0E48\u0E32\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E07\u0E40\u0E14\u0E34\u0E21)",
    type: "password",
    value: s.lineToken,
    onChange: set('lineToken')
  })), /*#__PURE__*/React.createElement("div", {
    className: "small text-muted mt-3"
  }, "LINE Login \u0E41\u0E25\u0E30 Messaging API \u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19 Provider \u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19 \u0E43\u0E0A\u0E49 Web App URL \u0E40\u0E1B\u0E47\u0E19 Callback URL \u0E02\u0E2D\u0E07 LINE Login \u0E40\u0E1B\u0E34\u0E14 scope: openid profile \u0E41\u0E25\u0E30\u0E43\u0E2B\u0E49\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 OA"), /*#__PURE__*/React.createElement("div", {
    className: "small mt-2 d-flex flex-wrap",
    style: {
      gap: 8
    }
  }, "Messaging token: ", /*#__PURE__*/React.createElement(StatusBadge, {
    status: s.lineToken ? 'paid' : 'other',
    label: s.lineToken ? 'ตั้งค่าแล้ว' : 'ยังไม่ตั้งค่า'
  }), " Login secret: ", /*#__PURE__*/React.createElement(StatusBadge, {
    status: s.lineSecret ? 'paid' : 'other',
    label: s.lineSecret ? 'ตั้งค่าแล้ว' : 'ยังไม่ตั้งค่า'
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Licenses \u0E41\u0E25\u0E30 Payments",
    icon: "fas fa-table",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: "fas fa-sync-alt",
      onClick: () => setMsg({
        tone: 'success',
        title: 'อ่านหัวคอลัมน์สำเร็จ',
        text: 'พบชีต Licenses และ Payments ในไฟล์ต้นทาง'
      })
    }, "\u0E2D\u0E48\u0E32\u0E19\u0E2B\u0E31\u0E27\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C\u0E15\u0E49\u0E19\u0E17\u0E32\u0E07")
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Spreadsheet ID \u0E15\u0E49\u0E19\u0E17\u0E32\u0E07",
    value: s.sheetId,
    onChange: set('sheetId')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...grid,
      marginTop: 18
    }
  }, [['licensesMap', 'Licenses mapping'], ['paymentsMap', 'Payments mapping']].map(([k, l]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label fw-bold"
  }, l, " ", /*#__PURE__*/React.createElement("span", {
    className: "fw-normal text-muted"
  }, "(JSON: \u0E0A\u0E37\u0E48\u0E2D\u0E1F\u0E34\u0E25\u0E14\u0E4C\u0E23\u0E30\u0E1A\u0E1A \u2192 \u0E2B\u0E31\u0E27\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C\u0E08\u0E23\u0E34\u0E07)")), /*#__PURE__*/React.createElement("textarea", {
    className: 'form-control' + (validJson(s[k]) ? '' : ' is-invalid'),
    rows: "9",
    value: s[k],
    onChange: set(k),
    spellCheck: "false",
    style: {
      fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
      fontSize: 14
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setS(PP.load())
  }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
    icon: "fas fa-save",
    onClick: save
  }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32"))), /*#__PURE__*/React.createElement(AppModal, {
    open: preview,
    onClose: () => setPreview(false),
    icon: "fas fa-qrcode",
    title: "\u0E17\u0E14\u0E25\u0E2D\u0E07 QR 1.00 \u0E1A\u0E32\u0E17",
    centeredBody: true
  }, testPayload ? /*#__PURE__*/React.createElement("img", {
    src: PP.imageUrl(testPayload),
    width: "200",
    height: "200",
    alt: "QR \u0E17\u0E14\u0E25\u0E2D\u0E07"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, "\u0E01\u0E23\u0E2D\u0E01 PromptPay ID \u0E2B\u0E23\u0E37\u0E2D Biller ID \u0E01\u0E48\u0E2D\u0E19"), /*#__PURE__*/React.createElement("div", {
    className: "small text-muted mt-3"
  }, "\u0E2A\u0E41\u0E01\u0E19\u0E41\u0E25\u0E49\u0E27\u0E15\u0E23\u0E27\u0E08\u0E27\u0E48\u0E32\u0E41\u0E2D\u0E1B\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A \u201C", s.accountName, "\u201D")), /*#__PURE__*/React.createElement(AppModal, {
    open: !!msg,
    onClose: () => setMsg(null),
    tone: msg && msg.tone,
    icon: msg && msg.tone === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle',
    title: msg && msg.title,
    centeredBody: true
  }, msg && msg.text));
}
Object.assign(window, {
  Settings
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/Settings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/Staff.jsx
try { (() => {
function Notifications({
  year,
  setYear
}) {
  const [v, setV] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    right: /*#__PURE__*/React.createElement(Select, {
      options: DK.YEARS,
      value: year,
      onChange: e => setYear(e.target.value)
    })
  }), /*#__PURE__*/React.createElement(Card, {
    title: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19",
    icon: "fas fa-bell",
    padding: "20px 20px 8px"
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: DK.NOTIFS,
    columns: [{
      key: 't',
      title: 'ผู้รับ / เรื่อง',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "fw-medium"
      }, r.to), /*#__PURE__*/React.createElement("small", {
        className: "text-muted"
      }, r.subject))
    }, {
      key: 'd',
      title: 'รายละเอียด',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "small"
      }, r.detail)
    }, {
      key: 's',
      title: 'สถานะ',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status,
        label: r.label
      })
    }, {
      key: 'x',
      title: '',
      align: 'end',
      render: r => /*#__PURE__*/React.createElement(IconButton, {
        icon: "fas fa-eye",
        title: "\u0E14\u0E39\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14",
        onClick: () => setV(r)
      })
    }]
  })), /*#__PURE__*/React.createElement(AppModal, {
    open: !!v,
    onClose: () => setV(null),
    icon: "fab fa-line",
    title: "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19"
  }, v ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KV, {
    k: "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A",
    v: v.to
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07",
    v: v.subject
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E48\u0E07",
    v: DK.thDate(v.date)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E0A\u0E48\u0E2D\u0E07\u0E17\u0E32\u0E07",
    v: "LINE OA"
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E2A\u0E16\u0E32\u0E19\u0E30",
    v: /*#__PURE__*/React.createElement(StatusBadge, {
      status: v.status,
      label: v.label
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-3 rounded-3",
    style: {
      background: 'var(--blue-50)'
    }
  }, v.detail)) : null));
}
function Transactions({
  year,
  setYear,
  role
}) {
  const [list, setList] = React.useState(DK.TXNS);
  const [v, setV] = React.useState(null);
  const [msg, setMsg] = React.useState(null);
  const canConfirm = role === 'finance';
  const [cash, setCash] = React.useState(null);
  const [edit, setEdit] = React.useState(null);
  const saveEdit = () => {
    if (!edit.detail.trim() || !(Number(edit.amount) > 0)) return setEdit({
      ...edit,
      err: 'กรุณากรอกรายละเอียดและยอดชำระให้ถูกต้อง'
    });
    const {
      err,
      ...t
    } = edit;
    setList(list.map(x => x.id === t.id ? {
      ...t,
      amount: Number(t.amount)
    } : x));
    setEdit(null);
    setMsg({
      text: 'แก้ไขรายการ ' + t.id + ' เรียบร้อยแล้ว',
      tone: 'success'
    });
  };
  const payers = DK.TAXPAYERS.map(p => ({
    value: p.id,
    label: p.name + ' (' + p.id + ')'
  }));
  const itemsOf = id => DK.rows(DK.CUR_YEAR).filter(r => r.p.id === id && r.status !== 'paid').map(r => ({
    value: r.id,
    label: r.label + ' ปี ' + DK.CUR_YEAR + ' · ' + DK.money(r.total) + ' บาท',
    detail: r.label + ' ปี ' + DK.CUR_YEAR,
    amount: Math.round(r.total * 100) / 100
  }));
  const cashFor = (payer, base) => {
    const its = itemsOf(payer);
    const f = its[0];
    return {
      ...base,
      payer,
      items: its,
      item: f ? f.value : 'custom',
      detail: f ? f.detail : '',
      amount: f ? String(f.amount) : '',
      err: ''
    };
  };
  const openCash = () => setCash(cashFor(payers[0].value, {
    receipt: '',
    date: DK.TODAY.toISOString().slice(0, 10)
  }));
  const pickItem = v => {
    const it = cash.items.find(i => i.value === v);
    setCash({
      ...cash,
      item: v,
      detail: it ? it.detail : '',
      amount: it ? String(it.amount) : ''
    });
  };
  const saveCash = () => {
    if (!cash.detail.trim() || !(Number(cash.amount) > 0) || !cash.receipt.trim()) return setCash({
      ...cash,
      err: 'กรุณากรอกรายการ ยอดเงิน และเลขที่ใบเสร็จให้ครบ'
    });
    const p = DK.TAXPAYERS.find(t => t.id === cash.payer);
    const id = 'TXN-' + cash.date.slice(2, 4).replace(/^\d\d/, String(Number(cash.date.slice(0, 4)) + 543).slice(2)) + cash.date.slice(5, 7) + cash.date.slice(8, 10) + '-' + String(list.length + 1).padStart(4, '0');
    setList([{
      id,
      payer: p.name,
      detail: cash.detail,
      amount: Number(cash.amount),
      date: cash.date,
      method: 'เงินสด',
      slip: 'ใบเสร็จเลขที่ ' + cash.receipt,
      status: canConfirm ? 'paid' : 'review'
    }, ...list]);
    setCash(null);
    setMsg({
      text: canConfirm ? 'บันทึกรับเงินสดและยืนยันการชำระแล้ว' : 'บันทึกรับเงินสดแล้ว รอเจ้าหน้าที่การเงินยืนยัน',
      tone: 'success'
    });
  };
  const mIcon = m => m === 'เงินสด' ? 'fas fa-money-bill-wave' : m === 'QR PromptPay' ? 'fas fa-qrcode' : 'fas fa-university';
  const update = (status, text, tone) => {
    setList(list.map(t => t.id === v.id ? {
      ...t,
      status
    } : t));
    setV(null);
    setMsg({
      text,
      tone
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    right: /*#__PURE__*/React.createElement(Select, {
      options: DK.YEARS,
      value: year,
      onChange: e => setYear(e.target.value)
    })
  }), /*#__PURE__*/React.createElement(Card, {
    title: "\u0E18\u0E38\u0E23\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19",
    icon: "fas fa-exchange-alt",
    padding: "20px 20px 8px",
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "success",
      icon: "fas fa-money-bill-wave",
      onClick: openCash
    }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14")
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: list,
    columns: [{
      key: 'id',
      title: 'เลขรายการ',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "fw-medium",
        style: {
          color: 'var(--primary)'
        }
      }, r.id)
    }, {
      key: 'd',
      title: 'รายละเอียด',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, r.payer), /*#__PURE__*/React.createElement("small", {
        className: "text-muted"
      }, r.detail, " \xB7 ", DK.money(r.amount), " \u0E1A\u0E32\u0E17"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", {
        className: "text-muted"
      }, /*#__PURE__*/React.createElement("i", {
        className: mIcon(r.method) + ' me-1'
      }), r.method)))
    }, {
      key: 's',
      title: 'สถานะ',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status,
        label: r.status === 'other' ? 'ยกเลิก' : undefined
      })
    }, {
      key: 'x',
      title: '',
      align: 'end',
      render: r => /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        icon: "fas fa-eye",
        onClick: () => setV(r)
      }, "\u0E14\u0E39\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14")
    }]
  })), /*#__PURE__*/React.createElement(AppModal, {
    open: !!v,
    onClose: () => setV(null),
    icon: "fas fa-exchange-alt",
    title: v ? v.id : '',
    size: "lg",
    footer: v ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      icon: "fas fa-times",
      onClick: () => update('other', 'ยกเลิกรายการเรียบร้อยแล้ว', 'danger')
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "fas fa-pen",
      disabled: v.status === 'paid' && !canConfirm,
      title: v.status === 'paid' && !canConfirm ? 'รายการที่ยืนยันแล้ว แก้ไขได้เฉพาะเจ้าหน้าที่การเงิน' : '',
      onClick: () => {
        setEdit({
          ...v,
          amount: String(v.amount),
          err: ''
        });
        setV(null);
      }
    }, "\u0E41\u0E01\u0E49\u0E44\u0E02"), /*#__PURE__*/React.createElement(Button, {
      variant: "success",
      icon: "fas fa-check-circle",
      disabled: !canConfirm || v.status === 'paid',
      title: canConfirm ? '' : 'เฉพาะเจ้าหน้าที่การเงิน',
      onClick: () => update('paid', 'ยืนยันการชำระเรียบร้อยแล้ว', 'success')
    }, "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30")) : null
  }, v ? /*#__PURE__*/React.createElement("div", {
    className: "row g-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-7"
  }, /*#__PURE__*/React.createElement(KV, {
    k: "\u0E1C\u0E39\u0E49\u0E0A\u0E33\u0E23\u0E30",
    v: v.payer
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14",
    v: v.detail
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
    v: DK.thDate(v.date)
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E27\u0E34\u0E18\u0E35\u0E0A\u0E33\u0E23\u0E30",
    v: v.method
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30",
    v: DK.money(v.amount) + ' บาท',
    strong: true,
    tone: "var(--primary)"
  }), /*#__PURE__*/React.createElement(KV, {
    k: "\u0E2A\u0E16\u0E32\u0E19\u0E30",
    v: /*#__PURE__*/React.createElement(StatusBadge, {
      status: v.status
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-md-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fw-bold mb-2"
  }, "\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30"), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column align-items-center justify-content-center rounded-3 text-muted",
    style: {
      height: 190,
      background: 'var(--gray-50)',
      border: '1px dashed var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: (v.method === 'เงินสด' ? 'fas fa-receipt' : 'fas fa-file-image') + ' fs-1 mb-2'
  }), /*#__PURE__*/React.createElement("small", null, v.slip))), !canConfirm ? /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alert alert-info py-2 small mb-0"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-info-circle me-1"
  }), "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19")) : null) : null), /*#__PURE__*/React.createElement(AppModal, {
    open: !!edit,
    onClose: () => setEdit(null),
    tone: "warning",
    icon: "fas fa-pen",
    title: edit ? 'แก้ไขรายการ ' + edit.id : '',
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setEdit(null)
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
      icon: "fas fa-save",
      onClick: saveEdit
    }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02"))
  }, edit ? /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column gap-3"
  }, edit.err ? /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger py-2 mb-0"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-exclamation-circle me-2"
  }), edit.err) : null, /*#__PURE__*/React.createElement(Input, {
    label: "\u0E1C\u0E39\u0E49\u0E0A\u0E33\u0E23\u0E30",
    value: edit.payer,
    disabled: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14",
    value: edit.detail,
    onChange: e => setEdit({
      ...edit,
      detail: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30 (\u0E1A\u0E32\u0E17)",
    type: "number",
    step: "0.01",
    value: edit.amount,
    onChange: e => setEdit({
      ...edit,
      amount: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
    type: "date",
    value: edit.date,
    onChange: e => setEdit({
      ...edit,
      date: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Select, {
    label: "\u0E27\u0E34\u0E18\u0E35\u0E0A\u0E33\u0E23\u0E30",
    options: ['QR PromptPay', 'โอนผ่านธนาคาร', 'เงินสด'],
    value: edit.method,
    onChange: e => setEdit({
      ...edit,
      method: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Input, {
    label: edit.method === 'เงินสด' ? 'เลขที่ใบเสร็จ / หลักฐาน' : 'ไฟล์หลักฐาน',
    value: edit.slip,
    onChange: e => setEdit({
      ...edit,
      slip: e.target.value
    })
  }), edit.method !== 'เงินสด' ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-label fw-bold"
  }, "\u0E41\u0E19\u0E1A\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E43\u0E2B\u0E21\u0E48 (\u0E16\u0E49\u0E32\u0E21\u0E35)"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*,.pdf",
    className: "form-control",
    onChange: e => e.target.files[0] && setEdit({
      ...edit,
      slip: e.target.files[0].name
    })
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-info-circle me-1"
  }), "\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19 \u0E43\u0E0A\u0E49\u0E1B\u0E38\u0E48\u0E21\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30\u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E43\u0E19\u0E2B\u0E19\u0E49\u0E32\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14")) : null), /*#__PURE__*/React.createElement(AppModal, {
    open: !!cash,
    onClose: () => setCash(null),
    tone: "success",
    icon: "fas fa-money-bill-wave",
    title: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setCash(null)
    }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement(Button, {
      variant: "success",
      icon: "fas fa-save",
      onClick: saveCash
    }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01"))
  }, cash ? /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column gap-3"
  }, cash.err ? /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger py-2 mb-0"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-exclamation-circle me-2"
  }), cash.err) : null, /*#__PURE__*/React.createElement(Select, {
    label: "\u0E1C\u0E39\u0E49\u0E0A\u0E33\u0E23\u0E30",
    options: payers,
    value: cash.payer,
    onChange: e => setCash(cashFor(e.target.value, cash))
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Select, {
    label: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E0A\u0E33\u0E23\u0E30",
    options: [...cash.items, {
      value: 'custom',
      label: 'อื่นๆ (ระบุเอง)'
    }],
    value: cash.item,
    onChange: e => pickItem(e.target.value)
  }), !cash.items.length ? /*#__PURE__*/React.createElement("div", {
    className: "form-text"
  }, "\u0E1C\u0E39\u0E49\u0E0A\u0E33\u0E23\u0E30\u0E23\u0E32\u0E22\u0E19\u0E35\u0E49\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30\u0E43\u0E19\u0E1B\u0E35 ", DK.CUR_YEAR) : null), cash.item === 'custom' ? /*#__PURE__*/React.createElement(Input, {
    label: "\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
    placeholder: "\u0E40\u0E0A\u0E48\u0E19 \u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E22\u0E30",
    value: cash.detail,
    onChange: e => setCash({
      ...cash,
      detail: e.target.value
    })
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19 (\u0E1A\u0E32\u0E17)",
    type: "number",
    step: "0.01",
    value: cash.amount,
    onChange: e => setCash({
      ...cash,
      amount: e.target.value
    }),
    hint: cash.item !== 'custom' && cash.items.find(i => i.value === cash.item) && Number(cash.amount) !== cash.items.find(i => i.value === cash.item).amount ? 'ยอดตามระบบ ' + DK.money(cash.items.find(i => i.value === cash.item).amount) + ' บาท' : 'ดึงยอดจากระบบ แก้ไขได้'
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E43\u0E1A\u0E40\u0E2A\u0E23\u0E47\u0E08",
    value: cash.receipt,
    onChange: e => setCash({
      ...cash,
      receipt: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19",
    type: "date",
    value: cash.date,
    onChange: e => setCash({
      ...cash,
      date: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "small text-muted"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-info-circle me-1"
  }), canConfirm ? 'เจ้าหน้าที่การเงินบันทึกแล้วยืนยันการชำระทันที' : 'รายการจะอยู่ในสถานะรอตรวจสอบ จนกว่าเจ้าหน้าที่การเงินยืนยัน')) : null), /*#__PURE__*/React.createElement(AppModal, {
    open: !!msg,
    onClose: () => setMsg(null),
    tone: msg && msg.tone,
    icon: "fas fa-bell",
    title: "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19",
    centeredBody: true
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, msg && msg.text)));
}
function Registrants() {
  const [list, setList] = React.useState(DK.REGISTRANTS);
  const [m, setM] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    title: "\u0E1C\u0E39\u0E49\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19",
    icon: "fas fa-user-check",
    padding: "20px 20px 8px"
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: list,
    columns: [{
      key: 'n',
      title: 'ชื่อ – นามสกุล / สถานประกอบการ',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "fw-medium"
      }, r.name), /*#__PURE__*/React.createElement("small", {
        className: "text-muted"
      }, r.taxId))
    }, {
      key: 'p',
      title: 'เบอร์โทรศัพท์',
      render: r => r.phone
    }, {
      key: 'd',
      title: 'วันที่ลงทะเบียน',
      render: r => DK.thDate(r.date)
    }, {
      key: 's',
      title: 'สถานะ',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status,
        label: r.status === 'paid' ? 'ยืนยันแล้ว' : 'รอยืนยัน'
      })
    }, {
      key: 'x',
      title: '',
      align: 'end',
      render: r => /*#__PURE__*/React.createElement("div", {
        className: "d-flex gap-1 justify-content-end"
      }, r.status !== 'paid' ? /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "success",
        icon: "fas fa-check",
        onClick: () => {
          setList(list.map(x => x.id === r.id ? {
            ...x,
            status: 'paid'
          } : x));
          setM({
            tone: 'success',
            t: 'ยืนยันบัญชี ' + r.name + ' เรียบร้อยแล้ว'
          });
        }
      }, "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19") : null, /*#__PURE__*/React.createElement(IconButton, {
        icon: "fas fa-pen",
        tone: "warning",
        title: "\u0E41\u0E01\u0E49\u0E44\u0E02",
        onClick: () => setM({
          tone: 'warning',
          t: 'เปิดแบบฟอร์มแก้ไข: ' + r.name
        })
      }), /*#__PURE__*/React.createElement(IconButton, {
        icon: "fas fa-trash",
        tone: "danger",
        title: "\u0E25\u0E1A",
        onClick: () => {
          setList(list.filter(x => x.id !== r.id));
          setM({
            tone: 'danger',
            t: 'ลบผู้ลงทะเบียนเรียบร้อยแล้ว'
          });
        }
      }))
    }]
  })), /*#__PURE__*/React.createElement(AppModal, {
    open: !!m,
    onClose: () => setM(null),
    tone: m && m.tone,
    icon: "fas fa-bell",
    title: "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19",
    centeredBody: true
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, m && m.t)));
}
Object.assign(window, {
  Notifications,
  Transactions,
  Registrants
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/Staff.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/data.js
try { (() => {
// Mock data + calculation rules for the DK One Tax Bill UI kit
(function () {
  // Thai fiscal year (ปีงบประมาณ) runs 1 Oct – 30 Sep: Oct–Dec belong to next BE year.
  const fiscalYear = (dt = new Date()) => dt.getFullYear() + 543 + (dt.getMonth() >= 9 ? 1 : 0);
  const TODAY = (() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  })();
  const ROLES = {
    citizen: 'ประชาชนทั่วไป (User)',
    revenue: 'เจ้าหน้าที่จัดเก็บรายได้',
    finance: 'เจ้าหน้าที่การเงิน',
    health: 'เจ้าหน้าที่สาธารณสุข',
    exec: 'ผู้บริหาร',
    admin: 'ผู้ดูแลระบบ (Admin)'
  };
  const ACCOUNTS = [{
    username: 'admin',
    password: 'admin1234',
    role: 'admin',
    name: 'ผู้ดูแลระบบ',
    phone: '053-000-000'
  }, {
    username: 'revenue',
    password: 'revenue1234',
    role: 'revenue',
    name: 'วรรณา จัดเก็บดี',
    phone: '053-000-101'
  }, {
    username: 'finance',
    password: 'finance1234',
    role: 'finance',
    name: 'สมศรี รักงาน',
    phone: '053-000-102'
  }, {
    username: 'health',
    password: 'health1234',
    role: 'health',
    name: 'ณัฐวัตร สุขภาพดี',
    phone: '053-000-103'
  }, {
    username: 'exec',
    password: 'exec1234',
    role: 'exec',
    name: 'ประเสริฐ บริหารเก่ง',
    phone: '053-000-104'
  }, {
    username: '3500100123456',
    password: 'user1234',
    role: 'citizen',
    name: 'สมชาย ใจดี',
    phone: '081-234-5678',
    taxId: '3500100123456'
  }];
  const TAXPAYERS = [{
    id: '3500100123456',
    name: 'สมชาย ใจดี',
    address: '88/1 ม.3 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่',
    phone: '081-234-5678',
    land: {
      assess: 2400,
      due: '2026-04-30',
      paid: null
    },
    sign: {
      assess: 1200,
      due: '2026-03-31',
      paid: '2026-03-20'
    },
    license: {
      no: 'สธ.123/2568',
      type: 'หนังสือรับรองการแจ้ง',
      expire: '2025-12-31',
      fee: 1000,
      years: 1
    },
    notified: false
  }, {
    id: '0505561000789',
    name: 'บริษัท ดอนแก้วค้าวัสดุ จำกัด',
    address: '199 ม.5 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่',
    phone: '053-121-212',
    land: {
      assess: 18500,
      due: '2026-04-30',
      paid: '2026-04-12'
    },
    sign: {
      assess: 7200,
      due: '2026-03-31',
      paid: '2026-03-28'
    },
    license: {
      no: 'กจ.045/2569',
      type: 'ใบอนุญาตประกอบกิจการ',
      expire: '2026-11-15',
      fee: 3000,
      years: 0
    },
    notified: true
  }, {
    id: '3501200456789',
    name: 'นางสาวมณี ศรีสุข',
    address: '12 ม.1 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่',
    phone: '089-765-4321',
    land: {
      assess: 1250,
      due: '2026-04-30',
      paid: null
    },
    sign: null,
    license: null,
    notified: true
  }, {
    id: '0503558000456',
    name: 'ร้านกาแฟบ้านสวน',
    address: '45/2 ม.7 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่',
    phone: '086-555-1188',
    land: null,
    sign: {
      assess: 800,
      due: '2026-03-31',
      paid: null
    },
    license: {
      no: 'สธ.210/2567',
      type: 'หนังสือรับรองการแจ้ง',
      expire: '2024-12-31',
      fee: 500,
      years: 2
    },
    notified: false
  }, {
    id: '3500900111222',
    name: 'นายประยุทธ มั่นคง',
    address: '7 ม.2 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่',
    phone: '084-333-2211',
    land: {
      assess: 5600,
      due: '2026-04-30',
      paid: '2026-09-30',
      review: true
    },
    sign: null,
    license: null,
    notified: false
  }, {
    id: '0505560001111',
    name: 'หจก. แม่ริมการช่าง',
    address: '301 ม.4 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่',
    phone: '053-888-999',
    land: {
      assess: 9800,
      due: '2026-04-30',
      paid: '2026-04-29'
    },
    sign: {
      assess: 3600,
      due: '2026-03-31',
      paid: null
    },
    license: {
      no: 'กจ.099/2569',
      type: 'ใบอนุญาตประกอบกิจการ',
      expire: '2026-10-20',
      fee: 2000,
      years: 0
    },
    notified: false
  }];

  // One taxpayer can hold many licenses: p.licenses = [{ no, type, expire, fee, years }]
  const EXTRA_LIC = {
    '0505561000789': {
      no: 'สธ.077/2569',
      type: 'ใบอนุญาตจำหน่ายอาหาร',
      expire: '2026-12-31',
      fee: 1500,
      years: 0
    },
    '0503558000456': {
      no: 'สธ.211/2568',
      type: 'ใบอนุญาตจำหน่ายอาหาร',
      expire: '2025-12-31',
      fee: 800,
      years: 1
    }
  };
  TAXPAYERS.forEach(p => {
    p.licenses = [p.license, EXTRA_LIC[p.id]].filter(Boolean);
    delete p.license;
  });
  // Per-fiscal-year data: p.byYear[year] = { land, sign, licenses }. p.land/sign/licenses mirror CUR_YEAR.
  const CUR_YEAR = String(fiscalYear(TODAY));
  const shiftY = (s, n) => s ? Number(s.slice(0, 4)) - n + s.slice(4) : s;
  // Sample data was authored for FY2569; move its dates so it always reads as the current fiscal year.
  const OFF = Number(CUR_YEAR) - 2569;
  if (OFF) TAXPAYERS.forEach(p => {
    ['land', 'sign'].forEach(k => {
      if (p[k]) p[k] = {
        ...p[k],
        due: shiftY(p[k].due, -OFF),
        paid: shiftY(p[k].paid, -OFF)
      };
    });
    p.licenses = p.licenses.map(l => ({
      ...l,
      expire: shiftY(l.expire, -OFF)
    }));
  });
  const PREV_YEAR = String(Number(CUR_YEAR) - 1);
  TAXPAYERS.forEach(p => {
    p.byYear = {
      [CUR_YEAR]: {
        land: p.land,
        sign: p.sign,
        licenses: p.licenses
      }
    };
    const prev = k => p[k] ? {
      ...p[k],
      due: shiftY(p[k].due, 1),
      paid: p[k].due ? shiftY(p[k].due, 1).slice(0, 8) + '15' : undefined,
      review: false
    } : null;
    p.byYear[PREV_YEAR] = {
      land: prev('land'),
      sign: prev('sign'),
      licenses: p.licenses.map(l => ({
        ...l,
        expire: shiftY(l.expire, 1),
        years: Math.max(0, l.years - 1)
      }))
    };
  });
  const view = (p, y = CUR_YEAR) => {
    const b = p.byYear[y] || {};
    return {
      ...p,
      land: b.land || null,
      sign: b.sign || null,
      licenses: b.licenses || [],
      src: p,
      year: y
    };
  };
  function saveYear(p, y, data) {
    p.byYear[y] = data;
    if (y === CUR_YEAR) Object.assign(p, data);
  }
  function addTaxpayer(info, y, data) {
    const p = {
      ...info,
      land: null,
      sign: null,
      licenses: [],
      notified: false,
      byYear: {}
    };
    saveYear(p, y, data);
    TAXPAYERS.unshift(p);
    return p;
  }
  const d = s => s ? new Date(s) : null;
  const thDate = s => s ? new Date(s).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : '-';
  const money = v => Number(v || 0).toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Land / signboard: penalty <15d 10%, >15d 20%, >1 month 40%; surcharge 1%/month (partial month = 1)
  function calcTax(t) {
    if (!t) return null;
    const ref = d(t.paid) || TODAY;
    const days = Math.max(0, Math.floor((ref - d(t.due)) / 86400000));
    const months = days > 0 ? Math.ceil(days / 30) : 0;
    const autoRate = days === 0 ? 0 : days < 15 ? 0.10 : days <= 30 ? 0.20 : 0.40;
    const rate = t.penaltyRate == null || t.penaltyRate === '' ? autoRate : Number(t.penaltyRate);
    const sRate = t.surchargeRate == null || t.surchargeRate === '' ? 0.01 : Number(t.surchargeRate);
    const penalty = Math.round(t.assess * rate * 100) / 100;
    const surcharge = Math.round(t.assess * sRate * months * 100) / 100;
    return {
      ...t,
      days,
      months,
      rate,
      autoRate,
      sRate,
      penalty,
      surcharge,
      total: Math.round((t.assess + penalty + surcharge) * 100) / 100
    };
  }
  // Signboard: due = notice date + 15 days. เงินเพิ่มชำระล่าช้า 1%/month (editable override), เงินเพิ่มยื่นแบบล่าช้า 0/5/10%, pay full / installment 1 (1/3) / custom.
  function calcSign(t) {
    if (!t) return null;
    const r2 = n => Math.round(n * 100) / 100;
    const due = t.noticeDate ? new Date(d(t.noticeDate).getTime() + 15 * 86400000).toISOString().slice(0, 10) : t.due;
    const ref = d(t.paid) || TODAY;
    const days = due ? Math.max(0, Math.floor((ref - d(due)) / 86400000)) : 0;
    const months = days > 0 ? Math.ceil(days / 30) : 0;
    const assess = Number(t.assess) || 0;
    const autoSurcharge = r2(assess * 0.01 * months);
    const surcharge = t.surchargeAmt == null || t.surchargeAmt === '' ? autoSurcharge : r2(Number(t.surchargeAmt) || 0);
    // Auto late-filing: ภ.ป.1 due 31 Mar of the tax year. Not filed (found by officer) → 10%; filed after deadline → 5%.
    const taxYear = (t.noticeDate || t.filedDate || TODAY.toISOString()).slice(0, 4);
    const fileDeadline = taxYear + '-03-31';
    const autoLateRate = t.notFiled ? 0.10 : t.filedDate && t.filedDate > fileDeadline ? 0.05 : 0;
    const lateAuto = t.lateFilingRate == null || t.lateFilingRate === '' || t.lateFilingRate === 'auto';
    const lateRate = lateAuto ? autoLateRate : Number(t.lateFilingRate) || 0;
    const lateFiling = r2(assess * lateRate);
    const total = r2(assess + surcharge + lateFiling);
    const payMode = t.payMode || 'full';
    const payAmount = payMode === 'inst1' ? r2(Math.ceil(total / 3 * 100) / 100) : payMode === 'custom' ? r2(Number(t.payAmount) || 0) : total;
    return {
      ...t,
      due,
      days,
      months,
      assess,
      autoSurcharge,
      surcharge,
      lateRate,
      lateAuto,
      autoLateRate,
      fileDeadline,
      lateFiling,
      penalty: 0,
      rate: 0,
      sRate: 0.01,
      payMode,
      payAmount,
      total
    };
  }
  // License: fine 20% of outstanding fee, only for หนังสือรับรองการแจ้ง
  function calcLicense(l) {
    if (!l) return null;
    const outstanding = l.fee * l.years;
    const fine = l.type === 'หนังสือรับรองการแจ้ง' ? outstanding * 0.2 : 0;
    return {
      ...l,
      outstanding,
      fine,
      total: outstanding + fine
    };
  }
  function statusOf(kind, t) {
    if (!t) return 'other';
    if (t.review) return 'review';
    if (kind === 'license') {
      if (t.years > 0) return 'overdue';
      const left = (d(t.expire) - TODAY) / 86400000;
      return left <= 45 ? 'expiring' : 'paid';
    }
    if (t.paid) return 'paid';
    return d(t.due) < TODAY ? 'overdue' : 'unpaid';
  }
  // Flatten to registry rows
  function rows(y = CUR_YEAR) {
    const out = [];
    TAXPAYERS.map(t => view(t, y)).forEach(p => {
      if (p.land) {
        const c = calcTax(p.land);
        out.push({
          id: p.id + '-L-' + y,
          kind: 'land',
          label: 'ภาษีที่ดินและสิ่งปลูกสร้าง',
          p,
          total: c.paid ? c.assess : c.total,
          due: p.land.due,
          paid: p.land.paidNoDate ? null : p.land.paid,
          status: statusOf('land', p.land)
        });
      }
      if (p.sign) {
        const c = calcSign(p.sign);
        out.push({
          id: p.id + '-S-' + y,
          kind: 'sign',
          label: 'ภาษีป้าย',
          p,
          total: c.paid ? c.assess : c.total,
          due: c.due,
          paid: p.sign.paidNoDate ? null : p.sign.paid,
          status: statusOf('sign', p.sign)
        });
      }
      p.licenses.forEach((l, i) => {
        const c = calcLicense(l);
        out.push({
          id: p.id + '-C' + i + '-' + y,
          kind: 'license',
          label: l.type + (l.no ? ' (' + l.no + ')' : ''),
          p,
          lic: l,
          total: c.total || c.fee,
          due: l.expire,
          paid: c.years === 0 ? '2025-11-02' : null,
          status: statusOf('license', l)
        });
      });
    });
    return out;
  }
  const HISTORY = [{
    id: 'PAY-690320-0012',
    detail: 'ภาษีป้าย ปี 2569',
    date: '2026-03-20',
    amount: 1200,
    method: 'QR PromptPay',
    status: 'paid',
    slip: 'slip-690320-0012.jpg'
  }, {
    id: 'PAY-681115-0087',
    detail: 'ภาษีที่ดินและสิ่งปลูกสร้าง ปี 2568',
    date: '2025-11-15',
    amount: 2640,
    method: 'QR PromptPay',
    status: 'paid',
    slip: 'slip-681115-0087.jpg'
  }, {
    id: 'PAY-680402-0031',
    detail: 'หนังสือรับรองการแจ้ง ปี 2568',
    date: '2025-04-02',
    amount: 1000,
    method: 'เงินสด',
    status: 'paid',
    slip: 'receipt-680402-0031.pdf'
  }];
  const NOTIFS = [{
    id: 1,
    to: 'สมชาย ใจดี',
    subject: 'แจ้งเตือนภาษีที่ดินเกินกำหนด',
    detail: 'ยอดค้างชำระ 3,600.00 บาท กรุณาชำระภายใน 31 ต.ค. 2569',
    status: 'paid',
    label: 'ส่งสำเร็จ',
    date: '2026-10-05'
  }, {
    id: 2,
    to: 'ร้านกาแฟบ้านสวน',
    subject: 'ใบอนุญาตค้างชำระ 2 ปี',
    detail: 'ค่าธรรมเนียมค้าง 1,000.00 บาท + ค่าปรับ 200.00 บาท',
    status: 'unpaid',
    label: 'รอส่ง',
    date: '2026-10-07'
  }, {
    id: 3,
    to: 'หจก. แม่ริมการช่าง',
    subject: 'ใบอนุญาตใกล้หมดอายุ',
    detail: 'ใบอนุญาต กจ.099/2569 หมดอายุ 20 ต.ค. 2569',
    status: 'review',
    label: 'อ่านแล้ว',
    date: '2026-10-01'
  }, {
    id: 4,
    to: 'นางสาวมณี ศรีสุข',
    subject: 'แจ้งเตือนภาษีที่ดินเกินกำหนด',
    detail: 'ผู้รับยังไม่เชื่อมต่อ LINE OA',
    status: 'overdue',
    label: 'ส่งไม่สำเร็จ',
    date: '2026-09-28'
  }];
  const TXNS = [{
    id: 'TXN-691007-0004',
    payer: 'นายประยุทธ มั่นคง',
    detail: 'ภาษีที่ดินและสิ่งปลูกสร้าง ปี 2569',
    amount: 8064,
    date: '2026-09-30',
    method: 'QR PromptPay',
    slip: 'slip-690930.jpg',
    status: 'review'
  }, {
    id: 'TXN-691006-0003',
    payer: 'สมชาย ใจดี',
    detail: 'ภาษีที่ดิน + หนังสือรับรองการแจ้ง',
    amount: 4560,
    date: '2026-10-06',
    method: 'QR PromptPay',
    slip: 'slip-691006.jpg',
    status: 'review'
  }, {
    id: 'TXN-690429-0002',
    payer: 'หจก. แม่ริมการช่าง',
    detail: 'ภาษีที่ดินและสิ่งปลูกสร้าง ปี 2569',
    amount: 9800,
    date: '2026-04-29',
    method: 'QR PromptPay',
    slip: 'slip-690429.jpg',
    status: 'paid'
  }, {
    id: 'TXN-690412-0001',
    payer: 'บริษัท ดอนแก้วค้าวัสดุ จำกัด',
    detail: 'ภาษีที่ดินและสิ่งปลูกสร้าง ปี 2569',
    amount: 18500,
    date: '2026-04-12',
    method: 'โอนผ่านธนาคาร',
    slip: 'slip-690412.pdf',
    status: 'paid'
  }];
  const REGISTRANTS = [{
    id: 1,
    taxId: '3501200456789',
    name: 'นางสาวมณี ศรีสุข',
    phone: '089-765-4321',
    date: '2026-10-07',
    status: 'review'
  }, {
    id: 2,
    taxId: '0503558000456',
    name: 'ร้านกาแฟบ้านสวน',
    phone: '086-555-1188',
    date: '2026-10-06',
    status: 'review'
  }, {
    id: 3,
    taxId: '3500100123456',
    name: 'สมชาย ใจดี',
    phone: '081-234-5678',
    date: '2026-09-12',
    status: 'paid'
  }];
  const YEARS = [0, 1, 2, 3].map(i => {
    const y = String(Number(CUR_YEAR) - i);
    return {
      value: y,
      label: 'ปีงบประมาณ ' + y + (i === 0 ? ' (ปัจจุบัน)' : '')
    };
  });
  window.DK = {
    TODAY,
    ROLES,
    ACCOUNTS,
    TAXPAYERS,
    HISTORY,
    NOTIFS,
    TXNS,
    REGISTRANTS,
    YEARS,
    calcTax,
    calcSign,
    calcLicense,
    statusOf,
    rows,
    view,
    saveYear,
    addTaxpayer,
    CUR_YEAR,
    fiscalYear,
    thDate,
    money
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/web-app/elaas.js
try { (() => {
// e-LAAS "รายละเอียดผู้ชำระภาษี (กค.1)" Excel importer — land & signboard.
// Layout: header block (ประเภทภาษี…, ประจำปีงบประมาณ พ.ศ. ####), header row with "ยอดประเมินภาษี",
// one row per taxpayer (col "ที่" = running no.), continuation rows (blank "ที่") = extra property of the previous taxpayer, final "รวม" row.
(function () {
  let libP = null;
  const loadLib = () => libP || (libP = window.XLSX ? Promise.resolve(window.XLSX) : new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
    s.onload = () => res(window.XLSX);
    s.onerror = () => rej(new Error('โหลดตัวอ่านไฟล์ Excel ไม่สำเร็จ (ต้องต่ออินเทอร์เน็ต)'));
    document.head.appendChild(s);
  }));
  const num = v => {
    const n = parseFloat(String(v || '').replace(/,/g, ''));
    return isNaN(n) ? 0 : n;
  };
  const r2 = n => Math.round(n * 100) / 100;
  async function parse(file) {
    const XLSX = await loadLib();
    const wb = XLSX.read(await file.arrayBuffer(), {
      type: 'array'
    });
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
      header: 1,
      raw: false,
      defval: ''
    });
    const flat = rows.slice(0, 15).map(r => r.join(' ')).join(' ');
    const type = /ภาษีป้าย/.test(flat) ? 'sign' : /ที่ดิน/.test(flat) ? 'land' : null;
    const ym = flat.match(/ปีงบประมาณ\s*พ\.?ศ\.?\s*(\d{4})/);
    const printed = (flat.match(/วันที่พิมพ์\s*:\s*([\d/]+\s*[\d:]*)/) || [])[1] || '';
    const hi = rows.findIndex(r => r.some(c => /ยอดประเมินภาษี/.test(c)));
    if (hi < 0) throw new Error('ไม่พบหัวตาราง "ยอดประเมินภาษี" — ไฟล์นี้ไม่ใช่รายงาน กค.1 จาก e-LAAS');
    const H = rows[hi].map(c => String(c).replace(/\s+/g, ''));
    const col = re => H.findIndex(h => re.test(h));
    const C = {
      no: col(/^ที่$/),
      id: col(/เลขประ/),
      name: col(/ชื่อ/),
      addr: col(/ที่อยู่/),
      kk2: col(/กค\.?2/),
      assess: col(/ยอดประเมิน/),
      paid: col(/ยอดชำระ/),
      bal: col(/คงเหลือ/),
      note: col(/หมายเหตุ/)
    };
    if (C.name < 0 || C.assess < 0) throw new Error('คอลัมน์ในไฟล์ไม่ครบ (ต้องมีชื่อ และยอดประเมินภาษี)');
    const records = [];
    let footer = null,
      cur = null;
    for (let i = hi + 1; i < rows.length; i++) {
      const r = rows[i],
        no = String(r[C.no] || '').trim();
      if (/^รวม/.test(no) || /^รวม/.test(String(r[C.no + 1] || ''))) {
        footer = {
          assess: num(r[C.assess]),
          paid: num(r[C.paid]),
          bal: num(r[C.bal])
        };
        continue;
      }
      const prop = {
        address: String(r[C.addr] || '').trim(),
        assess: num(r[C.assess]),
        paid: num(r[C.paid]),
        bal: num(r[C.bal]),
        note: C.note >= 0 ? String(r[C.note] || '').trim() : '',
        kk2: C.kk2 >= 0 ? String(r[C.kk2] || '').trim() : ''
      };
      if (/^\d+$/.test(no)) {
        cur = {
          no: +no,
          id: String(r[C.id] || '').replace(/\D/g, ''),
          name: String(r[C.name] || '').trim(),
          properties: [prop]
        };
        records.push(cur);
      } else if (cur && prop.address && (prop.assess || prop.paid)) cur.properties.push(prop);
    }
    records.forEach(rec => {
      rec.assess = r2(rec.properties.reduce((s, p) => s + p.assess, 0));
      rec.paid = r2(rec.properties.reduce((s, p) => s + p.paid, 0));
      rec.bal = r2(rec.properties.reduce((s, p) => s + p.bal, 0));
      rec.address = rec.properties[0].address;
    });
    const sum = k => r2(records.reduce((s, x) => s + x[k], 0));
    const totals = {
      assess: sum('assess'),
      paid: sum('paid'),
      bal: sum('bal')
    };
    const mismatch = footer && (Math.abs(footer.assess - totals.assess) > 0.05 || Math.abs(footer.bal - totals.bal) > 0.05);
    return {
      type,
      year: ym ? ym[1] : null,
      printed,
      records,
      totals,
      footer,
      mismatch,
      fileName: file.name
    };
  }
  const match = (rec, list) => rec.id && list.find(t => t.id === rec.id) || list.find(t => t.name.replace(/\s+/g, '') === rec.name.replace(/\s+/g, ''));
  function plan(res) {
    let add = 0,
      upd = 0;
    res.records.forEach(rec => match(rec, DK.TAXPAYERS) ? upd++ : add++);
    return {
      add,
      upd,
      noId: res.records.filter(r => !r.id).length,
      unpaid: res.records.filter(r => r.bal > 0).length
    };
  }
  function apply(res, type, year) {
    const ce = Number(year) - 543,
      due = ce + '-04-30';
    let add = 0,
      upd = 0;
    res.records.forEach(rec => {
      let p = match(rec, DK.TAXPAYERS);
      const item = {
        assess: rec.bal > 0 && rec.paid > 0 ? rec.bal : rec.assess,
        assessFull: rec.assess,
        paidAmount: rec.paid,
        balance: rec.bal,
        due,
        paid: rec.bal <= 0 ? due : null,
        paidNoDate: rec.bal <= 0,
        properties: rec.properties,
        source: 'e-LAAS ' + (res.printed || '')
      };
      if (p) {
        upd++;
        if (rec.id && !/^\d{13}$/.test(p.id)) p.id = rec.id;
        if (!p.address) p.address = rec.address;
        const cur = p.byYear && p.byYear[year] || {};
        p.byYear = p.byYear || {};
        DK.saveYear(p, year, {
          land: cur.land || null,
          sign: cur.sign || null,
          licenses: cur.licenses || [],
          [type]: item
        });
      } else {
        add++;
        DK.addTaxpayer({
          id: rec.id || 'NOID' + type.toUpperCase() + String(rec.no).padStart(5, '0'),
          name: rec.name,
          address: rec.address,
          phone: ''
        }, year, {
          land: null,
          sign: null,
          licenses: [],
          [type]: item
        });
      }
    });
    return {
      add,
      upd
    };
  }
  window.Elaas = {
    parse,
    plan,
    apply
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/elaas.js", error: String((e && e.message) || e) }); }

// ui_kits/web-app/notice.js
try { (() => {
// ใบแจ้งภาระภาษีและค่าธรรมเนียม — A4 print/PDF. window.printNotice(p) where p = DK.view(taxpayer, year)
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  })[c]);
  const abs = p => new URL(p, location.href).href;
  function row(k, v, cls) {
    return '<tr' + (cls ? ' class="' + cls + '"' : '') + '><td>' + k + '</td><td class="r">' + v + '</td></tr>';
  }
  function taxTable(title, t) {
    if (!t) return '';
    const c = DK.calcTax(t),
      m = DK.money;
    return '<div class="box"><h3>' + title + '</h3><table>' + (c.noticeNo ? row('หนังสือแจ้งการประเมินเลขที่', esc(c.noticeNo)) : '') + row('เงินภาษี', m(c.assess)) + row('วันที่ครบชำระ', DK.thDate(c.due)) + row('วันที่ชำระ', DK.thDate(c.paid)) + row('เกินกำหนด', c.days ? c.months + ' เดือน (' + c.days + ' วัน)' : '-') + row('เบี้ยปรับชำระล่าช้า' + (c.rate ? ' (' + c.rate * 100 + '%)' : ''), m(c.penalty)) + row('เงินเพิ่ม ' + c.sRate * 100 + '% × ' + c.months + ' เดือน', m(c.surcharge)) + row('รวมภาษี', m(c.total), 'tot') + '</table></div>';
  }
  function signTable(t) {
    if (!t) return '';
    const c = DK.calcSign(t),
      m = DK.money;
    return '<div class="box"><h3>ภาษีป้าย</h3><table>' + row('วันที่ได้รับการแจ้งประเมิน', DK.thDate(c.noticeDate)) + row('วันครบกำหนดชำระ', DK.thDate(c.due)) + row('วันที่ชำระ', DK.thDate(c.paid)) + row('เกินกำหนด', c.months + ' เดือน') + row('เงินภาษี', m(c.assess)) + row('เงินเพิ่มจากการชำระภาษีล่าช้า', m(c.surcharge)) + row('เงินเพิ่มจากการยื่นแบบล่าช้า' + (c.lateRate ? ' (' + c.lateRate * 100 + '%)' : ''), m(c.lateFiling)) + row('รวมเงินที่ต้องชำระทั้งสิ้น', m(c.total), 'tot') + (c.payMode !== 'full' ? row(c.payMode === 'inst1' ? 'ผ่อนชำระครั้งที่ 1' : 'ชำระตามจำนวนที่ระบุ', m(c.payAmount), 'tot') : '') + '</table></div>';
  }
  window.printNotice = function (p) {
    const m = DK.money,
      PP = window.PromptPay,
      cfg = PP ? PP.load() : {};
    const land = DK.calcTax(p.land),
      sign = DK.calcSign(p.sign),
      lics = (p.licenses || []).map(DK.calcLicense);
    const licTotal = lics.reduce((s, l) => s + l.total, 0);
    const grand = (land ? land.total : 0) + (sign ? sign.total : 0) + licTotal;
    const ref = 'DK' + p.id.slice(-6) + String(Math.round(grand * 100)).padStart(8, '0');
    const qr = PP && grand > 0 && PP.enabled(cfg) ? PP.imageUrl(PP.payload(grand, ref, p.id), 260) : '';
    const noticeNo = 'DK-' + p.year + '-' + p.id.slice(-5);
    const licHtml = lics.length ? '<div class="box full"><h3>ใบอนุญาต / ค่าธรรมเนียม (' + lics.length + ' ใบ)</h3><table class="grid"><thead><tr><th>เลขที่ / ประเภท</th><th>หมดอายุ</th><th class="r">ค่าธรรมเนียม</th><th class="r">ค้าง (ปี)</th><th class="r">ค้างชำระ</th><th class="r">ค่าปรับ</th><th class="r">รวม</th></tr></thead><tbody>' + lics.map(l => '<tr><td>' + esc(l.no) + '<br><small>' + esc(l.type) + '</small></td><td>' + DK.thDate(l.expire) + '</td><td class="r">' + m(l.fee) + '</td><td class="r">' + l.years + '</td><td class="r">' + m(l.outstanding) + '</td><td class="r">' + m(l.fine) + '</td><td class="r"><b>' + m(l.total) + '</b></td></tr>').join('') + '</tbody><tfoot><tr><td colspan="6">รวมค่าธรรมเนียม</td><td class="r">' + m(licTotal) + '</td></tr></tfoot></table></div>' : '';
    const html = `<!DOCTYPE html><html lang="th"><head><meta charset="UTF-8"><title>ใบแจ้ง ${esc(noticeNo)} - ${esc(p.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:18mm 14mm 14mm}
*{box-sizing:border-box}body{margin:0;font-family:'Prompt',sans-serif;font-size:10.5pt;color:#1d2735;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{max-width:186mm;margin:0 auto;padding:6mm 0}
.head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:3px solid #153e75;padding:4mm 0 10px}
.head img{height:15mm;max-width:105mm;object-fit:contain}
.head .t{text-align:right}.head h1{margin:0;font-size:15pt;color:#153e75}.head .t div{font-size:9.5pt;color:#55606e}
.meta{display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;background:#eef4fb;border-radius:6px;padding:10px 14px;margin:12px 0}
.meta b{font-weight:600}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.box{border:1px solid #cdd8e6;border-radius:6px;padding:8px 12px;break-inside:avoid}.box.full{grid-column:1/-1}
h3{margin:0 0 6px;font-size:11pt;color:#153e75}
table{width:100%;border-collapse:collapse}td,th{padding:3px 0;vertical-align:top}.r{text-align:right}
.box table td{border-bottom:1px dashed #dde4ee}.tot td{font-weight:700;color:#153e75;border-bottom:0!important}
.grid th{font-size:9pt;font-weight:600;color:#55606e;border-bottom:1px solid #cdd8e6;text-align:left;padding:4px 4px}.grid th.r{text-align:right}
.grid td{padding:4px;border-bottom:1px dashed #dde4ee}.grid tfoot td{font-weight:700;color:#153e75;border:0;padding-top:6px}
small{color:#55606e}
.sum{display:flex;justify-content:space-between;align-items:center;background:#153e75;color:#fff;border-radius:6px;padding:12px 16px;margin:12px 0}
.sum .v{font-size:18pt;font-weight:700}
.pay{display:grid;grid-template-columns:auto 1fr;gap:16px;border:1px solid #cdd8e6;border-radius:6px;padding:12px;break-inside:avoid}
.pay img{width:42mm;height:42mm}.pay h3{margin-bottom:4px}.pay p{margin:2px 0}
.foot{margin-top:14px;font-size:8.5pt;color:#55606e;display:flex;justify-content:space-between;gap:12px;border-top:1px solid #dde4ee;padding-top:6px}
.bar{position:sticky;top:0;background:#153e75;color:#fff;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.bar button{font:500 11pt 'Prompt',sans-serif;background:#fff;color:#153e75;border:0;border-radius:6px;padding:7px 16px;cursor:pointer}
@media print{.bar{display:none}.page{padding:4mm 0 0}}
</style></head><body>
<div class="bar"><span>ใบแจ้งพร้อมแล้ว — เลือกปลายทาง “บันทึกเป็น PDF” ในหน้าต่างพิมพ์</span><button onclick="print()">บันทึกเป็น PDF / พิมพ์</button></div>
<div class="page">
<div class="head"><img src="${abs('../../assets/logo-long.png')}" alt=""><div class="t"><h1>ใบแจ้งภาระภาษีและค่าธรรมเนียม</h1><div>เทศบาลเมืองดอนแก้ว · DK One Tax Bill</div><div>เลขที่ ${esc(noticeNo)} · ปีงบประมาณ ${esc(p.year)}</div><div>ออก ณ วันที่ ${DK.thDate(DK.TODAY)}</div></div></div>
<div class="meta"><div>ชื่อ-นามสกุล / ชื่อสถานประกอบการ: <b>${esc(p.name)}</b></div><div>เลขที่เสียภาษี: <b>${esc(p.id)}</b></div><div>ที่อยู่: ${esc(p.address)}</div><div>เบอร์โทร: ${esc(p.phone)}</div></div>
<div class="cols">${taxTable('ภาษีที่ดินและสิ่งปลูกสร้าง', p.land)}${signTable(p.sign)}${licHtml}</div>
<div class="sum"><span>ยอดภาษีและค่าธรรมเนียมทั้งหมด</span><span class="v">${m(grand)} บาท</span></div>
<div class="pay">${qr ? '<img src="' + qr + '" alt="QR">' : ''}<div><h3>ช่องทางการชำระ</h3>
${qr ? '<p><b>สแกน QR พร้อมเพย์</b> ผู้รับเงิน ' + esc(cfg.accountName) + ' (ยอดเงินกรอกให้อัตโนมัติ)</p>' : ''}
${cfg.bankAccount ? '<p><b>โอนเงิน</b> ' + esc(cfg.bankName) + ' เลขที่ ' + esc(PP.fmtAcct(cfg.bankAccount)) + ' ชื่อบัญชี ' + esc(cfg.accountName) + '</p>' : ''}
${cfg.cashOn !== 'off' ? '<p><b>เงินสด</b> ' + esc(cfg.cashPoint) + ' · ' + esc(cfg.cashHours) + '</p>' : ''}
<p>เลขอ้างอิง <b>${ref}</b></p><p><small>ยอดคำนวณ ณ วันที่ออกใบแจ้ง หากชำระหลังวันครบกำหนด เบี้ยปรับและเงินเพิ่มจะคิดตามวันที่ชำระจริง</small></p></div></div>
<div class="foot"><span>เอกสารนี้ออกโดยระบบ DK One Tax Bill เทศบาลเมืองดอนแก้ว</span><span>${esc(noticeNo)}</span></div>
</div>
<script>Promise.all([document.fonts.ready].concat([].map.call(document.images,function(i){return i.complete?0:new Promise(function(r){i.onload=i.onerror=r})}))).then(function(){setTimeout(function(){print()},300)});<\/script>
</body></html>`;
    const w = window.open('', '_blank');
    if (!w) return false;
    w.document.open();
    w.document.write(html);
    w.document.close();
    return true;
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/notice.js", error: String((e && e.message) || e) }); }

// ui_kits/web-app/promptpay.js
try { (() => {
// Payment config + Thai QR payload builder (PromptPay tag 29 / Bill Payment tag 30, EMVCo + CRC16).
// Values are editable in หน้า ตั้งค่าระบบ (saved to localStorage 'dk_settings').
(function () {
  const DEFAULTS = {
    online: 'on',
    qrType: 'promptpay',
    accountName: 'เทศบาลเมืองดอนแก้ว',
    promptpayId: '0994000424621',
    billerId: '',
    expiryDays: 30,
    verified: false,
    cashOn: 'on',
    cashPoint: 'กองคลัง ชั้น 1 สำนักงานเทศบาลเมืองดอนแก้ว',
    cashHours: 'จันทร์–ศุกร์ 08:30–16:30 น. (เว้นวันหยุดราชการ)',
    bankName: 'ธนาคารกรุงไทย',
    bankShort: 'KTB',
    bankAccount: '9801192712',
    lineChannelId: '',
    lineOaUrl: '',
    lineSecret: '',
    lineToken: '',
    sheetId: '1W4PxRNkWAKHoJ5RXwL697qxYcicsMRN4VLoX0I9Jtfo',
    licensesMap: '{\n  "TaxID": "เลขประจำตัวประชาชน",\n  "Name": "ชื่อ-สกุล",\n  "Reference": "LicenseNo",\n  "FiscalYear": "IssueDate",\n  "Principal": "จำนวนเงิน",\n  "DueDate": "ExpireDate",\n  "Address": "ที่อยู่",\n  "Phone": "เบอร์โทร"\n}',
    paymentsMap: '{\n  "Reference": "LicenseNo",\n  "PaidDate": "วันที่ชำระ",\n  "PaidAmount": "จำนวนเงินที่ชำระ",\n  "Receipt": "เลขที่ใบเสร็จ"\n}'
  };
  const load = () => {
    try {
      return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem('dk_settings') || '{}'));
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  };
  const save = s => localStorage.setItem('dk_settings', JSON.stringify(s));
  const f = (id, v) => id + String(v.length).padStart(2, '0') + v;
  function crc16(s) {
    let crc = 0xFFFF;
    for (let i = 0; i < s.length; i++) {
      crc ^= s.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) crc = crc & 0x8000 ? (crc << 1 ^ 0x1021) & 0xFFFF : crc << 1 & 0xFFFF;
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
  const clean = r => String(r || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
  function payload(amount, ref, ref2, cfg = load()) {
    let merchant;
    if (cfg.qrType === 'biller' && cfg.billerId) {
      merchant = f('30', f('00', 'A000000677010112') + f('01', cfg.billerId.replace(/\D/g, '')) + f('02', clean(ref) || 'DK') + (ref2 ? f('03', clean(ref2)) : ''));
    } else {
      const d = String(cfg.promptpayId || '').replace(/\D/g, '');
      if (!d) return '';
      const acct = d.length >= 13 ? f('02', d) : f('01', ('0000000000000' + d.replace(/^0/, '66')).slice(-13));
      merchant = f('29', f('00', 'A000000677010111') + acct);
    }
    let p = f('00', '01') + f('01', amount ? '12' : '11') + merchant + f('53', '764') + f('58', 'TH');
    if (amount) p += f('54', Number(amount).toFixed(2));
    if (cfg.qrType !== 'biller' && ref) p += f('62', f('05', clean(ref)));
    p += '6304';
    return p + crc16(p);
  }
  const enabled = (cfg = load()) => cfg.online === 'on' && (cfg.qrType === 'biller' ? !!cfg.billerId : !!cfg.promptpayId);
  const fmtAcct = a => {
    const d = String(a || '').replace(/\D/g, '');
    return d.length === 10 ? d.slice(0, 3) + '-' + d[3] + '-' + d.slice(4, 9) + '-' + d[9] : a;
  };
  const imageUrl = (data, size = 220) => 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&margin=8&ecc=M&data=' + encodeURIComponent(data);
  window.PromptPay = {
    DEFAULTS,
    load,
    save,
    payload,
    enabled,
    fmtAcct,
    imageUrl
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/promptpay.js", error: String((e && e.message) || e) }); }

__ds_ns.LOGO_URL = __ds_scope.LOGO_URL;

__ds_ns.SEAL_URL = __ds_scope.SEAL_URL;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.StatusFilter = __ds_scope.StatusFilter;

__ds_ns.AppModal = __ds_scope.AppModal;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.TopNavbar = __ds_scope.TopNavbar;

})();
