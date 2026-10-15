The long partner-logo strip (default) for the top of the login card and sidebar header; `variant="seal"` for the round municipality seal.
```jsx
<Logo maxWidth={380} />            // fills width, keeps 2400×338 ratio
<Logo onDark />                    // on white plate inside blue sidebar header
<Logo variant="seal" height={56} />
```
The image has a white background (no transparency) — on blue surfaces always use `onDark`. Path resolves relative to `_ds_bundle.js` (project root → `assets/logo-long.png`). Falls back to the text "เทศบาลเมืองดอนแก้ว" if loading fails.
