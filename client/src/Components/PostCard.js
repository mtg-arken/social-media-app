import { Post } from "./Post";

export default function PostCard(props) {
  return props.posts.map((post, i) =>
    post.post ? (
      <Post post={post.post} setPosts={props.setPosts} key={i} />
    ) : (
      <Post post={post} setPosts={props.setPosts} key={i} />
    )
  );
}
