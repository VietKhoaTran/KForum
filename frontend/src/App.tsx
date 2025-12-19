import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import ForumPage from "./pages/ForumPage/ForumPage.tsx";
import PostPage from "./pages/PostPage/PostPage.tsx"

import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";

function App() {
  return (
    <Router basename="/KForum">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/topic" element={<PostPage/>}></Route>
        <Route element = {<ProtectedRoutes/>}>
          <Route path="/" element={<ForumPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
