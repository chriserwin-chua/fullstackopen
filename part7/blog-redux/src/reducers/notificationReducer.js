import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationText: '',
  duration: 0,
  type: 'error'
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotificationMessage(state, action) {
      const { message, duration, type } = action.payload;
      return {
        ...state,
        notificationText: message,
        duration: duration * 1000, //convert to millisecond
        type: type
      };
    },
    hideNotificationMessage(state, action) {
      return { ...state, notificationText: '', duration: 0 };
    }
  }
});
export const { addNotificationMessage, hideNotificationMessage } = notificationSlice.actions;

export const setNotification = (message, duration, type) => {
  return async (dispatch) => {
    dispatch(addNotificationMessage({ message, duration, type }));
  };
};
export default notificationSlice.reducer;
