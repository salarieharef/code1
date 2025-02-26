import numbersWordList from "./numbersWordList";
import { removeSeparators, rialToToman } from "./tools-function";

export interface NumberToWordsOptions {
  ordinal?: boolean;
  separator?: string; // Allowing custom separator (default "/")
}

type NumberToWordsType = (
  numberValue: number | string,
  options?: NumberToWordsOptions
) => string;

const numberToWords: NumberToWordsType = (numberValue, options = {}) => {
  // Extract separator or default to "/"
  const separator = options.separator || "/";

  // Function to validate if the number is a valid integer
  const isNumberValid = (n: number) =>
    typeof n === "number" && Number.isSafeInteger(n) && n !== 0;

  // Convert numberValue to a valid number by removing separators
  const number = Number(
    typeof numberValue === "number"
      ? numberValue
      : removeSeparators(numberValue, separator)
  );

  // Convert Rial to Toman
  const toman = rialToToman(number);

  // Error handling for invalid number
  if (!isNumberValid(toman)) {
    return "Invalid number";
  }

  const getWord = (n: number) => numbersWordList[n] ?? "";
  const addNegativeSuffix = (str: string) => "منفی" + " " + str;

  // Recursive function to convert numbers into words
  function transformToWord(num: number): string {
    if (num === 0) return "";
    if (num <= 9)
      return getWord(num); // For single-digit numbers
    else if (num >= 11 && num <= 19) return getWord(num); // Special case for numbers between 11-19

    const residual = num <= 99 ? num % 10 : num % 100;
    return residual === 0
      ? getWord(num)
      : `${getWord(num - residual)} و ${transformToWord(residual)}`;
  }

  // Handle large numbers and add unit names (thousand, million, etc.)
  function performer(num: number): string {
    if (num <= 999) return transformToWord(num);

    const getUnitName = (numberOfZeros: number) =>
      numberOfZeros === 0
        ? ""
        : numbersWordList[Number.parseInt(`1${"0".repeat(numberOfZeros)}`)];

    const separated = Number(num).toLocaleString().split(",");

    const numbersArr = separated
      .map((value, index) => {
        const { transformedVal, unitName } = Object.freeze({
          transformedVal: transformToWord(Number.parseInt(value, 10)), // Convert part to words
          unitName: getUnitName((separated.length - (index + 1)) * 3), // Get the unit name (thousand, million, etc.)
        });

        return transformedVal ? transformedVal + " " + unitName : "";
      })
      .filter((val) => val.length > 1);

    return numbersArr.join(" و ").trim(); // Join parts with " و " and return final result
  }

  const positiveNumber = Math.abs(toman);
  const handleResult = () => {
    if (toman === 0) return "صفر"; // Special case for zero
    const tmpResult = performer(positiveNumber); // Convert to words
    return tmpResult; // Return final result
  };

  return handleResult(); // Return the final result as a string
};

export default numberToWords;
