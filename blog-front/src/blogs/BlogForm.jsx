import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBlog } from "../slices/blogSlice"
import { useNavigate } from "react-router-dom"
import { Button, TextField } from "@mui/material"
import { notify } from "../slices/notiSlice"

const BlogForm = () => {
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const handleChange = e => {
        setNewBlog({
            ...newBlog,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        e.preventDefault()
        dispatch(addBlog(newBlog))
        dispatch(notify(`A new blog ${newBlog.title} by ${newBlog.author} added`, 5))
        setNewBlog({title: '', author: '', url: ''})
        navigate('/')
    }

  return (
    <>
        <h1>Create a new blog</h1>
      <form onSubmit={handleSubmit}>
            <div>
                <TextField  label='Title' id="title" name="title" value={newBlog.title} onChange={handleChange}/>
            </div>
            <br />
            <div>
                <TextField  label='Author' id="author" name="author" value={newBlog.author} onChange={handleChange}/>
            </div>
            <br />
            <div>
                <TextField  label='Url' id="url" name="url" value={newBlog.url} onChange={handleChange}/>
            </div>
            <br />
            <Button variant="contained" type="submit">Create</Button>
            <Button style={{marginLeft: '10px'}}variant="contained" type="button" onClick={() => navigate('/')}>Cancel</Button>
      </form>
    </>
  )
}

export default BlogForm
