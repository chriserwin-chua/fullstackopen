import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationText: '',
  duration: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotificationMessage(state, action) {
      const { message, duration } = action.payload;
      return {
        ...state,
        notificationText: message,
        duration: duration * 1000, //convert to millisecond
      };
    },
    hideNotificationMessage(state, action) {
      return { ...state, notificationText: '', duration: 0 };
    },
  },
});
export const { addNotificationMessage, hideNotificationMessage } =
  notificationSlice.actions;

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(addNotificationMessage({ message, duration }));
  };
};
export default notificationSlice.reducer;
