import { Post } from "./Post";

export default function PostCard(props) {
  const { posts } = props;
  if (!Array.isArray(posts) ) {
    return <Post post={posts} />;
  }

  return posts.map((post, i) => <Post post={post} key={i} />);
}
