export type TableData = {
  title: string;
  headers: string[];
  rows: (string | null)[][];
};

export interface SimpleTableProps {
  data: TableData;
}
export interface ContactDetails {
  label: string;
  value: string;
  phone?: string;
  email?: string;
}

export interface socialType {
  page_url: string;
  name: string;
  icon: any;
}

export interface contactProps {
  title: string;
  icon: any;
  description: string;
  phone?: string;
}
