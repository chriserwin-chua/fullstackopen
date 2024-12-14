import { useDispatch, useSelector } from 'react-redux';
import { hideNotificationMessage } from '../reducers/notificationReducer';
import { useEffect } from 'react';
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const { notificationText, duration, type } = notification;

  useEffect(() => {
    if (duration > 0) {
      setTimeout(() => {
        dispatch(hideNotificationMessage());
      }, duration);
    }
  }, [duration]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  if (!duration) {
    return null;
  }
  return (
    <div style={style} className={type == 'error' ? 'error' : 'success'}>
      {notificationText}
    </div>
  );
};

export default Notification;
