export type CategorySidebarProps = {
    className?: string;
    loading?: boolean;
    onChange?: (categories: any) => void;
    onSubmit?: (categories: any, section?: any) => void;
    categories?: any;
    section?: any;
  };
  
  export type Tag = {
    id: string;
    text: string;
  };
  
  export interface Inputs {
    tags: Tag[];
    introducers: Tag[];
  }
  