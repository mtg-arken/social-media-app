import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "./ui/Loader";
import PostCard from "./PostCard";
import SortBy from "./SortBy";
import { getPosts } from "../Services/api";

export default function PostBrowser() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams("");
  const [sort, setSort] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts(searchParams.get("sortBy"));
      const data = response.data;
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [searchParams, sort, setPosts]);

  return (
    <div className="d-flex flex-column ">
      <div className=" card mb-3 d-flex  flex-row justify-content-between p-2">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => navigate("/posts/create")}
        >
          + New Post
        </button>
        <SortBy sort={sort} setSort={setSort} />
      </div>
      {loading ? <Loader /> : <PostCard posts={posts} setPosts={setPosts} />}
    </div>
  );
}
