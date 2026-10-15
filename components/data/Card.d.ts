import * as React from 'react';
/** The "custom-card" surface: white, 12px radius, hairline #f0f0f0 border, whisper shadow. */
export interface CardProps {
  title?: React.ReactNode;
  icon?: string;
  actions?: React.ReactNode;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;
