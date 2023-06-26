import TopPosts from "./TopPosts";
import FindUsers from "./FindUsers";
import Footer from "./Footer";

export default function SideBar(params) {
  return (
    <div className=" col-3  d-flex flex-column">         

      <TopPosts />
      <FindUsers />
      <Footer />
    </div>
  );
}
