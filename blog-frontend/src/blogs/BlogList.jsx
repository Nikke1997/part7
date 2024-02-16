import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import LogOut from '../logout/LogOut'
import { getAllBlogs, selectBlogs } from '../slices/blogSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

const BlogList = () => {
const user = useSelector(selectUser)
const dispatch = useDispatch()
const blogs = useSelector(selectBlogs)


useEffect(() => {
  dispatch(getAllBlogs())
}, [dispatch])



  return (
    <>
    <h1>Welcome {user.username}</h1>
    <h2>Blogs</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
    {blogs.map(blog => 
    <TableRow key={blog.id}>
    <TableCell><Link to={`/blog/${blog.id}`} >{blog.title}</Link></TableCell>
    <TableCell>User: {blog.user.username}</TableCell>
    </TableRow>)}
    </TableBody>
    </Table>
    </TableContainer>
    <Link to="/form"><Button style={{marginTop: '10px'}} variant='contained'>Create</Button></Link>
    <LogOut />
    </>
  )
}

export default BlogList