import { useFormContext } from "./formContext.js";

export function useField(name: string) {
  const { values, errors, register } = useFormContext();

  return {
    value: values[name],
    error: errors[name],
    ...register(name),
  };
}
