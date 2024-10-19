import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupHeader from "./SignupHeader"; 
import PhoneIcon from "../img/Vector.svg";
import EmailIcon from "../img/mail.svg";
import CheckCircle from "../img/check.svg";
import axiosInstance from "../services/api";

const OtpVerification = () => {
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailVerified && mobileVerified) {
      navigate("/dashboard");
    }
  }, [emailVerified, mobileVerified, navigate]);

  const handleEmailVerify = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/email/verify-otp",
        { otp: emailOtp, medium: "email" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.data?.message === "Email verified successfully") {
        setEmailVerified(true);
        alert("Email verified successfully");
      } else {
        alert("Failed to verify email. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        alert(
          `Error verifying email OTP: ${
            error.response.data.message ||
            error.response.data.error ||
            "An error occurred"
          }`
        );
      } else {
        alert(`Error setting up the request: ${error.message}`);
      }
    }
  };

  const handleMobileVerify = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/email/verify-otp",
        { otp: mobileOtp, medium: "phone" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.data?.message === "Phone number verified successfully") {
        setMobileVerified(true);
        alert("Phone number verified successfully");
      } else {
        alert("Failed to verify phone number. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        alert(
          `Error verifying email OTP: ${
            error.response.data.message ||
            error.response.data.error ||
            "An error occurred"
          }`
        );
      } else {
        alert(`Error setting up the request: ${error.message}`);
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
            ever since the 1500s.
          </p>
        </div>

        <div style={styles.formContainer}>
          <form style={styles.form}>
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
              Lorem Ipsum is simply dummy text
            </p>

            {/* Email OTP */}
            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                disabled={emailVerified}
                style={{ ...styles.input, paddingLeft: "40px" }}
              />
              <img src={EmailIcon} alt="Phone Icon" style={styles.svgIcon} />
              {emailVerified && (
                <img
                  src={CheckCircle}
                  alt="Check Icon"
                  style={styles.checkIcon}
                />
              )}
            </div>

            {!emailVerified && (
              <button onClick={handleEmailVerify} style={styles.button}>
                Verify
              </button>
            )}

            {/* Mobile OTP */}
            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Mobile OTP"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                disabled={mobileVerified}
                style={{ ...styles.input, paddingLeft: "40px" }}
              />
              <img src={PhoneIcon} alt="Phone Icon" style={styles.svgIcon} />
              {mobileVerified && (
                <img
                  src={CheckCircle}
                  alt="Check Icon"
                  style={styles.checkIcon}
                />
              )}
            </div>

            {!mobileVerified && (
              <button onClick={handleMobileVerify} style={styles.button}>
                Verify
              </button>
            )}
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
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #3F71FF",
  },
  input: {
    padding: "10px",
    paddingLeft: "40px",
    borderRadius: "7px",
    border: "1px solid #CCCCCC",
    fontSize: "14px",
    backgroundColor: "#F4F4F4",
    width: "542px",
    height: "49px",
    fontSize: "24px",
    fontFamily: "DM Sans, sans-serif",
    color: "#535353",
    fontWeight: "400",
  },
  button: {
    margin: "10px 10px",
    backgroundColor: "#0B66EF",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    width: "595px",
    height: "43px",
    fontSize: "20px",
    fontFamily: "DM Sans, sans-serif",
    color: "#FFFFFF",
    fontWeight: "700",
  },
  checkIcon: {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "21.85px",
    height: "121.85px",
    pointerEvents: "none",
  },
  successIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    color: "white",
    backgroundColor: "green",
    borderRadius: "50%",
    padding: "5px",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "10px",
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
    paddingLeft: "10px",
  },
};

export default OtpVerification;
