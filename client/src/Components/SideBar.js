import Stack from "react-bootstrap/Stack";
import TopPosts from "./TopPosts";
import FindUsers from "./FindUsers";
import Footer from "./Footer";

export default function SideBar(params) {
  return (
    <Stack>
      <TopPosts />
      <FindUsers />
      <Footer />
    </Stack>
  );
}
