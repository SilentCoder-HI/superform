import React from "react";
import { useForm } from "../../packages/react/src/index.js";
import { s } from "../../packages/core/src/index.js";

const schema = s.object({
  email: s.string().email(),
  password: s.string().min(8),
  acceptTerms: s.boolean().true()
});

export default function App() {
  const { register, handleSubmit, errors, isSubmitting } = useForm(schema);

  const onSubmit = (data: any) => {
    console.log("Form Submitted Successfully:", data);
    alert("Success!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>SuperForm Demo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input 
            {...register("email")} 
            style={{ width: "100%", padding: "8px", marginTop: "5px" }} 
          />
          {errors.email && <p style={{ color: "red", fontSize: "0.8em" }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input 
            type="password"
            {...register("password")} 
            style={{ width: "100%", padding: "8px", marginTop: "5px" }} 
          />
          {errors.password && <p style={{ color: "red", fontSize: "0.8em" }}>{errors.password}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            <input type="checkbox" {...register("acceptTerms")} />
            Accept Terms & Conditions
          </label>
          {errors.acceptTerms && <p style={{ color: "red", fontSize: "0.8em" }}>{errors.acceptTerms}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            width: "100%", 
            padding: "10px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer"
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
