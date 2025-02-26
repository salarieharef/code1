import { get, isEqual } from "lodash-es";
import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export function useHasChanges<T extends FieldValues>(
  methods: UseFormReturn<T>
) {
  const [hasChanges, setHasChanges] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // List of field names that should be ignored for change detection
  const ignoredFields = ["rules_accepted", "rules_agreed", "course_creation"];

  // useEffect(() => {
  //   const defaultValues = methods.getValues();

  //   const handleFieldChange = (value: any, { name }: { name?: any }) => {
  //     if (!name || isInitialLoad || ignoredFields.includes(name)) {
  //       return;
  //     }

  //     const currentValue = methods.getValues(name);
  //     const defaultValue = get(defaultValues, name);

  //     const hasFieldChanged = !isEqual(currentValue, defaultValue);

  //     if (hasFieldChanged) {
  //       console.log(
  //         `Field changed: ${name} Value:`,
  //         currentValue,
  //         defaultValue
  //       );
  //     }

  //     setHasChanges(hasFieldChanged);
  //   };

  //   const subscription = methods.watch(handleFieldChange);

  //   // Clean up subscription
  //   return () => subscription.unsubscribe();
  // }, [methods, isInitialLoad]);

  return { hasChanges, setHasChanges, setIsInitialLoad };
}
