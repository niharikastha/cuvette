import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}>
        <Sidebar />
        <div style={styles.body}>
          <button
            style={styles.button}
            onClick={() => navigate("/create-interview")}
          >
            Create Interview
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  content: {
    display: "flex",
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: "50px 0px 0px 50px",
  },
  button: {
    width: "310px",
    height: "57px",
    background: "#0B66EF",
    color: "#fff",
    border: "none",
    borderRadius: "8.32px",
    cursor: "pointer",
    fontSize: "33px", // Larger button text
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    margin: "20px",
    fontWeight: "600",
  },
};

export default Dashboard;
