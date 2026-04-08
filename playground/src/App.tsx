"use client";
import React, { useState } from "react";
import { useForm } from "../../packages/react/src/index.js";
import { superform } from "../../packages/core/src/index.js";
import { toast, Toaster } from "react-hot-toast";

type ViewState = "login" | "signup" | "dashboard";

// --- Schema for Signup showcasing ALL 1.1.0 Features ---
const signupSchema = superform.object({
  // 1. transform() - Trims and lowercases the input
  email: superform.string().email("Invalid email").transform((v) => v.trim().toLowerCase()),
  
  // 2. refine() - Custom strong password check mapped to an error message
  password: superform.string().min(6, "At least 6 chars").refine((v) => !v.toLowerCase().includes("123"), {
    message: "Password is too weak (contains 123)",
  }),

  // 3. optional() - Optional nickname 
  nickname: superform.string().optional(),

  // 4. enum() - Choose account type
  role: superform.enum(["developer", "designer", "manager"]),

  // 5. literal() - Must agree to terms (must be the strict boolean true literal)
  acceptTerms: superform.literal(true),

  // 6. union() - Age can be a string from input, or number, transformed to number
  age: superform.union(superform.string(), superform.number()).transform((v) => Number(v)),
  
  // 7. nullable() - explicitly nullable field (demonstration purposes)
  promoCode: superform.string().nullable(),
});

// --- Schema for Login ---
const loginSchema = superform.object({
  email: superform.string().email("Invalid email"),
  password: superform.string().min(6, "At least 6 chars"),
});

export default function App() {
  const [view, setView] = useState<ViewState>("signup");
  const [userData, setUserData] = useState<any>(null);

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
        <div style={{ width: "450px", background: "white", borderRadius: "14px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          {/* Mock Header Logo */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={logoStyle}>S</div>
            <h1 style={{ marginTop: "15px", fontSize: "24px" }}>SuperForm Playground</h1>
          </div>

          {view === "login" && <LoginForm onLogin={(data) => { setUserData(data); setView("dashboard"); }} onGoSignup={() => setView("signup")} />}
          {view === "signup" && <SignupForm onSignup={(data) => { setUserData(data); setView("dashboard"); }} onGoLogin={() => setView("login")} />}
          {view === "dashboard" && <Dashboard user={userData} onLogout={() => { setUserData(null); setView("login"); }} />}
        </div>
      </div>
    </>
  );
}

function LoginForm({ onLogin, onGoSignup }: { onLogin: (d: any) => void; onGoSignup: () => void }) {
  const { register, handleSubmit, errors, isSubmitting } = useForm(loginSchema);

  const onSubmit = async (data: any) => {
    const loadingToast = toast.loading("Logging in...");
    await new Promise((r) => setTimeout(r, 1000));
    toast.dismiss(loadingToast);
    toast.success("Welcome back!");
    onLogin(data);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Email</label>
          <input {...register("email")} style={inputStyle} placeholder="you@example.com" />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>
        <div style={{ marginBottom: "25px" }}>
          <label style={labelStyle}>Password</label>
          <input {...register("password")} type="password" style={inputStyle} placeholder="******" />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}
        </div>
        <button type="submit" disabled={isSubmitting} style={btnStyle}>{isSubmitting ? "Processing..." : "Login"}</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
        Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onGoSignup(); }} style={{ color: "#6366f1", fontWeight: "bold" }}>Sign up</a>
      </p>
    </div>
  );
}

function SignupForm({ onSignup, onGoLogin }: { onSignup: (d: any) => void; onGoLogin: () => void }) {
  const { register, handleSubmit, errors, isSubmitting } = useForm(signupSchema);

  const onSubmit = async (data: any) => {
    const loadingToast = toast.loading("Creating account...");
    await new Promise((r) => setTimeout(r, 1200));
    toast.dismiss(loadingToast);
    toast.success("Account created successfully!");
    onSignup(data);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up (v1.1.0 Showcase)</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Transform */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Email <span style={tagStyle}>.transform()</span></label>
          <input {...register("email")} style={inputStyle} placeholder="You@Example.com (will lowercase)" />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        {/* Refine / Min */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Password <span style={tagStyle}>.refine()</span></label>
          <input {...register("password")} type="password" style={inputStyle} placeholder="Must not contain '123'" />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          {/* Optional */}
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Nickname <span style={tagStyle}>.optional()</span></label>
            <input {...register("nickname")} style={inputStyle} placeholder="Optional alias" />
            {errors.nickname && <div style={errorStyle}>{errors.nickname}</div>}
          </div>
          {/* Nullable */}
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Promo <span style={tagStyle}>.nullable()</span></label>
            <input {...register("promoCode")} style={inputStyle} placeholder="Code" />
            {errors.promoCode && <div style={errorStyle}>{errors.promoCode}</div>}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          {/* Union + Transform */}
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Age <span style={tagStyle}>.union()</span></label>
            <input {...register("age")} type="text" style={inputStyle} placeholder="Age as str/num" />
            {errors.age && <div style={errorStyle}>{errors.age}</div>}
          </div>
          {/* Enum */}
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Role <span style={tagStyle}>.enum()</span></label>
            <select {...register("role")} style={inputStyle}>
              <option value="">Select a role...</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <div style={errorStyle}>{errors.role}</div>}
          </div>
        </div>

        {/* Literal */}
        <div style={{ marginBottom: "20px", padding: "10px", background: "#f8fafc", borderRadius: "8px" }}>
          <label style={{ ...labelStyle, display: "flex", alignItems: "center", marginBottom: 0 }}>
            <input type="checkbox" {...register("acceptTerms")} style={{ marginRight: "10px", width: "18px", height: "18px" }} />
            Accept Terms <span style={{ ...tagStyle, marginLeft: "8px" }}>.literal(true)</span>
          </label>
          {errors.acceptTerms && <div style={errorStyle}>You must strictly accept the terms.</div>}
        </div>

        <button type="submit" disabled={isSubmitting} style={btnStyle}>{isSubmitting ? "Processing..." : "Create Account"}</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onGoLogin(); }} style={{ color: "#6366f1", fontWeight: "bold" }}>Log in</a>
      </p>
    </div>
  );
}

function Dashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>Dashboard 🚀</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>Here is the strictly validated data emitted by your form:</p>
      
      <div style={{ background: "#1e293b", color: "#e2e8f0", padding: "20px", borderRadius: "8px", margin: "20px 0", textAlign: "left", fontSize: "14px", fontFamily: "monospace", overflowX: "auto" }}>
        <pre style={{ margin: 0 }}>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <div style={{ background: "#f1f5f9", padding: "15px", borderRadius: "8px", marginBottom: "25px", fontSize: "13px", color: "#475569" }}>
        Notice how <strong>age</strong> is a true `number` due to `.transform()`, and <strong>email</strong> is properly lowercased!
      </div>

      <button onClick={onLogout} style={{ ...btnStyle, background: "#ef4444" }}>Logout</button>
    </div>
  );
}

// Inline styles for fast playground scaffolding
const inputStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" as const, outline: "none", fontSize: "15px" };
const btnStyle = { width: "100%", padding: "12px", background: "linear-gradient(135deg,#6366f1,#9333ea)", border: "none", color: "white", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "16px", transition: "opacity 0.2s" };
const errorStyle = { color: "#ef4444", fontSize: "13px", marginTop: "5px", fontWeight: 500 };
const labelStyle = { display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 600, color: "#334155" };
const tagStyle = { display: "inline-block", background: "#e0e7ff", color: "#4338ca", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" };
const logoStyle = { width: "55px", height: "55px", background: "linear-gradient(135deg,#6366f1,#9333ea)", borderRadius: "14px", color: "white", fontSize: "28px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" };