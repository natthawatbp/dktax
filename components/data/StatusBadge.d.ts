/** Pill status label. Six semantic states shared by tables, filters and dashboards. */
export interface StatusBadgeProps {
  status: 'paid' | 'unpaid' | 'expiring' | 'overdue' | 'review' | 'other';
  /** Override default Thai label */
  label?: string;
  icon?: boolean;
}
export function StatusBadge(props: StatusBadgeProps): JSX.Element;
