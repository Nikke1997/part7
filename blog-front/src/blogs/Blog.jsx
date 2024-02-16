import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllBlogs, likeBlog, selectBlogs } from "../slices/blogSlice";
import DeleteBlog from "../delete/DeleteBlog";
import { useEffect } from "react";
import Comment from "./Comment";
import { Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';

const Blog = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const blog = blogs.find((blog) => blog.id === id);

  useEffect(() => {
    if (!blog) {
      dispatch(getAllBlogs());
    }
  } , [dispatch, blog]);

  if(!blog) {
    return null;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog));
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1">{blog.title}</Typography>
            <Typography variant="subtitle1" component="p">Author: {blog.author}</Typography>
            <Typography variant="body1" component="p">URL: {blog.url}</Typography>
            <Typography variant="body2" component="p">Username: {blog.user.username}</Typography>
            <Typography variant="body2" component="p">Likes: {blog.likes}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={handleLike}>Like</Button>
            <Link to="/"><DeleteBlog blog={blog} /></Link>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2">Comments</Typography>
        <Comment />
        <br />
        {blog.comments.map(comment => (
          <Card key={comment._id}>
            <CardContent>
              <Typography variant="body1" component="p">{comment.comment}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default Blog;
