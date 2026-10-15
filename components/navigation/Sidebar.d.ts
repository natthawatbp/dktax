/**
 * App sidebar: full-height blue gradient, long logo on white plate + "DK One Tax Bill / เทศบาลเมืองดอนแก้ว", white menu items; active = translucent white 10px-radius pill with light left edge. Footer tagline at bottom.
 * Collapses to a 96px icon rail (logo + labels + footer hidden) on desktop; becomes an off-canvas drawer with overlay on mobile (≤768px).
 * @startingPoint section="Navigation" subtitle="Collapsible sidebar menu" viewport="300x560"
 */
export interface SidebarItem {
  key: string;
  label: string;
  /** Font Awesome class */
  icon: string;
  badge?: number | string;
  tone?: 'default' | 'danger';
  /** Draw a separator above this item */
  divider?: boolean;
}
export interface SidebarProps {
  items: SidebarItem[];
  active?: string;
  onSelect?: (key: string) => void;
  collapsed?: boolean;
  isMobile?: boolean;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  /** Footer lines at the bottom (hidden in rail). Pass [] to hide. */
  footer?: string[];
}
export function Sidebar(props: SidebarProps): JSX.Element;
