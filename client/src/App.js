import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

import ExploreView from "./Components/Views/ExploreView";

import SignUpView from "./Components/Views/SignUpView";
import LogInView from "./Components/Views/LogInView";
import CreatePostView from "./Components/Views/CreatePostView";
import MessangerView from "./Components/Views/MessangerView";
import PostView from "./Components/Views/PostView";
import ProfileView from "./Components/Views/ProfileView";
import NavBar from "./Components/NavBar";
import ErrorView from "./Components/Views/ErrorView";
export const UserContext = createContext();
export const PostsContext = createContext();


function App() {
  const [user, setUser] = useState({});

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="*" element={<WrappedRoutes />} />
          <Route path="/SingUp" element={<SignUpView />} />
          <Route path="/LogIn" element={<LogInView />} />
        </Routes>
      </UserContext.Provider>
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
