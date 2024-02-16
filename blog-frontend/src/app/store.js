import { configureStore } from '@reduxjs/toolkit';
import blogSlice from '../slices/blogSlice';
import userSlice from '../slices/userSlice';
import notiSlice from '../slices/notiSlice';


export const store = configureStore({
    reducer: {
        blogs: blogSlice,
        users: userSlice,
        notification: notiSlice
    },
});