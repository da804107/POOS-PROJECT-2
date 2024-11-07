import '../styles/CreateAccount.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccount(): JSX.Element {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    function doCreateAccount(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
        } else {
            alert(`Creating account for ${username}`);
            setMessage('Account Created Successfully!');
            // Navigate to the login page or another page if needed
            navigate('/login');
        }
    }

    function doBackToHome(): void {
        navigate('/');
      }

    function handleSetUsername(e: React.ChangeEvent<HTMLInputElement>): void {
        setUsername(e.target.value);
    }

    function handleSetPassword(e: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(e.target.value);
    }

    function handleSetConfirmPassword(e: React.ChangeEvent<HTMLInputElement>): void {
        setConfirmPassword(e.target.value);
    }

    return (
        <div className="center-text">
            <div className="small-square">
                <div className="center-text">
                    <span className="large-text">CREATE AN ACCOUNT</span>
                    <br />
                    <input
                        className="input-bar"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleSetUsername}
                    />
                    <input
                        className="input-bar"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleSetPassword}
                    />
                    <input
                        className="input-bar"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleSetConfirmPassword}
                    />
                    <button className="purple-buttons" onClick={doCreateAccount}>
                        CREATE ACCOUNT
                    </button>
                    <button className="blue-buttons" onClick={doBackToHome}>
                        Back to Login
                    </button>
                    {message && <div className="message">{message}</div>}
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;