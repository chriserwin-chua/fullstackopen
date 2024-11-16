import React from 'react';

const Notification = ({ message, notificationType }) => {
  if (!message) {
    return null;
  }
  return (
    <div className={notificationType == 'error' ? 'error' : 'success'}>
      {message}
    </div>
  );
};

export default Notification;
