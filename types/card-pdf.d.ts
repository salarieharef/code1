export type UploadedFile = {
  size?: any;
  name: string;
  type: string;
  urlFile?: string;
};

export interface CardPdfProps {
  uploadedFile: UploadedFile | null;
}
