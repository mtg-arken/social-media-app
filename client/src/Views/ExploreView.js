import PostBrowser from "../Components/PostBrowser";
import SideBar from "../Components/SideBar";

export default function ExploreView() {
  return (
    <div className=" container my-3 ">
      <div className=" row justify-content-center  ">
        <div className=" col-9">
          <PostBrowser />
        </div>
        <SideBar />
      </div>
    </div>
  );
}
