// Function to convert a number to its Persian simple or ordinal text equivalent
export const numberToPersianText = (
  num: number,
  formatType: "simple" | "ordinal" = "ordinal"
) => {
  const units = [
    "",
    "یک",
    "دو",
    "سه",
    "چهار",
    "پنج",
    "شش",
    "هفت",
    "هشت",
    "نه",
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزدهم",
    "بیستم",
  ];
  const ordinals = [
    "",
    "اول",
    "دوم",
    "سوم",
    "چهارم",
    "پنجم",
    "ششم",
    "هفتم",
    "هشتم",
    "نهم",
    "دهم",
    "یازدهم",
    "دوازدهم",
    "سیزدهم",
    "چهاردهم",
    "پانزدهم",
    "شانزدهم",
    "هفدهم",
    "هجدهم",
    "نوزدهم",
    "بیستم",
  ];
  const tens = [
    "",
    "",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const hundreds = [
    "",
    "صد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];

  // Handle number 1 as a special case
  if (num === 1) return formatType === "ordinal" ? "اول" : "یک";

  // Handle numbers 2-20
  if (num <= 20) return formatType === "ordinal" ? ordinals[num] : units[num];

  // Handle tens (20-99)
  if (num < 100) {
    const tenPart = tens[Math.floor(num / 10)];
    const unitPart =
      formatType === "ordinal" ? ordinals[num % 10] : units[num % 10];
    return num % 10 === 0 ? `${tenPart}‌ام` : `${tenPart} و ${unitPart}`;
  }

  // Handle hundreds (100-999)
  if (num < 1000) {
    const hundredPart = hundreds[Math.floor(num / 100)];
    const remainder = num % 100;
    const remainderText:any =
      remainder > 0 ? ` و ${numberToPersianText(remainder, formatType)}` : "";
    return `${hundredPart}${remainderText}`;
  }

  // Fallback for numbers 1000 and above
  return num.toString();
};

// Function to generate week options dynamically, including Persian number text format and appended label
export const generateWeekOptions = ({
  maxWeek,
  appendedText = "هفته",
  valueType = "label",
  formatType = "ordinal",
}: {
  maxWeek: number;
  appendedText?: string;
  valueType?: "default" | "label";
  formatType?: "simple" | "ordinal";
}) =>
  Array.from({ length: maxWeek }, (_, i) => {
    const weekNumberText = numberToPersianText(i + 1, formatType);
    const label =
      formatType === "ordinal"
        ? `${appendedText} ${weekNumberText}` // Display "هفته اول"
        : `${weekNumberText} ${appendedText}`; // Display "اول هفته"
    return {
      label,
      value: valueType === "label" ? label : String(i + 1),
    };
  });

// Function to generate lesson week options with flexibility for ordinal or simple formats
export const generateLessonWeekOptions = (
  maxWeek: number,
  appendedText: string = "هفته",
  formatType: "simple" | "ordinal" = "ordinal"
) =>
  Array.from({ length: maxWeek }, (_, i) => {
    const weekNumberText = numberToPersianText(i + 1, formatType);
    const title =
      formatType === "ordinal"
        ? `${appendedText} ${weekNumberText}` // Display "هفته اول"
        : `${weekNumberText} ${appendedText}`; // Display "اول هفته"
    return {
      title,
      name: ``,
    };
  });
