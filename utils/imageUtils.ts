export const getBaseUrl =
  process.env.NODE_ENV === "development" ? "https://hamito.me" : "";

// Generate a complete image URL with optional width, height, and blur parameters
export const getImageUrl = (
  path: string,
  width: number,
  height: number,
  blur: number = 0
): string => {
  if (!path || typeof path !== "string") {
    console.error("Invalid path provided:", path);
    return ""; // Return an empty string or handle this as needed
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const separator = normalizedPath.includes("?") ? "&" : "?";

  return `${getBaseUrl}${normalizedPath}${separator}w=${width}&h=${height}&blur=${blur}`;
};

// Generate the base image URL without additional parameters
export const getImageUrlBase = (path: string): string => {
  if (!path || typeof path !== "string") {
    // console.error("Invalid path provided:", path);
    return ""; // Return an empty string or handle this as needed
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBaseUrl}${normalizedPath}`;
};
