"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/react/src/index.ts
var src_exports = {};
__export(src_exports, {
  FormContext: () => FormContext,
  useField: () => useField,
  useForm: () => useForm,
  useFormContext: () => useFormContext
});
module.exports = __toCommonJS(src_exports);

// packages/react/src/useForm.ts
var import_react = require("react");
function useForm(schema) {
  const [values, setValues] = (0, import_react.useState)({});
  const [errors, setErrors] = (0, import_react.useState)({});
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const register = (name) => ({
    name,
    value: values[name] || "",
    onChange: (e) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }));
    }
  });
  const handleSubmit = (0, import_react.useCallback)(
    (onSubmit) => async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({});
      const result = await schema.validate(values);
      if (!result.success) {
        const firstError = Array.isArray(result.errors) ? result.errors[0] : result.errors;
        const errorMsg = typeof firstError === "string" ? firstError : JSON.stringify(firstError);
        const [field, message] = errorMsg.includes(":") ? errorMsg.split(":").map((s) => s.trim()) : ["root", errorMsg];
        setErrors({ [field]: message || errorMsg });
        setIsSubmitting(false);
        return;
      }
      try {
        await onSubmit(result.data);
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, values]
  );
  return {
    register,
    handleSubmit,
    values,
    errors,
    isSubmitting
  };
}

// packages/react/src/formContext.ts
var import_react2 = require("react");
var FormContext = (0, import_react2.createContext)(null);
function useFormContext() {
  const context = (0, import_react2.useContext)(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}

// packages/react/src/useField.ts
function useField(name) {
  const { values, errors, register } = useFormContext();
  return {
    value: values[name],
    error: errors[name],
    ...register(name)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormContext,
  useField,
  useForm,
  useFormContext
});
//# sourceMappingURL=index.cjs.map