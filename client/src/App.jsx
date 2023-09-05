import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./App/Context/UserProvider";
import AppRoutes from "./App/routes/Index";

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
