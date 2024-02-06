import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {
    message: null,
    errorMessage: null,
  },
};

export const notiSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.messages.message = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.messages.errorMessage = action.payload;
    },
  },
});

export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(setMessage(null));
    }, time * 1000);
  };
};

export const notifyError = (message, time) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(message));
    setTimeout(() => {
      dispatch(setErrorMessage(null));
    }, time * 1000);
  };
};

export const { setMessage, setErrorMessage } = notiSlice.actions;
export default notiSlice.reducer;
