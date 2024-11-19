import '../styles/CreateAccount.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccount(): JSX.Element {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function doCreateAccount(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();

        var obj = { Username: username, Password: password };
        var js = JSON.stringify(obj);

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
        } else {
            try {
                alert(`Creating account for ${username}`)

                const response = await fetch('http://localhost:5000/api/signup',
                    { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

                const res = await response.json();


                setMessage('Account Created Successfully!');
                // Navigate to the login page or another page if needed
                navigate('/');
            } catch (error: any) {
                alert(error.toString())
                return;
            }
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
                        BACK TO LOGIN
                    </button>
                    {message && <div className="message">{message}</div>}
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
