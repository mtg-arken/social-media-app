import { useEffect, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import PostCard from "./PostCard";

export default function PostBrowser() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams("")
  const [sort, setSort] = useState("latest");
  const Sorts = ["latest", "comments", "likes", "earliest"];
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/posts/GetPosts?sortBy=${searchParams.get(
        "sortBy"
      )}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setLoading(false);
      });
  }, [searchParams, sort, setPosts]);
  const handleSort = (e) => {
    setSort(e.target.value);
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
console.log(posts,'post Browser')
  return (
    <Stack>
      <Card className=" mb-3 d-flex  flex-row justify-content-between p-2">
        <button
          type="button"
          className="btn btn-secondary "
          onClick={() => navigate("/posts/create")}
        >
          + New Post
        </button>

        <div className=" d-flex  align-items-center w-25 justify-content-around">
          <div className="mb-3">
            <label className="form-label">Sort by</label>
            <select value={sort} onChange={(e) => handleSort(e)}>
              {Sorts.map((elem, i) => {
                return (
                  <option value={elem} key={i}>
                    {elem}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </Card>
      {loading ? <Loading /> : <PostCard posts={posts} setPosts={setPosts} />}
    </Stack>
  );
}
