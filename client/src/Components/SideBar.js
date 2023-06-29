import TopPosts from "./TopPosts";
import FindUsers from "./FindUsers";
import Footer from "./Footer";

export default function SideBar(params) {
  return (
    <div className=" col-3  d-md-flex d-none flex-column ">         
      <TopPosts />
      <FindUsers />
      <Footer />
    </div>
  );
}
