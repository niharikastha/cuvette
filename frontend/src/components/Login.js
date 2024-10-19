import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupHeader from "./SignupHeader"; 
import axiosInstance from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axiosInstance.post("/auth/login", {
          email,
        });
        console.log("🚀 ~ handleSubmit ~ response:", response);

        if (response.data) {
          alert("OTP has been sent to your email.");
          navigate("/verify-otp");
        }
      } catch (loginError) {
        console.log("Login failed:", loginError);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <SignupHeader />

      <div style={styles.pageContainer}>
        <div style={styles.textContainer}>
          <p>Welcome back! Please log in to your account.</p>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={{ margin: "10px" }}>Login</h2>
            <p style={{ margin: "10px" }}>Enter your email to continue</p>

            {/* Email Input with Icon */}
            <div style={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={email}
                style={{ ...styles.input, paddingLeft: "40px" }}
              />
              <i className="fa-regular fa-envelope" style={styles.icon}></i>
            </div>
            {error && <div style={styles.error}>{error}</div>}

            <button type="submit" style={styles.button}>
              Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 90px)",
    backgroundColor: "#ffff",
    width: "90%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    fontSize: "26px",
    color: "#333",
    width: "50%",
    margin: "auto",
  },
  formContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  form: {
    width: "100%",
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid blue",
  },
  input: {
    padding: "10px",
    paddingLeft: "40px", 
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "rgb(238 238 238)",
    width: "90%",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  button: {
    margin: "10px 0px",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
  icon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: "18px",
    color: "#666",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "10px",
    width: "100%",
  },
};

export default Login;
