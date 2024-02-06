import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import LogOut from "./components/LogOut";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { notify, notifyError } from "./features/notiSlice";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogAdded, setBlogAdded] = useState(false);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  // Add blog
  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      await blogService.create(newBlog).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setBlogAdded(true);
        dispatch(notify(`A new blog ${newBlog.title} by ${newBlog.author} added`, 5));
      });
    } catch (exception) {
      dispatch(notifyError("Error adding blog", 5));
    }
  };

  // Get all blogs
  useEffect(() => {
    const fetchData = async () => {
      const fetchedBlogs = await blogService.getAll();
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    fetchData();
    setBlogAdded(false);
  }, [blogAdded]);

  // Get user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  //Like blog
  const handleLike = async (blog) => {
    try {
      const updated = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      });
      setBlogAdded(true);
    } catch (exception) {
      console.log("error");
    }
  };

  //Remove blog
  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        dispatch(notifyError(`Blog ${blog.title} by ${blog.author} removed`, 5));
      } catch (exception) {
        console.log("error");
      }
    }
  };

  // Login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      dispatch(notify("Logged in successfully", 5));
    } catch (exception) {
      dispatch(notifyError("Wrong credentials", 5));
    }
  };

  return (
    <div>
      <div className="notification">
        <Notification />
      </div>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUserNameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      )}
      {user && (
        <div>
          <div className="bloglist">
            <LogOut />
            <h2>Blogs</h2>
            <section className="bareBlogs">
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  handleLike={() => handleLike(blog)}
                  handleRemove={() => handleRemove(blog)}
                />
              ))}
            </section>
          </div>

          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <div className="blogform">
              <p>Logged in as {user.username} </p>
              <BlogForm addBlog={addBlog} />
            </div>
          </Togglable>
        </div>
      )}
    </div>
  );
};
export default App;
