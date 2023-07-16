import FindUsers from "../Components/FindUsers";
import Footer from "../Components/Footer";
import Profile from "../Components/Profile";
import ProfileTabs from "../Components/ProfileTabs";
import PostCard from "../Components/PostCard";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  GetUserComments,
  GetUserLikedPosts,
  GetUserPosts,
} from "../Services/api";
import OptionsBar from "../Components/OptionsBar";

export default function ProfileView() {
  const { userId } = useParams();
  const [tab, setTab] = useState("Posts");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [sort, setSort] = useState("latest");
  const [modifying, setModifying] = useState(false);

  const fetchUserLikedPosts = async () => {
    let response = await GetUserLikedPosts(userId);
    if (response.error) alert(response.error);
    else {
      console.log(response.data, "like");
      setPosts(response.data);
    }
  };
  const fetchUserComments = async () => {
    let response = await GetUserComments(userId);
    if (response.error) alert(response.error);
    else {
      setComments(response.data);
    }
  };
  const fetchUserPosts = async () => {
    let response = await GetUserPosts(userId);
    if (response.error) alert(response.error);
    else {
      console.log("posts");
      setPosts(response.data);
    }
  };
  useEffect(() => {
    if (tab === "Posts") {
      fetchUserPosts();
    } else if (tab === "Liked") {
      fetchUserLikedPosts();
    } else if (tab === "Comments") {
      fetchUserComments();
    }
  }, [userId, tab]);
  useEffect(() => {
    if (modifying) {
      fetchUserPosts();
      setModifying(false);
    }
  }, [posts, modifying]);

  useEffect(() => {
    if (modifying) {
      fetchUserComments();
      setModifying(false);
    }
  }, [comments, modifying]);

  let tabs = {
    Posts: posts.length ? (
      <PostCard posts={posts} setPosts={setPosts} setModifying={setModifying} />
    ) : (
      <h3>no posts yet </h3>
    ),
    Liked: posts.length ? (
      <PostCard posts={posts} setPosts={setPosts} setModifying={setModifying}  />
    ) : (
      <h3>no liked posts yet </h3>
    ),
    Comments: comments.length ? (
      comments.map((comment, i) => (
        <div className="card my-3  " style={{ background: "#DCDCDC" }} key={i}>
          <div className="card-body ml-1 py-0 d-flex flex-column">
            <Link to={`/post/view/${comment.postID._id}`}>
              {comment.postID.title}
            </Link>
            <Moment fromNow className=" text-secondary">
              {comment.createdAt}
            </Moment>

            <p>{comment.Content}</p>
          </div>
        </div>
      ))
    ) : (
      <h3>no comments yet </h3>
    ),
  };

  return (
    <div className=" container-lg my-3   ">
      <div className=" row justify-content-md-center ">
        <div className=" col-lg-8">
          <div className=" d-lg-none my-2">
            <Profile />
          </div>
          <ProfileTabs tab={tab} setTab={setTab} />
          <OptionsBar sort={sort} setSort={setSort} />
          {tabs[tab]}
        </div>
        <div className="col-3">
          <div className="d-lg-flex  d-none flex-column">
            <Profile />
            <FindUsers />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
