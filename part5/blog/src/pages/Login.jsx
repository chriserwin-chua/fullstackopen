import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

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
