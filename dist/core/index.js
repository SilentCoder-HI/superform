// packages/core/src/base.ts
var BaseSchema = class {
  rules = [];
  addRule(rule) {
    this.rules.push(rule);
    return this;
  }
  async validate(value) {
    for (const rule of this.rules) {
      const error = await rule(value);
      if (error) {
        return { success: false, errors: error };
      }
    }
    return { success: true, data: value };
  }
};

// packages/core/src/schema.ts
var StringSchema = class extends BaseSchema {
  email() {
    return this.addRule(
      (value) => /\S+@\S+\.\S+/.test(value) ? null : "Invalid email"
    );
  }
  min(length) {
    return this.addRule(
      (value) => value.length >= length ? null : `Minimum ${length} characters`
    );
  }
  max(length) {
    return this.addRule(
      (value) => value.length <= length ? null : `Maximum ${length} characters`
    );
  }
  async(fn) {
    return this.addRule(fn);
  }
};
var NumberSchema = class extends BaseSchema {
  min(min) {
    return this.addRule(
      (value) => value >= min ? null : `Must be at least ${min}`
    );
  }
  max(max) {
    return this.addRule(
      (value) => value <= max ? null : `Must be at most ${max}`
    );
  }
  async(fn) {
    return this.addRule(fn);
  }
};
var BooleanSchema = class extends BaseSchema {
  true() {
    return this.addRule(
      (value) => value === true ? null : "Must be true"
    );
  }
  false() {
    return this.addRule(
      (value) => value === false ? null : "Must be false"
    );
  }
  async(fn) {
    return this.addRule(fn);
  }
};
var ArraySchema = class extends BaseSchema {
  constructor(elementSchema) {
    super();
    this.elementSchema = elementSchema;
  }
  async validate(value) {
    if (!Array.isArray(value)) {
      return { success: false, errors: "Must be an array" };
    }
    if (this.elementSchema) {
      const errors = {};
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
  min(length) {
    return this.addRule(
      (value) => value.length >= length ? null : `Minimum ${length} elements`
    );
  }
  max(length) {
    return this.addRule(
      (value) => value.length <= length ? null : `Maximum ${length} elements`
    );
  }
};

// packages/core/src/objectSchema.ts
var ObjectSchema = class extends BaseSchema {
  constructor(shape) {
    super();
    this.shape = shape;
  }
  async validate(value) {
    if (typeof value !== "object" || value === null) {
      return { success: false, errors: "Must be an object" };
    }
    const fieldErrors = {};
    let hasErrors = false;
    for (const key in this.shape) {
      const schema = this.shape[key];
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
    return super.validate(value);
  }
};

// packages/core/src/index.ts
var s = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  object: (shape) => new ObjectSchema(shape),
  array: (schema) => new ArraySchema(schema)
};
var superform = s;
export {
  ArraySchema,
  BaseSchema,
  BooleanSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
  s,
  superform
};
//# sourceMappingURL=index.js.map