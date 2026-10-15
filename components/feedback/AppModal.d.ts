import * as React from 'react';
/**
 * Bootstrap 5 modal with a solid coloured header. The ONLY way to show alerts/confirmations/forms — never window.alert.
 * @startingPoint section="Feedback" subtitle="Bootstrap modal alert" viewport="700x380"
 */
export interface AppModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  /** Font Awesome class for header icon */
  icon?: string;
  tone?: 'primary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Alert style: centred body + centred footer */
  centeredBody?: boolean;
  /** Custom footer; null hides it; undefined shows a single "ตกลง" button */
  footer?: React.ReactNode | null;
  children?: React.ReactNode;
}
export function AppModal(props: AppModalProps): JSX.Element | null;
