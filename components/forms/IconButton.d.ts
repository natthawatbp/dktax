import * as React from 'react';
/** Square icon-only action used in table rows (ดู / แก้ไข / ลบ / แจ้ง LINE). */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  tone?: 'primary' | 'danger' | 'warning' | 'line' | 'muted';
  /** Filled state — e.g. LINE already notified */
  active?: boolean;
  title: string;
  size?: number;
}
export function IconButton(props: IconButtonProps): JSX.Element;
