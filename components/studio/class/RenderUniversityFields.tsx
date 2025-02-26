import AcademicBranchAutocomplete from "@/components/global/form/academic-branch-autocomplete";
import AcademicFieldMultiselector from "@/components/global/form/academic-field-multiselector";
import AcademicGroupMultiselector from "@/components/global/form/academic-group-multiselector";
import CollegeMultiselector from "@/components/global/form/college-multiselector";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";

const RenderUniversityFields = ({ disabled }: any) => {
  const form = useFormContext(); // Use the form context

  const section: string = form.watch("section");

  return (
    <>
      {section == "university" ? (
        <FormField
          control={form.control}
          name='is_college'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex gap-2 text-center'>
                تولید شده در دانشکدگان؟
                <span className='text-destructive'>*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  className='flex flex-row-reverse'
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  <Label
                    className='flex items-center gap-2 text-sm font-medium'
                    htmlFor='is-college-yes'
                  >
                    بله
                    <RadioGroupItem value='true' id='is-college-yes' />
                  </Label>
                  <Label
                    className='flex items-center gap-2 text-sm font-medium'
                    htmlFor='is-collage-no'
                  >
                    خیر
                    <RadioGroupItem value='false' />
                  </Label>
                  <div className='flex items-center gap-2 text-sm font-medium'></div>
                </RadioGroup>
              </FormControl>
              <FormMessage className='text-xs text-red-500' />
            </FormItem>
          )}
        />
      ) : null}

      {form.watch("is_college") === "true" && (
        <CollegeMultiselector disabled={disabled} required={true} />
      )}

      <AcademicBranchAutocomplete disabled={disabled} required={true} />
      <AcademicGroupMultiselector
        maxSelection={3}
        disabled={disabled}
        required={true}
      />
      <AcademicFieldMultiselector disabled={disabled} required={true} />
    </>
  );
};
export default RenderUniversityFields;
