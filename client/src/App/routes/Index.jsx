import { Route, Routes } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CreatePostView from "../Views/CreatePostView";
import ErrorView from "../Views/ErrorView";
import ExploreView from "../Views/ExploreView";
import LogInView from "../Views/LogInView";
import MessengerView from "../Views/MessengerView";
import PostView from "../Views/PostView";
import ProfileView from "../Views/ProfileView";
import SignUpView from "../Views/SignUpView";

function WrappedRoutes() {
  return (
    <NavBar>
      <Routes>
        <Route path="/" element={<ExploreView />} />
        <Route path="/posts/create" element={<CreatePostView />} />
        <Route path="/post/view/:postId" element={<PostView />} />
        <Route path="/Messenger" element={<MessengerView />} />
        <Route path="/Profile/:userId" element={<ProfileView />} />
        <Route path="*" element={<ErrorView />} />
      </Routes>
    </NavBar>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<WrappedRoutes />} />
      <Route path="/SingUp" element={<SignUpView />} />
      <Route path="/LogIn" element={<LogInView />} />
    </Routes>
  );
}
