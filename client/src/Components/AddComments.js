import React, { useRef } from "react";
import { useParams } from "react-router-dom";

export default function AddComments(props) {
  const inputRef = useRef();
  const { postId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/comments/CreateComment/${postId}`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ content: inputRef.current.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          e.target.reset()
          props.setPost([data.data]);
        }
      });
  };
  return (
    <div className="card ">
      <div className=" card-header d-flex justify-content-between align-items-center ">
        <h1>comment</h1>
        <p>help</p>
      </div>
      <div className="card-body">
        <form className="form-floating" onSubmit={(e) => handleSubmit(e)}>
          <textarea
            className="form-control"
            ref={inputRef}
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          ></textarea>
          <label>Comments</label>
          <button type="submit" className="btn btn-outline-primary mt-3 w-100">
            {" "}
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
