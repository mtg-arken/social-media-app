import { Post } from "./Post";

export default function PostCard(props) {
  return props.post ? (
    <Post post={props.post} setPosts={props.setPosts} />
  ) : (
    props.posts.map((post, i) => (
      <Post post={post} setPosts={props.setPosts} key={i} />
    ))
  );
}
