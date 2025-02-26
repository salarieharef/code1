const FileDataPrepare = (file: any, fileType?: string) => {
  const fileFormData = new FormData();
  if (typeof file !== "string") {
    fileFormData.append("title", file?.name);
    fileFormData.append("file", file);
    if (fileType) {
      fileFormData.append("file_type", fileType);
    }
    return fileFormData;
  }

  return null;
};

export { FileDataPrepare };
