import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Add this line

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/forgot-password', { email });
            setMessage(res.data.message);
        } catch (error) {
            setMessage('Failed to send reset password email');
            console.error('Error sending reset password email:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative overflow-hidden">
                <div className="absolute top-0 right-0 -z-10">
                    <img src="wave.svg" alt="Wave Background" className="w-full h-full object-cover" />
                </div>
                <div className="text-center mb-6">
                    <img src="logo.png" alt="Logo" className="mx-auto mb-4 w-20 h-auto" />
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">Reset Your Password</h2>
                    <p className="text-gray-600 text-sm mb-4">Enter your email to receive a password reset link.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700 font-medium">Email Address</label>
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white p-2 rounded-md mt-4 hover:bg-purple-700 transition flex items-center justify-center"
                    >
                        <img
                            src="reset.svg" // Ensure this path is correct
                            alt="Reset Icon"
                            className="w-5 h-5 mr-2"
                        />
                        Send Reset Link
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500 text-sm">{message}</p>}
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">Remembered your password?</p>
                    <Link to="/login" className="text-blue-500 hover:underline font-medium">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
