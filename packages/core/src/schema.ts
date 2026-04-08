import { BaseSchema } from "./base.js";
import type { Schema, ValidationResult, Infer } from "./types.js";

export class StringSchema extends BaseSchema<string> {
  constructor() {
    super();
    this.addRule((value) => (typeof value === "string" ? null : "Must be a string"));
  }

  email(msg = "Invalid email") {
    return this.addRule((value) => {
      if (typeof value !== "string") return msg;
      return /\S+@\S+\.\S+/.test(value) ? null : msg;
    });
  }

  min(length: number, msg?: string) {
    return this.addRule((value) => {
      if (typeof value !== "string") return msg || `Minimum ${length} characters`;
      return value.length >= length ? null : msg || `Minimum ${length} characters`;
    });
  }

  max(length: number, msg?: string) {
    return this.addRule((value) => {
      if (typeof value !== "string") return msg || `Maximum ${length} characters`;
      return value.length <= length ? null : msg || `Maximum ${length} characters`;
    });
  }

  async(fn: (value: string) => Promise<string | null>) {
    return this.addRule(async (value) => {
      if (typeof value !== "string") return "Invalid value";
      return fn(value);
    });
  }
}

export class NumberSchema extends BaseSchema<number> {
  constructor() {
    super();
    this.addRule((value) => (typeof value === "number" ? null : "Must be a number"));
  }

  min(min: number) {
    return this.addRule((value) => {
      if (typeof value !== "number") return `Must be at least ${min}`;
      return value >= min ? null : `Must be at least ${min}`;
    });
  }

  max(max: number) {
    return this.addRule((value) => {
      if (typeof value !== "number") return `Must be at most ${max}`;
      return value <= max ? null : `Must be at most ${max}`;
    });
  }

  async(fn: (value: number) => Promise<string | null>) {
    return this.addRule(async (value) => {
      if (typeof value !== "number") return "Invalid value";
      return fn(value);
    });
  }
}

export class BooleanSchema extends BaseSchema<boolean> {
  constructor() {
    super();
    this.addRule((value) => (typeof value === "boolean" ? null : "Must be a boolean"));
  }

  true(msg?: string) {
    return this.addRule((value) => {
      if (typeof value !== "boolean") return msg || "Must be true";
      return value === true ? null : msg || "Must be true";
    });
  }

  false(msg?: string) {
    return this.addRule((value) => {
      if (typeof value !== "boolean") return msg || "Must be false";
      return value === false ? null : msg || "Must be false";
    });
  }

  async(fn: (value: boolean) => Promise<string | null>) {
    return this.addRule(async (value) => {
      if (typeof value !== "boolean") return "Invalid value";
      return fn(value);
    });
  }
}

export class ArraySchema<T> extends BaseSchema<T[]> {
  constructor(private elementSchema?: Schema<T>) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<T[]>> {
    if (!Array.isArray(value)) return { success: false, errors: "Must be an array" };

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

      if (hasErrors) return { success: false, errors };
    }

    return super.validate(value);
  }

  min(length: number, msg?: string) {
    return this.addRule((value) => {
      if (!Array.isArray(value)) return msg || `Minimum ${length} elements`;
      return value.length >= length ? null : msg || `Minimum ${length} elements`;
    });
  }

  max(length: number, msg?: string) {
    return this.addRule((value) => {
      if (!Array.isArray(value)) return msg || `Maximum ${length} elements`;
      return value.length <= length ? null : msg || `Maximum ${length} elements`;
    });
  }
}

export class EnumSchema<T extends (string | number)> extends BaseSchema<T> {
  constructor(private allowedValues: T[]) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<T>> {
    if (!this.allowedValues.includes(value)) {
      return { success: false, errors: `Must be one of: ${this.allowedValues.join(", ")}` };
    }
    return super.validate(value);
  }
}

export class LiteralSchema<T> extends BaseSchema<T> {
  constructor(private literalValue: T) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<T>> {
    if (value !== this.literalValue) {
      return { success: false, errors: `Must be strictly equal to ${String(this.literalValue)}` };
    }
    return super.validate(value);
  }
}

export class UnionSchema<T extends Schema<any>[]> extends BaseSchema<Infer<T[number]>> {
  constructor(private schemas: T) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<Infer<T[number]>>> {
    const errorMessages = [];
    for (const schema of this.schemas) {
      const result = await schema.validate(value);
      if (result.success) {
        return super.validate(result.data);
      }
      errorMessages.push(result.errors);
    }
    return { success: false, errors: `Invalid union. Errors from branches: ${JSON.stringify(errorMessages)}` };
  }
}
