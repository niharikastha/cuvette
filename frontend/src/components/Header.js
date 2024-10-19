import logo from "../img/cuvette.svg";
import React, { useState, useEffect } from "react";
import triangle from "../img/polygon.svg";
import axiosInstance from "../services/api";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setUsername(storedName || "Your Name");
  }, []);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axiosInstance.get("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("name");
      localStorage.removeItem("token");

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoSection}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.contactSection}>
        <span
          style={{
            margin: "0px",
            fontSize: "28px",
            fontFamily: "DM Sans, sans-serif",
            color: "#576474",
            fontWeight: "500",
          }}
        >
          Contact
        </span>
        <div style={styles.user} onClick={handleDropdownClick}>
          <div style={styles.userCircle}></div>
          <div style={styles.username}>{username}</div>
          <img src={triangle} alt="Users Icon" style={styles.svgIcon} />
          {showDropdown && (
            <div style={styles.dropdownMenu}>
              <div onClick={handleLogout} style={styles.logoutOption}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: "80px", 
    backgroundColor: "#ffff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #C5C5C5",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    width: "165px",
    height: "43px",
  },
  logo: {
    height: "43px",
    width: "165px",
    marginRight: "10px",
  },

  contactSection: {
    display: "flex",
    alignItems: "center",
  },
  user: {
    position: "relative", 
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    border: "1.24px solid #576474",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor:"pointer"
  },
  userCircle: {
    width: "31px",
    height: "31px",
    borderRadius: "50%",
    backgroundColor: "#A8A8A8",
    marginRight: "10px",
  },
  dropdown: {
    padding: "5px",
    fontSize: "14px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    outline: "none",
  },
  option: {
    fontSize: "19.9px", 
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 400,
    lineHeight: "25.91px",
    textAlign: "left",
    color: "#6A6A6A",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%", 
    left: "0", 
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    marginTop: "10px",
    zIndex: 1, 
  },
  logoutOption: {
    padding: "15px 50px",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#0B66EF",
    border: "none",
    borderRadius: "8.32px",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  svgIcon: {
    left: "10px",
    top: "50%",
    width: "18px",
    height: "18px",
    pointerEvents: "none",
    paddingLeft: "10px",
    cursor:"pointer"
  },
  username :{
    fontSize: "19.9px", 
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 400,
    color:"#6A6A6A"
  }
};

export default Header;
