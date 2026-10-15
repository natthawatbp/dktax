import React from 'react';
const BUNDLE_SRC = (typeof document !== 'undefined' && ((document.currentScript && document.currentScript.src) || ((document.querySelector('script[src*="_ds_bundle.js"]') || {}).src))) || '';
const resolve = p => { try { return BUNDLE_SRC ? new URL(p, BUNDLE_SRC).href : p; } catch (e) { return p; } };
export const LOGO_URL = resolve('assets/logo-long.png');
export const SEAL_URL = 'https://cdn.imagetourls.com/uploads/tyImg/11jeXW6ac.png';
export function Logo({ variant = 'long', height, width, maxWidth = '100%', onDark = false, style }) {
  const [err, setErr] = React.useState(false);
  const long = variant === 'long';
  const h = height || (long ? undefined : 56);
  const w = width || (long && !height ? '100%' : undefined);
  if (err) return <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: onDark ? '#fff' : 'var(--primary)', fontSize: 18 }}>เทศบาลเมืองดอนแก้ว</span>;
  return <img src={long ? LOGO_URL : SEAL_URL} alt={long ? 'DK One Tax Bill — เทศบาลเมืองดอนแก้ว และหน่วยงานภาคี' : 'เทศบาลเมืองดอนแก้ว'} onError={() => setErr(true)} style={{ height: h, width: w, maxWidth, objectFit: 'contain', display: 'block', ...(onDark ? { background: '#fff', borderRadius: 8, padding: long ? '6px 8px' : '6px 10px' } : null), ...style }} />;
}
