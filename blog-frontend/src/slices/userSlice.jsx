import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import loginService from "../services/login";
import blogService from "../services/blogs";

//initial state
const initialState = {
  users: [],
  user: null,
};

//slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

// Get users
export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

// Login user
export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

// Select all users
export const selectUsers = (state) => state.users.users;

// Select a user
export const selectUser = (state) => state.users.user;

//actions
export const { setUser, setUsers } = userSlice.actions;

//reducer
export default userSlice.reducer;
