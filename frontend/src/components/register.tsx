import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handelRegister } from "../api/auth";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false); // Clear error on typing
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration Payload:", formData);
    const result=await handelRegister(formData.username, formData.password, formData.email)
    if(result.success){
        setHasError(false);
        console.log("Registration successful:", result.data);
        navigate("/login");
    }else{
        setHasError(true);
        console.error("Registration failed:", result.message, result.errors);
    }
    
  };


  return (
    <div style={styles.container}>
      <div 
        onClick={() => navigate("/")} 
        style={{ position: "absolute", top: "30px", left: "30px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: "#8b949e", fontSize: "14px", fontFamily: "monospace" }}
      >
        <img src="/arrow_back.svg" alt="Back" width="24" height="24" style={{ filter: "invert(0.6)" }} />
        <span>Back to Home</span>
      </div>
      <form onSubmit={handleSubmit} style={{ ...styles.card, ...(hasError ? { border: "2px solid #ff5555db", transition: "border 0.2s ease" } : { transition: "border 0.2s ease" }) }}>
        <h2 style={styles.heading}>Create an Account</h2>

        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
         <p style={{ marginTop: "17px", fontSize: "14px", textAlign: "center" }}>
 Already have an account?{" "}
  <a href="/login" style={{ color: "#ff5555b8",textDecoration: "none" }}>
    sign in here
  </a>
</p>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191b20",
    color: "#c9d1d9",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#191b20",
    border: "1px solid #30363d",
    borderRadius: "8px",
    padding: "32px",
    width: "100%",
    maxWidth: "360px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
  },
  heading: {
    margin: "0 0 24px 0",
    fontSize: "20px",
    fontWeight: 600,
    color: "#f0f6fc",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    color: "#8b949e",
    fontWeight: 500,
  },
  input: {
    backgroundColor: "#191b20",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "10px 12px",
    fontSize: "14px",
    color: "#f0f6fc",
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: "12px",
    backgroundColor: "#ff5555db",
    color: "#ffffff",
    border: "1px solid rgba(240, 246, 252, 0.1)",
    borderRadius: "6px",
    padding: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default RegisterForm;