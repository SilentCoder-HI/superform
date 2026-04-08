import type { ValidationResult, Schema } from "./types.js";

export abstract class BaseSchema<T> implements Schema<T> {
  protected rules: ((value: T) => string | null | Promise<string | null>)[] = [];

  protected addRule(rule: (value: T) => string | null | Promise<string | null>) {
    this.rules.push(rule);
    return this;
  }

  optional(): OptionalSchema<T> {
    return new OptionalSchema(this);
  }

  nullable(): NullableSchema<T> {
    return new NullableSchema(this);
  }

  transform<U>(fn: (value: T) => U | Promise<U>): TransformSchema<T, U> {
    return new TransformSchema(this, fn);
  }

  refine(predicate: (value: T) => boolean | Promise<boolean>, options: { message?: string, path?: string[] }): this {
    return this.addRule(async (value) => {
      const isValid = await predicate(value);
      return isValid ? null : (options.message || "Invalid value");
    });
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

export class OptionalSchema<T> extends BaseSchema<T | undefined> {
  constructor(private innerSchema: Schema<T>) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<T | undefined>> {
    if (value === undefined) {
      return { success: true, data: undefined };
    }
    return this.innerSchema.validate(value);
  }
}

export class NullableSchema<T> extends BaseSchema<T | null> {
  constructor(private innerSchema: Schema<T>) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<T | null>> {
    if (value === null) {
      return { success: true, data: null };
    }
    return this.innerSchema.validate(value);
  }
}

export class TransformSchema<TIn, TOut> extends BaseSchema<TOut> {
  constructor(
    private innerSchema: Schema<TIn>,
    private transformFn: (value: TIn) => TOut | Promise<TOut>
  ) {
    super();
  }

  async validate(value: any): Promise<ValidationResult<TOut>> {
    const innerResult = await this.innerSchema.validate(value);
    if (!innerResult.success) {
      return innerResult;
    }
    try {
      const transformed = await this.transformFn(innerResult.data as TIn);
      return super.validate(transformed);
    } catch (e) {
      return { success: false, errors: e instanceof Error ? e.message : String(e) };
    }
  }
}

