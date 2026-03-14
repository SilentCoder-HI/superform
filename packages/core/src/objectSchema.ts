import { BaseSchema } from "./base.js";
import type { Schema, ValidationResult, Infer } from "./types.js";

export class ObjectSchema<T extends Record<string, Schema<any>>> extends BaseSchema<{
  [K in keyof T]: Infer<T[K]>;
}> {
  constructor(private shape: T) {
    super();
  }

  // Fully type-safe extend
  extend<NewShape extends Record<string, Schema<any>>>(
    newShape: NewShape,
  ): ObjectSchema<T & NewShape> {
    // Merge shapes at runtime
    const mergedShape = { ...this.shape, ...newShape } as T & NewShape;
    return new ObjectSchema(mergedShape);
  }

  // Validate each field
  async validate(value: any): Promise<ValidationResult<{ [K in keyof T]: Infer<T[K]> }>> {
    if (typeof value !== "object" || value === null) {
      return { success: false, errors: "Must be an object" };
    }

    const fieldErrors: Record<string, any> = {};
    let hasErrors = false;

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

    // Validate any rules from BaseSchema
    return super.validate(value);
  }

  // Allow accessing the shape safely
  getShape(): T {
    return this.shape;
  }
}
