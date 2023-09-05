import React from "react";

export default function PasswordValidationPopUp() {
  const popoverStyles = {
    // Your existing styles
  };

  const contentStyles = {
    // Your existing styles
  };

  const beforeStyles = {
    content: '""',
    width: 0,
    height: 0,
    position: "absolute",
    left: "-30px",
    top: "50%",
    marginTop: "-15px",
    borderWidth: "15px",
    borderStyle: "solid",
    borderColor: "transparent whitesmoke transparent transparent",
  };

  return (
    <div style={popoverStyles}>
      <div style={beforeStyles}></div>
      <div style={contentStyles}>aa</div>
    </div>
  );
}
