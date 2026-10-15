import * as React from 'react';
/**
 * Summary card: muted label, big 2.2rem bold number, optional icon chip / progress. Clickable variant filters tables.
 * @startingPoint section="Data" subtitle="KPI summary cards" viewport="700x200"
 */
export interface StatCardProps {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  icon?: string;
  tone?: 'primary' | 'success' | 'warning' | 'orange' | 'danger' | 'info' | 'muted';
  sub?: React.ReactNode;
  /** 0–100, renders a thin bar */
  progress?: number;
  selected?: boolean;
  onClick?: () => void;
  /** "top" adds a 4px coloured top border (citizen summary style) */
  accent?: 'none' | 'top';
  /** 'tile' = white card, soft-tinted icon square + big number + label (dashboard). 'filled' = solid tone gradient, white text, faded watermark icon (dashboard KPIs). */
  variant?: 'default' | 'filled' | 'tile';
}
export function StatCard(props: StatCardProps): JSX.Element;
