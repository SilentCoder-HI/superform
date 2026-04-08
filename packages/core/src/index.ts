import { StringSchema, NumberSchema, BooleanSchema, ArraySchema, EnumSchema, LiteralSchema, UnionSchema } from "./schema.js";
import { ObjectSchema } from "./objectSchema.js";
import type { Schema } from "./types.js";

export const superform = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  object: <T extends Record<string, Schema<any>>>(shape: T) => new ObjectSchema(shape),
  array: <T = any>(schema?: Schema<T>) => new ArraySchema<T>(schema),
  enum: <T extends (string | number)>(values: T[]) => new EnumSchema<T>(values),
  literal: <T>(value: T) => new LiteralSchema<T>(value),
  union: <T extends Schema<any>[]>(...schemas: T) => new UnionSchema<T>(schemas),
};

// Alias for convenience
export const superformNode = superform;

export * from "./types.js";
export * from "./schema.js";
export * from "./objectSchema.js";
export * from "./base.js";
