import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';
const initialState = {
  token: '',
  name: '',
  username: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { token, name, username } = action.payload;
      return { ...state, token, name, username };
    }
  }
});
export const { setUser } = userSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const result = await loginService.loginUser({ username, password });
    if (result.status === 401) {
      dispatch(setNotification('Invalid username or Password', 5, 'error'));
    } else {
      dispatch(setUser({ ...result }));
      localStorage.setItem('token', JSON.stringify(result));
      blogService.setToken(result.token);
      setUser(result);
    }
  };
};
export default userSlice.reducer;
