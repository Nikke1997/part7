import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog } from "../slices/blogSlice";
import { useParams } from "react-router-dom";
import { TextField, Button, Grid } from '@mui/material';

const Comment = () => {
  const [comment, setComment] = useState({ comment: '' });
  const id = useParams().id;
  const dispatch = useDispatch();

  const handleComment = () => {
    dispatch(commentBlog(id, comment));
    setComment({ comment: '' });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          placeholder="Add a comment"
          value={comment.comment}
          onChange={(e) => setComment({ comment: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleComment}>Submit</Button>
      </Grid>
    </Grid>
  );
};

export default Comment;
