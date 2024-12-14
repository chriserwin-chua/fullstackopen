import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlog(state, action) {
      return action.payload;
    }
  }
});
export const { appendBlog, setBlog } = blogSlice.actions;

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (content) => {
  return async (dispatch) => {
    await blogService.likeBlog(content);
    dispatch(initializeBlog());
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(initializeBlog());
  };
};

export const commentBlog = (content, comment) => {
  return async (dispatch) => {
    await blogService.commentBlog(content, comment);
    dispatch(initializeBlog());
  };
};

export default blogSlice.reducer;
