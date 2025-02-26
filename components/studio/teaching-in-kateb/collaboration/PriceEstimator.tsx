import { useFormContext } from "react-hook-form";
import PriceInputField from "../../../ui/PriceInputField";

interface PriceEstimatorProps {
  readonly?: boolean;
  name?: string;
}

const PriceEstimator: React.FC<PriceEstimatorProps> = ({
  readonly = false,
  name = "estimate_price",
}) => {
  const form = useFormContext();

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 items-center justify-center gap-1 md:grid-cols-2 md:gap-4'>
        <label
          htmlFor='price'
          className={`${readonly ? "font-normal text-muted-foreground" : "font-semibold text-slate-600"}`}
        >
          به‌نظر جنابعالی ارزش محتوای این درس چقدر می‌باشد؟ (برآورد قیمت)
        </label>
        <div>
          <PriceInputField
            isSpan='ریال'
            name={name}
            form={form}
            readonly={readonly}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceEstimator;
