export interface TableColumn {
  key: string;
  header: string;
  cell?: (row: any) => any;
  type?: 'text' | 'date' | 'currency' | 'template' | 'actions';
  templateRef?: string; // Key to match with the passed template
  sortable?: boolean;
}

export interface TableAction {
  action: string;
  row: any;
}

export interface PaginationConfig {
  pageSize: number;
  pageSizeOptions: number[];
  pageIndex: number;
  total: number;
}
