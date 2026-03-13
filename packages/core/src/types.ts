export type ValidationResult<T> =
  | { success: true; data: T; errors?: never }
  | { success: false; data?: never; errors: any };

export type ValidationRule<T> = (value: T) => ValidationResult<T> | Promise<ValidationResult<T>>;

export interface Schema<T> {
  validate(value: any): Promise<ValidationResult<T>>;
}

export type Infer<T> = T extends Schema<infer U> ? U : never;