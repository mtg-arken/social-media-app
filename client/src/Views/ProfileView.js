import FindUsers from "../Components/FindUsers";
import Footer from "../Components/Footer";
import Profile from "../Components/Profile";
import ProfileTabs from "../Components/ProfileTabs";
import PostCard from "../Components/PostCard";
import SortBy from "../Components/SortBy";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  GetUserComments,
  GetUserLikedPosts,
  GetUserPosts,
} from "../Services/api";

export default function ProfileView() {
  const { userId } = useParams();
  const [tab, setTab] = useState("Posts");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    if (tab === "Posts") {
      const fetchUserPosts = async () => {
        let response = await GetUserPosts(userId);
        if (response.error) alert(response.error);
        else {
          setPosts(response.data);
        }
      };
      fetchUserPosts();
    } else if (tab === "Liked") {
      const fetchUserLikedPosts = async () => {
        let response = await GetUserLikedPosts(userId);
        if (response.error) alert(response.error);
        else {
          setPosts(response.data);
        }
      };
      fetchUserLikedPosts();
    } else if (tab === "Comments") {
      const fetchUserComments = async () => {
        let response = await GetUserComments(userId);
        if (response.error) alert(response.error);
        else {
          setComments(response.data);
        }
      };
      fetchUserComments();
    }
  }, [userId, tab]);
  let tabs = {
    Posts: posts.length ? (
      <PostCard posts={posts} setPosts={setPosts} />
    ) : (
      <h3>no posts yet </h3>
    ),
    Liked: posts.length ? (
      <PostCard posts={posts} setPosts={setPosts} />
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
    <div className=" container my-3   ">
      <div className=" row justify-content-md-center ">
        <div className=" col-8">
          {" "}
          <ProfileTabs tab={tab} setTab={setTab} />
          <div className=" card d-flex flex-row   align-items-center p-2 ">
            <SortBy  sort={sort} setSort={setSort}/>
          </div>
          {tabs[tab]}
        </div>
        <div className="col-3">
          <div className="d-flex flex-column">
            <Profile />
            <FindUsers />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
