import type { Schema, ValidationRule, ValidationResult, Infer } from "./types.js";

export abstract class BaseSchema<T> {
  protected rules: ((value: T) => string | null | Promise<string | null>)[] = [];

  protected addRule(rule: (value: T) => string | null | Promise<string | null>) {
    this.rules.push(rule);
    return this;
  }

  async validate(value: any): Promise<ValidationResult<T>> {
    for (const rule of this.rules) {
      const error = await rule(value);
      if (error) {
        return { success: false, errors: error };
      }
    }
    return { success: true, data: value as T };
  }
}
