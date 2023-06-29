import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import SideBar from "../Components/SideBar";
import Loader from "../Components/ui/Loader";
import AddComments from "../Components/AddComments";
import Comments from "../Components/Comments";
import PostCard from "../Components/PostCard";
import { GetPost, GetPostComments } from "../Services/api";

function PostView() {
  const [post, setPost] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(null);

  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      let response = await GetPost(postId);
      if (response.error) alert(response.error);
      else {
        setPost([response.data]);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      let response = await GetPostComments(postId);
      if (response.error) alert(response.error);
      else {
        setComments(response.data);
      }
    };
    fetchComments();
  }, [postId, post]);

  return (
    <div className="  container my-3 ">
      <div className=" row justify-content-md-center ">
        <div className="col-8">
          <Link to="/" className=" mb-3">
            Go back to posts{" "}
          </Link>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <PostCard post={post} setPost={setPost} />
              <AddComments setPost={setPost} />
              <Comments
                comments={comments}
                setComments={setComments}
                setPost={setPost}
              />
            </div>
          )}
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default PostView;
