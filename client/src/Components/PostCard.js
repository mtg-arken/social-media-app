import { Post } from "./Post";

export default function PostCard(props) {
  return props.posts.map((post, i) => (
    <Post post={post} setPosts={props.setPosts}  key={i} />
  ));
}
