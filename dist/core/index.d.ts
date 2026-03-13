type ValidationResult<T> = {
    success: true;
    data: T;
    errors?: never;
} | {
    success: false;
    data?: never;
    errors: any;
};
type ValidationRule<T> = (value: T) => ValidationResult<T> | Promise<ValidationResult<T>>;
interface Schema<T> {
    validate(value: any): Promise<ValidationResult<T>>;
}
type Infer<T> = T extends Schema<infer U> ? U : never;

declare abstract class BaseSchema<T> {
    protected rules: ((value: T) => string | null | Promise<string | null>)[];
    protected addRule(rule: (value: T) => string | null | Promise<string | null>): this;
    validate(value: any): Promise<ValidationResult<T>>;
}

declare class StringSchema extends BaseSchema<string> {
    email(): this;
    min(length: number): this;
    max(length: number): this;
    async(fn: (value: string) => Promise<string | null>): this;
}
declare class NumberSchema extends BaseSchema<number> {
    min(min: number): this;
    max(max: number): this;
    async(fn: (value: number) => Promise<string | null>): this;
}
declare class BooleanSchema extends BaseSchema<boolean> {
    true(): this;
    false(): this;
    async(fn: (value: boolean) => Promise<string | null>): this;
}
declare class ArraySchema<T = any> extends BaseSchema<T[]> {
    private elementSchema?;
    constructor(elementSchema?: Schema<T> | undefined);
    validate(value: any): Promise<ValidationResult<T[]>>;
    min(length: number): this;
    max(length: number): this;
}

declare class ObjectSchema<T extends Record<string, Schema<any>>> extends BaseSchema<{
    [K in keyof T]: Infer<T[K]>;
}> {
    private shape;
    constructor(shape: T);
    validate(value: any): Promise<ValidationResult<{
        [K in keyof T]: Infer<T[K]>;
    }>>;
}

declare const s: {
    string: () => StringSchema;
    number: () => NumberSchema;
    boolean: () => BooleanSchema;
    object: <T extends Record<string, Schema<any>>>(shape: T) => ObjectSchema<T>;
    array: <T = any>(schema?: Schema<T>) => ArraySchema<T>;
};
declare const superform: {
    string: () => StringSchema;
    number: () => NumberSchema;
    boolean: () => BooleanSchema;
    object: <T extends Record<string, Schema<any>>>(shape: T) => ObjectSchema<T>;
    array: <T = any>(schema?: Schema<T>) => ArraySchema<T>;
};

export { ArraySchema, BaseSchema, BooleanSchema, type Infer, NumberSchema, ObjectSchema, type Schema, StringSchema, type ValidationResult, type ValidationRule, s, superform };
