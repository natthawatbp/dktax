import * as React from 'react';
/**
 * Sticky white top bar: hamburger + current page title on the left; user name, role/status dot and avatar on the right. Avatar opens a profile card.
 * @startingPoint section="Navigation" subtitle="Top bar with profile popover" viewport="700x380"
 */
export interface TopNavbarUser {
  name: string;
  role: string;
  avatar?: string;
  online?: boolean;
  fields?: { label: string; value: React.ReactNode }[];
}
export interface TopNavbarProps {
  title: React.ReactNode;
  onToggle?: () => void;
  user: TopNavbarUser;
  onLogout?: () => void;
  extra?: React.ReactNode;
}
export function TopNavbar(props: TopNavbarProps): JSX.Element;
