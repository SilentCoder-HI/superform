import { describe, expect, it } from "vitest";
import { superform as s } from "../src/index.js";

describe("Validation Enhancements v1.1.0", () => {
  describe("optional()", () => {
    it("should allow undefined and skip further validation", async () => {
      const schema = s.string().min(3).optional();
      expect(await schema.validate(undefined)).toEqual({ success: true, data: undefined });
      expect(await schema.validate("abc")).toEqual({ success: true, data: "abc" });
      expect((await schema.validate("ab")).success).toBe(false);
    });
  });

  describe("nullable()", () => {
    it("should allow null and skip further validation", async () => {
      const schema = s.number().min(3).nullable();
      expect(await schema.validate(null)).toEqual({ success: true, data: null });
      expect(await schema.validate(5)).toEqual({ success: true, data: 5 });
      expect((await schema.validate(2)).success).toBe(false);
    });
  });

  describe("transform()", () => {
    it("should transform valid data", async () => {
      const schema = s.string().transform((v) => v.trim().toLowerCase());
      expect(await schema.validate("  HELLO  ")).toEqual({ success: true, data: "hello" });
    });

    it("should fail validation if transform throws", async () => {
      const schema = s.string().transform(() => {
        throw new Error("Transform failed");
      });
      const result = await schema.validate("hello");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBe("Transform failed");
      }
    });

    it("should skip transform if base validation fails", async () => {
        const schema = s.string().min(5).transform((v) => v.toUpperCase());
        const result = await schema.validate("hi");
        expect(result.success).toBe(false);
    });
  });

  describe("refine()", () => {
    it("should allow custom validation logic", async () => {
      const schema = s.string().refine((v) => v.startsWith("A"), { message: "Must start with A" });
      expect(await schema.validate("Apple")).toEqual({ success: true, data: "Apple" });
      
      const result = await schema.validate("Banana");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBe("Must start with A");
      }
    });
  });

  describe("enum()", () => {
    it("should allow values in enum", async () => {
      const schema = s.enum(["red", "green", "blue"]);
      expect(await schema.validate("red")).toEqual({ success: true, data: "red" });
    });

    it("should reject values not in enum", async () => {
      const schema = s.enum(["red", "green", "blue"]);
      const result = await schema.validate("yellow");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain("Must be one of");
      }
    });
  });

  describe("literal()", () => {
    it("should require exact value", async () => {
      const schema = s.literal("ADMIN");
      expect(await schema.validate("ADMIN")).toEqual({ success: true, data: "ADMIN" });
      const result = await schema.validate("USER");
      expect(result.success).toBe(false);
      if (!result.success) {
         expect(result.errors).toContain("strictly equal to");
      }
    });
  });

  describe("union()", () => {
    it("should allow any schema in union", async () => {
      const schema = s.union(s.string(), s.number());
      expect(await schema.validate("hello")).toEqual({ success: true, data: "hello" });
      expect(await schema.validate(42)).toEqual({ success: true, data: 42 });
    });

    it("should fail if no schemas match", async () => {
      const schema = s.union(s.string(), s.number());
      const result = await schema.validate(true);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain("Invalid union");
      }
    });
  });
});
