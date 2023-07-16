import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./Context/UserProvider";
import AppRoutes from "./routes/Index";

function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
}

export default App;
