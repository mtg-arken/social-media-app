import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";
import AddComments from "../AddComments";
import Comments from "../Comments";
import PostCard from "../PostCard";

function PostView() {
  const [post, setPost] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/GetPost/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost([data.data]);
        setLoading(false);
      });
  }, [postId]);

  return (
    <>
      <div className="  container my-3 w-75">
        <Link to="/" className=" mb-3">
          
          Go back to posts{" "}
        </Link>

        <div className=" row justify-content-md-center ">
          <div className="col">
            {loading ? (
              <Loading />
            ) : (
              <div>
                <PostCard posts={post} setPosts={setPost} />
                <AddComments />
                <Comments />
              </div>
            )}
          </div>
          <div className="col-3">
            <SideBar  />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostView;
