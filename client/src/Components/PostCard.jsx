import { Post } from "./Post";

export default function PostCard(props) {
  return props.post ? (
    <Post post={props.post} setPosts={props.setPosts} setModifying={props.setModifying}  />
  ) : (
    props.posts.map((post, i) => (
      <Post
        post={post.post ? post.post : post}
        setPosts={props.setPosts}
        key={i}
        setModifying={props.setModifying} 
      />
    ))
  );
}
