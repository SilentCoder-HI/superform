import { useState, useCallback } from "react";
import type { Schema, Infer } from "../../core/src/types.js";

export function useForm<S extends Schema<any>>(schema: S) {
  type FormData = Infer<S>;
  const [values, setValues] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = (name: keyof FormData) => ({
    name,
    value: values[name] || "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }));
    },
  });

  const handleSubmit = useCallback(
    (onSubmit: (data: FormData) => void | Promise<void>) =>
      async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const result = await schema.validate(values);
        if (!result.success) {
          // Map errors from ValidationResult to state
          // For now, if it's a simple string error from an object validator, we try to parse it
          // In a real structured error system, this would be cleaner
          const firstError = Array.isArray(result.errors) ? result.errors[0] : result.errors;
          const errorMsg = typeof firstError === 'string' ? firstError : JSON.stringify(firstError);
          
          const [field, message] = errorMsg.includes(":") 
            ? errorMsg.split(":").map((s: string) => s.trim()) 
            : ["root", errorMsg];
            
            setErrors({ [field as string]: message || errorMsg });
          setIsSubmitting(false);
          return;
        }

        try {
          await onSubmit(result.data);
        } finally {

          setIsSubmitting(false);
        }
      },
    [schema, values]
  );

  return {
    register,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  };
}
