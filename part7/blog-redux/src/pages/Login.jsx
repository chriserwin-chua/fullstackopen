import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (username, password) => {
    try {
      dispatch(loginUser(username, password));
      navigate('/');
    } catch (e) {
      if (e.response.status === 401) {
        dispatch(setNotification('Invalid username or Password', 5, 'error'));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div>
      <h1>login to application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            data-testid="username"
          />
        </div>
        <div>
          password:
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            data-testid="password"
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
