import * as React from 'react';
/**
 * Bootstrap 5 button in Guardian Blue. Font Awesome icon classes via `icon`.
 * @startingPoint section="Forms" subtitle="Primary / outline / LINE buttons" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary' | 'danger' | 'success' | 'line' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Font Awesome class, e.g. "fas fa-sign-in-alt" */
  icon?: string;
  iconRight?: string;
  /** Shows fa-spinner and disables */
  loading?: boolean;
  block?: boolean;
}
export function Button(props: ButtonProps): JSX.Element;
