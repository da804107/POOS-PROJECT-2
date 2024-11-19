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
    
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }
    
        const userData = { username, password }; // Use lowercase keys for backend consistency
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/signup', requestOptions);
    
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Signup failed');
            }
    
            const res = await response.json();
            setMessage('Account Created Successfully!');
            setTimeout(() => navigate('/'), 2000); // Redirect to login after a delay
        } catch (error: any) {
            console.error('Error during signup:', error);
            setMessage(error.message || 'Failed to create account. Please try again.');
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
