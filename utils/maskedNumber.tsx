export function maskString(
  input: string,
  options: {
    maskChar?: string;
    visibleStart?: number;
    visibleEnd?: number;
    separator?: string;
  } = {}
): string {
  const {
    maskChar = "*",
    visibleStart = 0,
    visibleEnd = 4,
    separator = "", // Default no separator
  } = options;

  if (input.length <= visibleStart + visibleEnd) {
    return input;
  }

  // Create the masked section with the desired mask character
  const maskedSection = maskChar.repeat(
    input.length - visibleStart - visibleEnd
  );

  return (
    input.slice(0, visibleStart) +
    separator +
    maskedSection +
    separator +
    input.slice(-visibleEnd)
  );
}

// // Usage examples
// const phoneNumber = "09361234567";
// const maskedNumber = maskString(phoneNumber, {
//   maskChar: "*", // Character used for masking
//   visibleStart: 3, // Show first 3 characters
//   visibleEnd: 4, // Show last 4 characters
//   separator: "-", // Use "-" as separator
// });

// console.log(maskedNumber); // Output: 093-****-4567
