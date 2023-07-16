import PostEditor from "../Components/PostEditor";
import SideBar from "../Components/SideBar";
export default function CreatePostView() {
  return (
    <div className="container my-3 ">
      <div className=" row justify-content-md-center ">
        <div className="col-lg-8 col-12">
          <PostEditor />
        </div>
          <SideBar />
        
      </div>
    </div>
  );
}
