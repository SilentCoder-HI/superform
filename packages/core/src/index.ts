import { StringSchema, NumberSchema, BooleanSchema, ArraySchema } from "./schema.js";
import { ObjectSchema } from "./objectSchema.js";
import type { Schema } from "./types.js";

export const s = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  object: <T extends Record<string, Schema<any>>>(shape: T) => new ObjectSchema(shape),
  array: <T = any>(schema?: Schema<T>) => new ArraySchema<T>(schema),
};

// Alias for convenience
export const superform = s;

export * from "./types.js";
export * from "./schema.js";
export * from "./objectSchema.js";
export * from "./base.js";