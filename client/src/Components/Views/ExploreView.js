import PostBrowser from "../PostBrowser";
import SideBar from "../SideBar";

export default function ExploreView(params) {
  return (
    <>
      <div className=" Container my-3 " style={{marginLeft:" 100px",marginRight:" 100px"}}>
        <div className=" row justify-content-md-center ">
          <div className=" col-8">
            <PostBrowser />
          </div>
          <div className=" col-3">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}
