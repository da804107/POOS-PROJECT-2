import '../styles/Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [message, setMessage] = React.useState('');
    const [loginName, setLoginName] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const navigate = useNavigate();

    function doLogin() {
        navigate('/studySets');
    }

    function handleSetLoginName(e:any) : void {
        setLoginName( e.target.value );
    }

    function handleSetPassword(e:any) : void {
        setLoginPassword( e.target.value );
    }

    function doCreateAccount() {
        navigate('/newAccount');
    }

    return(
        <div id="loginDiv">
            <span id="inner-title">LOGIN TO STUDY BUDDY</span><br />
            <input type="text" id="loginName" placeholder="Username"
            onChange={handleSetLoginName}/><br />
            <input type="text" id="loginPassword" placeholder="Password"
            onChange={handleSetPassword}/><br />
            <div id="login-button-container">
            <input type="submit" id="loginButton" className="buttons" value="LOGIN"
            onClick={doLogin} />
            <input type="submit" id="createAccountButton" className="buttons" value="CREATE ACCOUNT"
            onClick={doCreateAccount} />
            </div>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;