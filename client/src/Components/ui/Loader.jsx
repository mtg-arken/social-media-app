import React from "react";

function Loader() {
  return (
    <div
      className="d-flex  flex-column justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <div className="spinner-border  "></div>
      Loading...
    </div>
  );
}

export default Loader;
