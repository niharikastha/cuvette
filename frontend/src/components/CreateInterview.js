import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DateIcon from "../img/date.svg";
import DropIcon from "../img/dropdown.svg";
import axios from "axios";
import axiosInstance from "../services/api";

const CreateInterview = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [candidateEmails, setCandidateEmails] = useState([]);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEmail = (e) => {
    if (e.key === "Enter" && candidateEmail) {
      setCandidateEmails([...candidateEmails, candidateEmail]);
      setCandidateEmail("");
      e.preventDefault();
    }
  };

  const handleRemoveEmail = (index) => {
    setCandidateEmails(candidateEmails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const companyId = decodedToken ? decodedToken.companyId : null;

    if (!companyId) {
      console.error("Company ID is not available.");
      setLoading(false);
      return;
    }

    const jobData = {
      title: jobTitle,
      description: jobDescription,
      experienceLevel,
      endDate,
      companyId,
      candidates: candidateEmails.map((email) => ({ email })),
    };

    try {
      const response = await axiosInstance.post(
        "/job/create",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Job created successfully:", response.data);
      if (response?.data) {
        alert("Job created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(
        "Error creating job: " +
          (error.response?.data?.message || "Please try again later.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Header />
      <div style={styles.contentContainer}>
        <Sidebar />
        <main style={styles.main}>
          <div style={styles.formContainer}>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Title</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Enter Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Job Description</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Enter Job Description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Experience Level</label>
                <div style={{ position: "relative", width: "653px" }}>
                  <select
                    style={styles.select}
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    <option value="">Select Experience Level</option>
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                  <img
                    src={DropIcon}
                    alt="Dropdown Icon"
                    style={styles.svgIcon}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Add Candidate</label>
                <div style={styles.emailInputContainer}>
                  <div style={styles.tagInput}>
                    {candidateEmails.map((email, index) => (
                      <span key={index} style={styles.emailTag}>
                        <div style={styles.userCircle}></div>
                        {email}
                        <span
                          style={styles.removeEmailTag}
                          onClick={() => handleRemoveEmail(index)}
                        >
                          &times;
                        </span>
                      </span>
                    ))}
                    <input
                      style={styles.emailInput}
                      type="email"
                      placeholder={candidateEmail ? "" : "Enter the email"}
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      onKeyDown={handleAddEmail}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>End Date</label>
                <div style={{ position: "relative", width: "653px" }}>
                  <input
                    style={styles.input2}
                    type="text"
                    placeholder="Select a Date"
                    value={endDate}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <img src={DateIcon} alt="User Icon" style={styles.svgIcon} />
                </div>
              </div>
              <div style={styles.formGroup}>
                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? <div className="loader"></div> : "Send"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ffff",
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "20px 30px",
    width: "70%",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "80px",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    width: "944px",
  },
  label: {
    fontSize: "32px",
    color: "#000000",
    textAlign: "right",
    paddingRight: "10px",
    fontWeight: "400",
    fontFamily: "DM Sans, sans-serif",
    width: "291px",
  },
  input: {
    padding: "10px 20px ",
    borderRadius: "10px",
    border: "1px solid #0B66EF",
    fontSize: "24px",
    width: "653px",
    height: "50px",
    color: "#535353B2",
    fontFamily: "DM Sans, sans-serif",
    margin: "20px 0",
    boxSizing: "border-box",
  },
  input2: {
    padding: "10px 20px ",
    borderRadius: "10px",
    border: "1px solid #0B66EF",
    fontSize: "24px",
    width: "100%",
    height: "50px",
    color: "#535353B2",
    fontFamily: "DM Sans, sans-serif",
    margin: "20px 0",
    boxSizing: "border-box",
    cursor: "pointer",
    appearance: "none", // Remove default browser styling
    position: "relative",
  },

  textarea: {
    padding: "10px 20px ",
    borderRadius: "10px",
    border: "1px solid #D0D0D0",
    fontSize: "24px",
    width: "653px",
    height: "270px",
    color: "#535353B2",
    fontFamily: "DM Sans, sans-serif",
    margin: "20px 0",
    boxSizing: "border-box",
    resize: "none",
  },
  select: {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    height: "70px",
    padding: "10px 20px ",
    borderRadius: "10px",
    border: "1px solid #D0D0D0",
    fontSize: "24px",
    width: "100%",
    backgroundColor: "#ffff",
    fontFamily: "DM Sans, sans-serif",
    fontWeight: "400",
    color: "#535353B2",
    boxSizing: "border-box",
    cursor: "pointer",
  },

  submitButton: {
    padding: "10px",
    backgroundColor: "#0B66EF",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "24px",
    marginTop: "20px",
    width: "164px",
    height: "49px",
    alignSelf: "center",
    fontWeight: "700",
    fontFamily: "DM Sans, sans-serif",
  },

  svgIcon: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    width: "18px",
    height: "20px",
  },

  emailInputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "653px",
  },
  tagInput: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "8px",
    border: "1px solid #0B66EF",
    borderRadius: "10px",
    minHeight: "50px",
  },
  emailTag: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "8px 12px",
    borderRadius: "20px",
    margin: "4px",
    fontSize: "20px",
    border: "1px solid #D0D0D0",
    color: "#535353B2",
    fontWeight: "400",
  },
  removeEmailTag: {
    marginLeft: "8px",
    cursor: "pointer",
    color: "#919191",
    fontWeight: "bold",
  },
  emailInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "18px",
    marginLeft: "8px",
    minWidth: "150px",
    fontSize:"24px",
    color: "#535353B2",
  },
  userCircle: {
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    backgroundColor: "#DADADA",
    marginRight: "10px",
  },
  loader: {
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "50%",
    borderTop: "4px solid #ffffff",
    width: "16px",
    height: "16px",
    animation: "spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default CreateInterview;
