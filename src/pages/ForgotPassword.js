import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail('');

        try {
            const response = await axios.post('/user/public/forgotPassword', null, {
                params: { email: email },
            });
            if(response.data == 'User not found.') setMessage('You are not a Valid User.');
            else toast.success('Password reset link has been sent to your email.');
        } catch (error) {
            toast.error('Error: Could not send reset link. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1em', textAlign: 'center' }}>
            <h2>Forgot Password</h2>
            <h3>Please enter you registered email to reset your Password.</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1em' }}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{ width: '100%', padding: '0.5em' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5em 1em' }}>Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;