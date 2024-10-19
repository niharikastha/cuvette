import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupHeader from "./SignupHeader";
import UserIcon from "../img/user.svg";
import PhoneIcon from "../img/Vector.svg";
import EmailIcon from "../img/mail.svg";
import GroupsIcon from "../img/groups.svg";
import axiosInstance from "../services/api";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    email: "",
    employeeSize: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (formData.name.length < 4) {
      newErrors.name = "Name should have at least 4 characters";
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must be a valid 10-digit Indian number starting with 6, 7, 8, or 9";
    }
    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (formData.employeeSize < 1 || formData.employeeSize > 10000) {
      newErrors.employeeSize = "Employee size must be between 1 and 10,000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);

      try {
        const signupResponse = await axiosInstance.post(
          "/auth/signup",
          formData
        );        

        if (signupResponse.data) {
          const token = signupResponse?.data?.token;
          const name = signupResponse?.data?.company?.name;
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          // OTP to email
          try {
            const emailOtpResponse = await axiosInstance.post(
              "/email/send-otp",
              {
                medium: "email",
              },
              { headers }
            );

            if (emailOtpResponse.data) {
              console.log("OTP sent to email successfully.");
            } else {
              console.log("Failed to send OTP to email.");
              return;
            }
          } catch (emailOtpError) {
            console.log("Email OTP sending failed:", emailOtpError);
            return;
          }

          // OTP to phone
          try {
            const phoneOtpResponse = await axiosInstance.post(
              "/email/send-otp",
              {
                medium: "phone",
              },
              { headers }
            );

            if (phoneOtpResponse.data) {
              console.log("OTP sent to phone successfully.");
            } else {
              console.log("Failed to send OTP to phone.");
              return;
            }
          } catch (phoneOtpError) {
            console.log("Phone OTP sending failed:", phoneOtpError);
            return;
          }

          alert(
            "Registration successful! OTPs have been sent to both your email and phone."
          );
          navigate("/verify-otp");
        }
      } catch (signupError) {
        if (
          signupError.response &&
          signupError.response.data &&
          signupError.response.data.message
        ) {
          console.log(
            "Registration failed:",
            signupError.response.data.message
          );
          alert(`Registration failed: ${signupError.response.data.message}`);
        } else {
          console.log("Registration failed:", signupError);
          alert("Registration failed. Please try again.");
        }
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };
  return (
    <div>
      <SignupHeader />

      <div style={styles.pageContainer}>
        <div style={styles.textContainer}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2
              style={{
                margin: "0px",
                fontSize: "32px",
                fontFamily: "DM Sans, sans-serif",
                color: "#000000",
                fontWeight: "600",
              }}
            >
              Sign Up
            </h2>
            <p
              style={{
                margin: "10px 0px 30px 0px",
                fontSize: "16px",
                fontFamily: "DM Sans, sans-serif",
                color: "#292929B2",
                fontWeight: "500",
              }}
            >
              Lorem ipsum is simply dummy text
            </p>

            {/* Name Input with Icon */}
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={formData.name}
                style={{ ...styles.input, paddingLeft: "40px" }}
              />
              <img src={UserIcon} alt="User Icon" style={styles.svgIcon} />
            </div>
            {errors.name && <div style={styles.error}>{errors.name}</div>}

            {/* Phone Input with Icon */}
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="phone"
                placeholder="Phone no."
                onChange={handleChange}
                value={formData.phone}
                style={{ ...styles.input, paddingLeft: "40px" }}
              />
              <img src={PhoneIcon} alt="Phone Icon" style={styles.svgIcon} />
            </div>
            {errors.phone && <div style={styles.error}>{errors.phone}</div>}

            {/* Company Name Input with Icon */}
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                onChange={handleChange}
                value={formData.companyName}
                style={{ ...styles.input, paddingLeft: "40px" }}
              />
              <img src={UserIcon} alt="User Icon" style={styles.svgIcon} />
            </div>
            {errors.companyName && (
              <div style={styles.error}>{errors.companyName}</div>
            )}

            {/* Company Email Input with Icon */}
            <div style={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Company Email"
                onChange={handleChange}
                value={formData.email}
                style={{ ...styles.input, paddingLeft: "40px" }}
              />
              <img src={EmailIcon} alt="Email Icon" style={styles.svgIcon} />
            </div>
            {errors.email && <div style={styles.error}>{errors.email}</div>}

            {/* Employee Size Input with Icon */}
            <div style={styles.inputWrapper}>
              <input
                type="number"
                name="employeeSize"
                placeholder="Employee Size"
                onChange={handleChange}
                value={formData.employeeSize}
                style={{ ...styles.input, paddingLeft: "40px" }}
              />
              <img src={GroupsIcon} alt="Users Icon" style={styles.svgIcon} />
            </div>
            {errors.employeeSize && (
              <div style={styles.error}>{errors.employeeSize}</div>
            )}

            <p
              style={{
                marginTop: "10px",
                fontSize: "16px",
                fontFamily: "DM Sans, sans-serif",
                color: "#292929B2",
                fontWeight: "700",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              By clicking on the proceed you will accept our{" "}
            </p>
            <p
              style={{
                marginTop: "-10px",
                fontSize: "16px",
                fontFamily: "DM Sans, sans-serif",
                color: "#292929B2",
                fontWeight: "700",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <a
                href="#"
                style={{ textDecoration: "none", color: "#0B66EFB2" }}
              >
                Terms
              </a>{" "}
              &{" "}
              <a
                href="#"
                style={{ textDecoration: "none", color: "#0B66EFB2" }}
              >
                Conditions
              </a>
            </p>

            <button type="submit" style={styles.button} disabled={isLoading}>
              {isLoading ? (
                <div className="loader" style={styles.loader}></div>
              ) : (
                "Proceed"
              )}
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
    fontSize: "22.24px",
    color: "#292929B2",
    width: "50%",
    margin: "auto",
    fontFamily: "'DM Sans', sans-serif", 
    fontWeight: 500,
    lineHeight: "28.95px",
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
    fontSize: "25px",
    backgroundColor: "#F4F4F4",
    width: "90%",
    fontFamily: "DM Sans, sans-serif",
    color: "#535353",
    fontWeight: "400",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  button: {
    margin: "10px 0px",
    padding: "10px",
    backgroundColor: "#0B66EF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "24px",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "20px",
    width: "100%",
  },
  svgIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "18px",
    height: "18px",
    pointerEvents: "none",
  },
  loader: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    animation: "spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default SignupForm;
