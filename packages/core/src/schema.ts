import { BaseSchema } from "./base.js";
import type { ValidationRule, Schema, ValidationResult } from "./types.js";

export class StringSchema extends BaseSchema<string> {
  email() {
    return this.addRule((value) =>
      /\S+@\S+\.\S+/.test(value) ? null : "Invalid email"
    );
  }

  min(length: number) {
    return this.addRule((value) =>
      value.length >= length ? null : `Minimum ${length} characters`
    );
  }

  max(length: number) {
    return this.addRule((value) =>
      value.length <= length ? null : `Maximum ${length} characters`
    );
  }

  async(fn: (value: string) => Promise<string | null>) {
    return this.addRule(fn);
  }
}

export class NumberSchema extends BaseSchema<number> {
  min(min: number) {
    return this.addRule((value) =>
      value >= min ? null : `Must be at least ${min}`
    );
  }

  max(max: number) {
    return this.addRule((value) =>
      value <= max ? null : `Must be at most ${max}`
    );
  }

  async(fn: (value: number) => Promise<string | null>) {
    return this.addRule(fn);
  }
}

export class BooleanSchema extends BaseSchema<boolean> {
  true() {
    return this.addRule((value) =>
      value === true ? null : "Must be true"
    );
  }

  false() {
    return this.addRule((value) =>
      value === false ? null : "Must be false"
    );
  }

  async(fn: (value: boolean) => Promise<string | null>) {
    return this.addRule(fn);
  }
}

export class ArraySchema<T = any> extends BaseSchema<T[]> {
  constructor(private elementSchema?: Schema<T>) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<T[]>> {
    if (!Array.isArray(value)) {
      return { success: false, errors: "Must be an array" };
    }

    if (this.elementSchema) {
      const errors: Record<number, any> = {};
      let hasErrors = false;

      for (let i = 0; i < value.length; i++) {
        const result = await this.elementSchema.validate(value[i]);
        if (!result.success) {
          errors[i] = result.errors;
          hasErrors = true;
        }
      }

      if (hasErrors) {
        return { success: false, errors };
      }
    }

    return super.validate(value);
  }

  min(length: number) {
    return this.addRule((value) =>
      value.length >= length ? null : `Minimum ${length} elements`
    );
  }

  max(length: number) {
    return this.addRule((value) =>
      value.length <= length ? null : `Maximum ${length} elements`
    );
  }
}