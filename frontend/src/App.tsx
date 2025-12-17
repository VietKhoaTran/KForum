import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/AuthPage.tsx";
import Forum from "./pages/Forum.tsx"

import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";

function App() {
  return (
    <Router basename="/KForum">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element = {<ProtectedRoutes/>}>
          <Route path="/forum" element={<Forum />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
