// addOrdinalSuffix.ts

export const addOrdinalSuffix = (word: string): string => `${word}‌ام`; // add "ام"

export const removeSeparators = (
  str: string,
  separator: string = "/",
  pattern: string = ""
): string => {
  // Replace all instances of the separator ("/") with an empty string
  return str.replace(new RegExp(`\\${separator}`, "g"), pattern);
};

// rialToToman.ts

export const rialToToman = (rial: number): number => {
  return Math.floor(rial / 10); // Convert Rial to Toman by dividing by 10
};
export const TomanToRial = (rial: number): number => {
  return Math.floor(rial * 10); // Convert Rial to Toman by dividing by 10
};

// Helper function to format the number with slashes
// export const formatWith
export const formatWithSeparator = (
  value: string | number | null | undefined,
  separator: string = "/",
  separateAtDigit: number = 3
): string => {
  if (!value && value !== 0) return ""; // Handle null or undefined values
  return String(value).replace(
    new RegExp(`\\B(?=(\\d{${separateAtDigit}})+(?!\\d))`, "g"),
    separator
  ); // Convert to string and add separator every 'separateAtDigit' digits
};
