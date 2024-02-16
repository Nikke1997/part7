import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

//initial state
const initialState = {
    blogs: []
}

//slice
export const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload
        }
    }
});

//Get all blogs
export const getAllBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs))
    }
}

// Like a blog
export const likeBlog = blog => {
    return async dispatch => {
        await blogService.update(blog.id, { ...blog, likes: blog.likes + 1})
        dispatch(getAllBlogs())
    }
}

//Comment a blog
export const commentBlog = (id, comment) => {
    return async dispatch => {
        await blogService.comment(id, comment)
        dispatch(getAllBlogs())
    }
}

// Add a blog
export const addBlog = blog => {
    return async dispatch => {
        await blogService.create(blog)
        dispatch(getAllBlogs())
    }
}

// Remove a blog
export const removeBlog = blog => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch(getAllBlogs())
    }
}

// Select all blogs
export const selectBlogs = state => state.blogs.blogs


//actions
export const { setBlogs } = blogSlice.actions

//reducer
export default blogSlice.reducer
