import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";
import CategoriesList from "./pages/CategoriesList";
import RequireAuth from "./components/RequireAuth";
import Unauthorised from "./pages/Unauthorised";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryEdit from "./pages/CategoryEdit";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorised" element={<Unauthorised />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<PostsList />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/create" element={<PostCreate />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/category/create" element={<CategoryCreate />} />
          <Route path="/category/edit/:id" element={<CategoryEdit />} />
        </Route>
      </Routes>
    </Layout>
  );
}
