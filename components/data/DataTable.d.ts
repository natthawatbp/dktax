import * as React from 'react';
/**
 * Bootstrap .table-hover with light header; columns declare render functions.
 * @startingPoint section="Data" subtitle="Registry table with status + actions" viewport="700x320"
 */
export interface DataTableColumn<T = any> {
  key: string;
  title: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  width?: number | string;
  render?: (row: T, index: number) => React.ReactNode;
}
export interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey?: string;
  empty?: React.ReactNode;
  footer?: React.ReactNode;
}
export function DataTable(props: DataTableProps): JSX.Element;
