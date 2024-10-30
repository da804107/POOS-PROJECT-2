import '../styles/CreateAccount.css';
import React, { useState } from 'react';

function CreateAccount() {
    const [message, setMessage] = React.useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function doCreateAccount(event:any) : void {
        event.preventDefault();

        if(password != confirmPassword){
            setMessage('Passwords do not match!');
        } else{
            alert('doIt() ' + username + ' ' + password);
            setMessage('Account Created Successfully!')
        }
    }

    function handleSetUsername(e:any) : void {
        setUsername( e.target.value );
    }

    function handleSetPassword(e:any) : void {
        setPassword( e.target.value );
    }

    function handleSetConfirmPassword(e:any) : void {
        setConfirmPassword( e.target.value );
    }

    return(
        <div id="loginDiv">
            <span id="inner-title">CREATE AN ACCOUNT</span><br />
            <input type="text" id="username" placeholder="Username"
            onChange={handleSetUsername}/><br />
            <input type="text" id="password" placeholder="Password"
            onChange={handleSetPassword}/><br />
            <input type="text" id="confirmPassword" placeholder="Confirm Password"
            onChange={handleSetConfirmPassword}/><br />
            <input type="submit" id="createAccountButton" className="buttons" value="CREATE ACCOUNT"
            onClick={doCreateAccount} />
            <span id="createAccountResult">{message}</span>
        </div>
    );
};

export default CreateAccount;