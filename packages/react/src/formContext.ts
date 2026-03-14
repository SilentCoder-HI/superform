import { createContext, useContext } from "react";

export interface FormContextValue {
  values: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  errors: Record<string, string>;
  register: (name: string) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
