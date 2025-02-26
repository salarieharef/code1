const ACCEPTED_FILE_TYPES = {
  video: {
    "video/mp4": [".mp4"],
    "video/mkv": [".mkv"],
    "video/quicktime": [".mov"],
    "video/x-msvideo": [".avi"],
    "video/webm": [".webm"],
  },
  image: {
    "image/jpeg": [".jpeg", ".jpg"],
    "image/png": [".png"],
    "image/gif": [".gif"],
    "image/webp": [".webp"],
    "image/svg+xml": [".svg"],
  },
  pdf: {
    "application/pdf": [".pdf"],
  },
  document: {
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/msword": [".doc"],
    "application/vnd.oasis.opendocument.text": [".odt"],
    "text/plain": [".txt"],
    "text/rtf": [".rtf"],
  },
  spreadsheet: {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "application/vnd.ms-excel": [".xls"],
    "text/csv": [".csv"],
  },
  audio: {
    "audio/mpeg": [".mp3"],
    "audio/wav": [".wav"],
    "audio/ogg": [".ogg"],
  },
  archive: {
    "application/zip": [".zip"],
    "application/x-rar-compressed": [".rar"],
  },
};

export { ACCEPTED_FILE_TYPES };
