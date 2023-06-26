import { useRef } from "react";

import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { createPost } from "../Services/api";

export default function PostEditor(params) {
  const titleRef = useRef();
  const contentRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await createPost(
      titleRef.current.value,
      contentRef.current.value
    );
    response.error && alert(response.error);
  }
  return (
    <>
      <Link to="/"> Go back to posts </Link>
      <div className=" card">
        <div className="  card-Body d-flex  align-items-center">
          <RxAvatar />
          <div className="  card-text  m-0 mr-3 ">
            {" "}
            What would you like to post today ?
          </div>
        </div>
        <div className="  card-Body">
          <form
            className=" d-flex flex-column justify-content-center "
            onSubmit={handleSubmit}
          >
            <div className="form-floating mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                ref={titleRef}
                required
              />
              <label>Title</label>
            </div>
            <div className="form-floating mt-3 mb-3">
              <textarea
                className=" form-control h-100"
                rows="5"
                ref={contentRef}
              />
              <label>content</label>
            </div>
            <button type="submit" className="btn btn-outline-info">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
