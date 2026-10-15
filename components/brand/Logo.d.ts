import * as React from 'react';
/** Long partner-logo strip (MHESI · Thailand Rise Fund · สกสว · รวพ. · บพท · CMU · เทศบาลเมืองดอนแก้ว), self-hosted at assets/logo-long.png. variant="seal" = municipality seal (remote). onDark puts it on a white plate for blue headers. */
export interface LogoProps {
  variant?: 'long' | 'seal';
  /** Fixed height in px; long variant defaults to filling width instead */
  height?: number;
  width?: number | string;
  maxWidth?: number | string;
  onDark?: boolean;
  style?: React.CSSProperties;
}
export function Logo(props: LogoProps): JSX.Element;
export const LOGO_URL: string;
export const SEAL_URL: string;
