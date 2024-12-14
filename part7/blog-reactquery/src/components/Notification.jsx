import { useEffect } from 'react';
import { useNotificationDispatch, useNotificationValue } from '../contexts/NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();
  const { text, isDisplayed } = notification;
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  const dispatch = useNotificationDispatch();
  useEffect(() => {
    if (isDisplayed) {
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
    }
  }, [isDisplayed]);

  if (!isDisplayed) return null;

  return <div style={style}>{text}</div>;
};

export default Notification;
