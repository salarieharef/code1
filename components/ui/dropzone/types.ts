import type { FileRejection } from "react-dropzone";

interface DropzoneStyleClasses {
  container?: string;
  dropzone?: string;
  preview?: string;
  previewContainer?: string;
  deleteButton?: string;
  progressBar?: string;
  icon?: string;
  instructions?: string;
  formControl?: string;
  formMessage?: string;
  imageCropper?: string;
  mediaStatus?: string;
}

export interface BaseDropzoneProps {
  name?: string;
  value?: File | File[] | null;
  onChange?: (files: File | File[] | null) => void;
  readOnly?: boolean;
  disabled?: boolean;
  styles?: DropzoneStyleClasses;
  placeholder?: string | React.ReactNode;
  icon?: React.ReactNode;
  fileType:
    | "video"
    | "image"
    | "pdf"
    | "text"
    | "document"
    | "media"
    | "all"
    | "spreadsheet";
  documentFormat?: "docx" | "pdf";
  maxFileSize?: number;
  multiple?: boolean;
  maxVideoDuration?: number;
  showProgressBar?: boolean;
  uploadTimeRemaining?: number;
  uploadSizeRemaining?: number;
  onUploadCancel?: () => void;
  onFileUpload?: (file: File) => void;
  onFileDelete?: () => void;
  enableImageCropper?: boolean;
  cropperAspectRatio?: number;
  cropperSizePresets?: { value: string; label: string }[];
  onCropperSizeChange?: (size: string) => void;
  showPreview?: boolean;
  acceptedFileTypes?: any;
  previewLayout?: "grid" | "table";
  showFileIcon?: boolean;
  gridColumnCount?: number;
  showDropzoneAfterPreview?: boolean;
  preserveExistingFiles?: boolean;
  dropzonePosition?: "before" | "after";
  showDeleteButton?: boolean;
  showFileName?: boolean;
  showFileSize?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
  canDropAgain?: boolean;
  canDropOnPreview?: boolean;
  showPreviewAsIcon?: boolean;
  mediaStatus?: "in_format" | "first_formatted" | "failed" | "uploaded";
}

export interface VideoDropzoneProps extends BaseDropzoneProps {
  fileType: "video";
  maxVideoDuration?: number;
  showProgressBar?: boolean;
  showVideoMetadata?: boolean;
  uploadTimeRemaining?: number;
  uploadSizeRemaining?: number;
  onUploadCancel?: () => void;
}

export interface ImageDropzoneProps extends BaseDropzoneProps {
  fileType: "video";
  showImageOverlay?: boolean;
  showImagePreview?: boolean;
  aspectRatio?: number;
  previewClassName?: string;
}

export interface PDFDropzoneProps extends BaseDropzoneProps {
  fileType: "pdf";
  showDeleteButton?: boolean;
  showFileMetadata?: boolean;
  previewContainerId?: string;
}

export interface DocumentDropzoneProps extends BaseDropzoneProps {
  fileType: "text";
  documentFormat?: "pdf" | "docx";
  metadataPlaceholder?: string;
}

export type DropzoneProps =
  | VideoDropzoneProps
  | ImageDropzoneProps
  | PDFDropzoneProps
  | DocumentDropzoneProps;

export interface FileValidationRules {
  maxFileSize?: number;
  acceptedFileTypes?: Record<string, string[]>;
  validateFileContent?: (file: File) => Promise<void>;
}

export interface DropzoneEventHandlers {
  onFilesDrop?: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
  onFileDelete?: () => void;
  onUploadCancel?: () => void;
}

export interface DropzoneState {
  isHovered?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
  errorMessage?: string;
}
