import { useDispatch, useSelector } from "react-redux";
import { removeBlog, selectBlogs } from "../slices/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { notify, notifyError } from "../slices/notiSlice";

const DeleteBlog = () => {
const id = useParams().id;

const dispatch = useDispatch();

const navigate = useNavigate();

const blogs = useSelector(selectBlogs);

const blog = blogs.find((blog) => blog.id === id);

const handleDelete = async (e) => {
  e.preventDefault();
  try {
    if (window.confirm(`Do you want to delete ${blog.title}`)) {
      await dispatch(removeBlog(blog));
      dispatch(notify(`${blog.title} blog deleted`, 5));
      navigate("/");
    }
  } catch (error) {
    dispatch(notifyError("You cannot delete other peoples blogs", 5));
  }
};


  return (
    <>
      <Button variant='contained' onClick={handleDelete}>Delete</Button>
    </>
  )
}

export default DeleteBlog
