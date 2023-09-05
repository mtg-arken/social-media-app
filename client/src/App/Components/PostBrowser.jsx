import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "./ui/Loader";
import PostCard from "./PostCard";
import { getPosts } from "../Services/Http/api";
import OptionsBar from "./OptionsBar";

export default function PostBrowser() {
  let [searchParams] = useSearchParams("");
  const [sort, setSort] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modifying, setModifying] = useState(false);

  const fetchPosts = async () => {
    const response = await getPosts(searchParams.get("sortBy"));
    const data = response.data;
    setPosts(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, [sort, ]);
  useEffect(() => {
    if(modifying){
      fetchPosts()
      setModifying(false)
    }
  }, [posts,modifying])
  


  return (
    <div className="d-flex flex-column ">
      <OptionsBar sort={sort} setSort={setSort} />
      {loading ? <Loader /> : <PostCard posts={posts} setPosts={setPosts} setModifying={setModifying}  />}
    </div>
  );
}
