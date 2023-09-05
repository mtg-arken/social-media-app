import { useEffect, useState } from "react";
import { IoStatsChart } from "react-icons/io5";
import { GetTopPosts } from "../Services/Http/api";
import { Post } from "./Post";

export default function TopPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let fetchTopPosts=async()=>{
      let response = await GetTopPosts()
      if(response.error) alert (response.error)
      else {
        setPosts(response.data)
      }
    }
    fetchTopPosts()
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
          setPosts={setPosts}
        />
      ))}
    </>
  );
}
