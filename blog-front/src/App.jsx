import { useEffect } from "react";
import { selectUser, setUser } from "./slices/userSlice";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import BlogList from "./blogs/BlogList";
import BlogForm from "./blogs/BlogForm";
import LoginForm from "./login/LoginForm";
import NavMenu from "./nav/NavMenu";
import Users from "./users/Users";
import Blog from "./blogs/Blog";
import UserBlogs from "./users/UserBlogs";
import Notification from "./notification/Notification";



function App() {
  const dispatch = useDispatch();

  const loggedUser = useSelector(selectUser);

  // Check if user is logged in and set token
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  return (
    <>
        {loggedUser ? (
          <>
          <Notification />
            <NavMenu />
            <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/form" element={<BlogForm />} />
            <Route path="/users" element={<Users />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/userblogs/:id" element={<UserBlogs />} />
            </Routes>
          </>
        ) : (
          <Routes>
          <Route path="/" element={<LoginForm />} />
      </Routes>
        )}
    </>
  );
}

export default App;
