import React from "react";

function IconButton(props) {
  return (
    <button style={{ border: "none", background: "none" }}>
      {props.children}
    </button>
  );
}

export default IconButton;
