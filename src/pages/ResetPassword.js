import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Extract the token from the URL query parameters
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('user/public/resetPassword', null, {
                params: { token, newPassword },
            });
            toast.success("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate('/login'), 3000); // Use navigate instead of history.push
        } catch (error) {
            toast.error("The token may be invalid or expired.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1em', textAlign: 'center' }}>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1em' }}>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        style={{ width: '100%', padding: '0.5em' }}
                    />
                </div>
                <div style={{ marginBottom: '1em' }}>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                        style={{ width: '100%', padding: '0.5em' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5em 1em' }}>Send</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;