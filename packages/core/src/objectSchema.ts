import { BaseSchema } from "./base.js";
import type { Schema, ValidationResult, Infer } from "./types.js";

export class ObjectSchema<T extends Record<string, Schema<any>>> extends BaseSchema<{ [K in keyof T]: Infer<T[K]> }> {
  constructor(private shape: T) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<{ [K in keyof T]: Infer<T[K]> }>> {
    if (typeof value !== "object" || value === null) {
      return { success: false, errors: "Must be an object" };
    }

    const fieldErrors: Record<string, any> = {};
    let hasErrors = false;

    // Validate each field in the shape
    for (const key in this.shape) {
      const schema = this.shape[key]!;
      const fieldValue = value[key];
      const result = await schema.validate(fieldValue);
      
      if (!result.success) {
        fieldErrors[key] = result.errors;
        hasErrors = true;
      }
    }

    if (hasErrors) {
      return { success: false, errors: fieldErrors };
    }

    // Finally validate against common rules added via .addRule()
    return super.validate(value);
  }
}
