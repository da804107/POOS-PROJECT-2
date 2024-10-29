import React, { useState } from 'react';

function Login() {
    const [message, setMessage] = React.useState('');
    const [loginName, setLoginName] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');

    function doLogin(event:any) : void {
        event.preventDefault();

        alert('doIt() ' + loginName + ' ' + loginPassword);
    }

    function handleSetLoginName(e:any) : void {
        setLoginName( e.target.value );
    }

    function handleSetPassword(e:any) : void {
        setLoginPassword( e.target.value );
    }

    return(
        <div id="loginDiv">
            <span id="inner-title">LOGIN TO STUDY BUDDY</span><br />
            <input type="text" id="loginName" placeholder="Username"
            onChange={handleSetLoginName}/><br />
            <input type="text" id="loginPassword" placeholder="Password"
            onChange={handleSetPassword}/><br />
            <input type="submit" id="loginButton" className="buttons" value="Login"
            onClick={doLogin} />
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;