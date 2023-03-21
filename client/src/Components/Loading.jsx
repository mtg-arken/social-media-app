import React from "react";

const Loading = ({ label }) => {
  return (
    <div className=" d-flex justify-content-center">
      <div
        className="spinner-border"
        style={{ width: "150px", height: "150px" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
