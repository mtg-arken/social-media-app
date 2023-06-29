import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { createPost } from "../Services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";

//creating post
export default function PostEditor() {
  const titleRef = useRef();
  const contentRef = useRef();
  const navigate=useNavigate();
  const { user } = useContext(UserContext);


  async function handleSubmit(e) {
    e.preventDefault();
    let response = await createPost(
      titleRef.current.value,
      contentRef.current.value
    )
    response.error ? alert(response.error) :( navigate(`/Profile/${user._id}`)) 
  }
  return (
    <>
      <div className="mb-3">
        <Link to="/">&lt;&lt; Go back to posts</Link>
      </div>

      <div className=" card">
        <div className="  card-Body d-flex  justify-content-center align-items-center">
          <div className=" card-text mt-3">
            What would you like to post today {user.username} ?
          </div>
        </div>
        <div className="  card-Body">
          <form
            className=" d-flex flex-column justify-content-center m-2 "
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
            <button type="submit" className="btn btn-outline-primary" >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
