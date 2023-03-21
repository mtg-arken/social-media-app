import ExploreView from "./Components/Views/ExploreView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpView from "./Components/Views/SignUpView";
import LogInView from "./Components/Views/LogInView";
import CreatePostView from "./Components/Views/CreatePostView";
import MessangerView from "./Components/Views/MessangerView";
import PostView from "./Components/Views/PostView";
import ProfileView from "./Components/Views/ProfileView";
import NavBar from "./Components/NavBar";
import ErrorView from "./Components/Views/ErrorView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<WrappedRoutes />} />
        <Route path="/SingUp" element={<SignUpView />} />
        <Route path="/LogIn" element={<LogInView />} />
      </Routes>
    </Router>
  );
}

function WrappedRoutes() {
  return (
    <NavBar>
      <Routes>
        <Route path="/" element={<ExploreView />} />
        <Route path="/posts/create" element={<CreatePostView />} />
        <Route path="/post/view/:postId" element={<PostView />} />
        <Route path="/Messanger" element={<MessangerView />} />
        <Route path="/users/Profile" element={<ProfileView />} />
        <Route path="*" element={<ErrorView />} />
      </Routes>
    </NavBar>
  );
}

export default App;
