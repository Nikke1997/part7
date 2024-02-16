import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllUsers, selectUsers } from "../slices/userSlice";
import { useEffect } from "react";
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const UserBlogs = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const user = users.find((user) => user.id === id);

  useEffect(() => {
    if (!user) {
      dispatch(getAllUsers());
    }
  }, [dispatch, user]);

  if (!user) {
    return null;
  }

  return (
    <div>
     <Typography variant="h4" gutterBottom>{`${user.username}'s Blogs`}</Typography>
      {user.blogs.length === 0 ? (
        <Typography variant="body1">No blogs</Typography>
      ) : (
        <List>
          {user.blogs.map((blog) => (
            <div key={blog.id}>
              <ListItem>
                <Link to={`/blog/${blog.id}`}><ListItemText primary={blog.title} /></Link>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </div>
  );
};

export default UserBlogs;
