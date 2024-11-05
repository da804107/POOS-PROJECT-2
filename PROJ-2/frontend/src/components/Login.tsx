import '../styles/Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State for input values and messages
  const [message, setMessage] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  // Navigate to login page
  function doLogin(): void {
    navigate('/studySets');
  }

  // Track changes in the login name input
  function handleSetLoginName(e: React.ChangeEvent<HTMLInputElement>): void {
    setLoginName(e.target.value);
  }

  // Track changes in the password input
  function handleSetPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setLoginPassword(e.target.value);
  }

  // Navigate to create account page
  function doCreateAccount(): void {
    navigate('/newAccount');
  }

  return (
    <div className="center-text">
      <div className="small-square">
        <div className="center-text">
          <br />
          <br />
          <span className="large-text">Please Login</span>
          <br />
          <br />
          <input
            className="input-bar"
            type="text"
            placeholder="Username"
            value={loginName}
            onChange={handleSetLoginName}
          />
          <input
            className="input-bar"
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={handleSetPassword}
          />
          <button className="purple-buttons" onClick={doLogin}>
            Login
          </button>
          <button className="blue-buttons" onClick={doCreateAccount}>
            Sign Up
          </button>
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;