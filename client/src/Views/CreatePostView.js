
import PostEditor from "../Components/PostEditor";
import SideBar from "../Components/SideBar";
export default function CreatePostView(params) {
  return (
    <>
      <div className="  container my-3 ">
        <div className=" row justify-content-md-center ">
          <div className="col-8">
            {" "}
            <PostEditor />
          </div>
            <SideBar />
        </div>
      </div>
    </>
  );
}
