/** Row of 7 colour-coded pill buttons that filter tables by payment status. */
export interface StatusFilterProps {
  value?: 'all' | 'paid' | 'unpaid' | 'expiring' | 'overdue' | 'review' | 'other';
  counts?: Partial<Record<string, number>>;
  onChange?: (key: string) => void;
}
export function StatusFilter(props: StatusFilterProps): JSX.Element;
