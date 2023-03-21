import { useEffect, useState } from "react";
import { IoStatsChart } from "react-icons/io5";
import { Post } from "./Post";

export default function TopPosts(params) {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/posts/GetTopPosts")
      .then((res) => res.json())
      .then((data) => setposts(data.data));
  }, []);
  return (
    <>
      <div className=" card mb-3 ">
        <div className=" d-flex card-body align-items-center justify-content-center  ">
          <IoStatsChart />
          <div className=" d-flex card-text ml-2 ">Top Posts</div>
        </div>
      </div>
      {posts.map((post, i) => (
        <Post
          post={post}
          key={i}
          top={true}
          Style={
            " d-flex flex-column  col-2  px-2 py-0 justify-content-start align-items-center justify-content-evenly"
          }
        />
      ))}
    </>
  );
}
