import React, { useRef } from "react";
import { useParams } from "react-router-dom";

export default function AddComments() {
  const inputRef = useRef("");
  const { postId } = useParams();

  const handleSubmit = (e) => {
    fetch(`http://localhost:5000/api/comments/CreateComment/${postId}`, {
      method: "post",
      body: { content: inputRef.current.value, userID: "" },
    });
  };
  return (
    <div className="card ">
      <div className=" card-header d-flex justify-content-between align-items-center ">
        <h1>comment</h1>
        <p>help</p>
      </div>
      <div className="card-body" onSubmit={(e) => handleSubmit(e)}>
        <form className="form-floating">
          <textarea
            className="form-control"
            ref={inputRef}
            value={inputRef.current.value}
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          ></textarea>
          <label >Comments</label>
        </form>
        <button type="submit" className="btn btn-outline-primary mt-3 w-100">
          {" "}
          submit
        </button>
      </div>
    </div>
  );
}
