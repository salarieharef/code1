import React from "react";
import Dropzone, { FileRejection } from "react-dropzone";

type DropzoneWrapperProps = {
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
  maxSize?: number;
  accept: { [key: string]: string[] };
  children: React.ReactNode;
  className?: string;
};

const DropzoneWrapper: React.FC<DropzoneWrapperProps> = ({
  onDrop,
  maxSize,
  accept,
  children,
  className,
}) => {
  return (
    <Dropzone
      multiple={false}
      onDrop={onDrop}
      accept={accept}
      maxSize={maxSize}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className={className}>
          <input {...getInputProps()} />
          {children}
        </div>
      )}
    </Dropzone>
  );
};

export default DropzoneWrapper;
