import * as React from 'react';
/** Bootstrap checkbox in Guardian Blue — multi-select bills to pay. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
