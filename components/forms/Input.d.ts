import * as React from 'react';
/**
 * Labelled Bootstrap text field. type="password" adds a show/hide eye toggle.
 * @startingPoint section="Forms" subtitle="Text + password fields" viewport="700x300"
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Leading Font Awesome icon */
  icon?: string;
  hint?: string;
  error?: string;
}
export function Input(props: InputProps): JSX.Element;
