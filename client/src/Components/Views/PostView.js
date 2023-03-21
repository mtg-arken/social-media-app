import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import PostCard from "../PostCard";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import AddComments from "../AddComments";
import Comments from "../Comments";

function PostView() {
  const [post, setpost] = useState({});
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/GetPost/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setpost(data.data);
        setLoading(false);
      });
  }, [postId]);

  return (
    <>
      <div className="  container my-3 w-75">
        <a href=".." className=" mb-3">
          {" "}
          Go back to posts{" "}
        </a>

        <div className=" row justify-content-md-center ">
          <div className="col">
            {loading ? (
              <Loading />
            ) : (
              <div>
                <PostCard posts={post} />
                <AddComments />
                <Comments />
              </div>
            )}
          </div>
          <div className="col-3">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostView;
