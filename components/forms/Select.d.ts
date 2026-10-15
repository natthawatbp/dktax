import * as React from 'react';
/** Dropdown styled as Bootstrap form-select with a custom Prompt-font option list (scales with the page, unlike the native OS popup). Used for ปีงบประมาณ pickers and settings. onChange receives `{ target: { value } }`. */
export interface SelectProps {
  label?: string;
  options: Array<string | { value: string; label: string }>;
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string } }) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}
export function Select(props: SelectProps): JSX.Element;
