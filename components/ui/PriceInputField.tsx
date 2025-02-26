import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import numberToWords from "@/utils/persian-tools/numberToWords"; // Convert number to words
import {
  formatWithSeparator,
  removeSeparators,
  TomanToRial,
} from "@/utils/persian-tools/tools-function";
import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";

// Interface for props defining what the component expects
interface PriceInputFieldProps {
  name: string; // Name of the form field (e.g., 'price')
  form: any; // Form control object from react-hook-form
  readonly?: boolean; // Optional flag to make the input field read-only
  inputClassName?: string; // Optional custom class for the input field
  messageClassName?: string; // Optional custom class for the message (errors or info)
  separator?: string; // Optional separator character (e.g., "/", ",")
  separateAtDigit?: number; // Optional number of digits between separators (default: 3)
  isSpan?: string;
  isToman?: boolean; // Optional flag to convert Rial to Toman before converting to words
  unit?: string;
  wordClassName?: string;
  maxLength?: number;
}

const PriceInputField: React.FC<PriceInputFieldProps> = ({
  name = "price",
  form,
  readonly = false,
  inputClassName,
  messageClassName,
  separator = "/", // Default separator if none is provided
  separateAtDigit = 3, // Default to separate every 3 digits
  maxLength = 12,
  isSpan,
  isToman = false, // Default to false, so no conversion to Toman by default
  unit = "toman",
  wordClassName,
}) => {
  // Watch the value of the input field from the form context
  const priceInput = form.watch(name);

  const formatCurrency = (unit: string) => {
    switch (unit) {
      case "toman":
        return `تومان`;
      case "rial":
        return `ریال`;
      case "دلار":
        return `دلار`;
      case "دینار":
        return `دینار`;
      default:
        return ``;
    }
  };

  /**
   * Handle the input change
   * - Ensures only numeric characters are allowed.
   * - Formats the input value with the given separator.
   */
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selectionStart = input.selectionStart || 0;

    // Remove non-numeric characters
    let value = input.value.replace(/[^0-9]/g, "");

    // Format the value
    const formattedValue = formatWithSeparator(
      value,
      separator,
      separateAtDigit
    );

    // Update form value
    form.setValue(name, formattedValue);

    // Calculate new cursor position
    const newCursorPosition =
      selectionStart + (formattedValue.length - value.length);

    // Set new cursor position after formatting
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
      }
    }, 0);
  };

  /**
   * Remove the separators from the input value
   * Convert the cleaned string to a number
   */
  const priceWithoutSeparators = priceInput
    ? removeSeparators(String(priceInput), separator) // Remove separators based on the dynamic separator provided
    : "";
  let priceAsNumber: any = parseFloat(priceWithoutSeparators) || 0; // Parse the cleaned string as a number

  // If isToman is true, convert the price from Rial to Toman
  if (isToman) {
    priceAsNumber = TomanToRial(priceAsNumber);
  }

  /**
   * Convert the numeric price value to Persian words (in Toman)
   */
  const words = priceAsNumber ? numberToWords(priceAsNumber) : "";

  /**
   * Apply formatting when the component mounts or whenever the input value changes
   */
  useEffect(() => {
    if (priceInput) {
      const formattedValue = formatWithSeparator(
        priceInput,
        separator,
        separateAtDigit
      );
      if (formattedValue !== priceInput) {
        form.setValue(name, formattedValue); // Update the form value if the formatting has changed
      }
    }
  }, [priceInput, form, name, separator, separateAtDigit]); // Re-run if any of these dependencies change

  const Limit = separateAtDigit
    ? maxLength + Math.floor((maxLength - 1) / separateAtDigit)
    : maxLength;

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                ref={inputRef}
                id={name} // Use the name prop as the input id
                type='text' // Use text input since we are formatting numbers
                value={field.value} // Controlled component: value is managed by the form
                placeholder=''
                className={cn(
                  "my-1 block w-full rounded-md border-slate-300 bg-slate-50 leading-5", // Default styling for the input field
                  inputClassName // Apply custom input class if provided
                )}
                maxLength={Limit}
                disabled={readonly} // Disable the input if readonly prop is true
                onChange={handlePriceChange} // Handle input change to apply formatting
                isSpan={isSpan}
              />
            </FormControl>
            {!readonly ? <FormMessage className={cn(messageClassName)} /> : null}
            {/* Custom class for form message */}
          </FormItem>
        )}
      />
      {/* Conditionally render the price in words only if the numeric value is greater than 10 */}
      {priceAsNumber > 10 && (
        <div className='mt-2'>
          <p
            className={cn(
              `${readonly ? "text-muted-foreground" : "text-slate-600"}`, // Conditional styling based on readonly state
              wordClassName // Apply custom message class if provided
            )}
          >
            {words} {formatCurrency(unit)} {/* Display the price in words */}
          </p>
        </div>
      )}
    </>
  );
};

export default PriceInputField;
