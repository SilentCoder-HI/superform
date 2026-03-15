import * as react from 'react';

type ValidationResult<T> = {
    success: true;
    data: T;
    errors?: never;
} | {
    success: false;
    data?: never;
    errors: any;
};
interface Schema<T> {
    validate(value: any): Promise<ValidationResult<T>>;
}
type Infer<T> = T extends Schema<infer U> ? U : never;

declare function useForm<S extends Schema<any>>(schema: S): {
    register: (name: keyof Infer<S>) => {
        name: keyof Infer<S>;
        value: string | NonNullable<Partial<Infer<S>>[keyof Infer<S>]>;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    handleSubmit: (onSubmit: (data: Infer<S>) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>;
    values: Partial<Infer<S>>;
    errors: Record<string, string>;
    isSubmitting: boolean;
};

declare function useField(name: string): any;

interface FormContextValue {
    values: Record<string, any>;
    errors: Record<string, string>;
    register: (name: string) => any;
}
declare const FormContext: react.Context<FormContextValue | null>;
declare function useFormContext(): FormContextValue;

export { FormContext, type FormContextValue, useField, useForm, useFormContext };
