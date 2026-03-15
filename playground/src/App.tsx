"use client";
import React from "react";
import { useForm } from "../../packages/react/src/index.js";
import { superform } from "../../packages/core/src/index.js";
// app/page.tsx

import { toast, Toaster } from "react-hot-toast";

const userSchema = superform.object({
  name: superform.string().min(4, "Name must be at least 4 characters").max(10, "Name must be at most 10 characters"),

  email: superform.string().email("Please enter a valid email").min(5, "Email is too short"),

  password: superform.string().min(6, "Password must be at least 6 characters"),
  acceptTerms: superform.boolean().true("You must accept the terms and conditions"),
});

export default function SignupPage() {


  const { register, handleSubmit, errors, isSubmitting, reset } = useForm(userSchema);

  const onSubmit = async (_data: Record<string, unknown>) => {


    const loadingToast = toast.loading("Creating your account...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));

      toast.dismiss(loadingToast);
      toast.success("Account created successfully! 🎉");

      reset();
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#f4f4f5,#e4e4e7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "system-ui, Arial",
        }}
      >
        <div style={{ width: "420px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div
              style={{
                width: "55px",
                height: "55px",
                background: "linear-gradient(135deg,#6366f1,#9333ea)",
                borderRadius: "14px",
                color: "white",
                fontSize: "22px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              A
            </div>

            <h1 style={{ marginTop: "15px" }}>Create account</h1>

            <p style={{ color: "#666" }}>Start your journey with us today</p>
          </div>

          {/* Card */}
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <form>
              <div style={{ marginBottom: "18px" }}>
                <label style={{ fontSize: "14px", display: "block", marginBottom: "6px" }}>
                  Full name
                </label>

                <input
                  {...register("name")}
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />

                {errors.name && <p style={{ color: "#ef4444", fontSize: "13px" }}>{errors.name}</p>}
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ fontSize: "14px", display: "block", marginBottom: "6px" }}>
                  Email
                </label>

                <input
                  type="email"
                  {...register("email")}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />

                {errors.email && (
                  <p style={{ color: "#ef4444", fontSize: "13px" }}>{errors.email}</p>
                )}
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ fontSize: "14px", display: "block", marginBottom: "6px" }}>
                  Password
                </label>

                <input
                  type="password"
                  {...register("password")}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />

                {errors.password && (
                  <p style={{ color: "#ef4444", fontSize: "13px" }}>{errors.password}</p>
                )}
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ fontSize: "14px", display: "block", marginBottom: "6px" }}>
                  Accept terms and conditions
                </label>
                <input
                  type="checkbox"
                  {...register("acceptTerms")}
                  style={{ marginRight: "10px" }}
                />

                {errors.acceptTerms && (
                  <p style={{ color: "#ef4444", fontSize: "13px" }}>You must accept the terms and conditions</p>
                )}
              </div>


              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(135deg,#6366f1,#9333ea)",
                  border: "none",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {isSubmitting ? "Processing..." : "Create account"}
              </button>
            </form>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              marginTop: "20px",
              color: "#888",
            }}
          >
            © {new Date().getFullYear()} Your Company
          </p>
        </div>
      </div>
    </>
  );
}