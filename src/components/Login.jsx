import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Add this line

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setMessage(res.data.message);
            toast.success('Login successful! Redirecting to your dashboard...');
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage('Invalid email or password. Please try again.');
                    toast.error('Invalid email or password.');
                } else {
                    setMessage(error.response.data.message || 'An error occurred. Please try again later.');
                    toast.error(error.response.data.message || 'An error occurred. Please try again later.');
                }
            } else if (error.request) {
                setMessage('Network error. Please check your connection and try again.');
                toast.error('Network error. Please check your connection and try again.');
            } else {
                setMessage('An unexpected error occurred. Please try again later.');
                toast.error('An unexpected error occurred. Please try again later.');
            }
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative overflow-hidden">
                <img src="wave.svg" alt="Wave Background" className="absolute top-0 right-0 -z-10 w-full h-full object-cover opacity-30" />
                <div className="text-center mb-8">
                    <img src="logo.png" alt="Logo" className="mx-auto mb-4 w-24 h-auto" />
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Login to Your Account</h2>
                    <p className="text-gray-600">Enter your email and password to access your dashboard.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="example@domain.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                    >
                        <img
                            src="login.svg" // Ensure this path is correct
                            alt="Login Icon"
                            className="w-6 h-6 mr-2"
                        />
                        Login
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500 text-sm">{message}</p>}
                <div className="mt-6 text-center">
                    <Link to="/reset-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to="/register" className="text-blue-500 hover:underline">Don’t have an account? Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
