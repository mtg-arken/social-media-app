import React from "react";
import SortBy from "./SortBy";
import { useNavigate } from "react-router-dom";

function OptionsBar(props) {
  const navigate = useNavigate();
  return (
    <div className=" card mb-3 d-flex  flex-row justify-content-between p-2">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => navigate("/posts/create")}
      >
        + New Post
      </button>
      <SortBy sort={props.sort} setSort={props.setSort} />
    </div>
  );
}

export default OptionsBar;
