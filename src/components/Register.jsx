import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMessage(res.data.message);
        } catch (error) {
            setMessage('Failed to register');
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden border border-gray-200">
                <div className="absolute top-0 left-0 -z-10 w-full h-full">
                    <img src="wave.svg" alt="Wave Background" className="w-full h-full object-cover opacity-20" />
                </div>
                <div className="text-center mb-6">
                    <img src="logo.png" alt="Logo" className="mx-auto mb-4 w-24 h-auto" />
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">Create Your Account</h2>
                    <p className="text-gray-600 text-sm mb-4">Fill out the form below to register.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Your Username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="example@domain.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition flex items-center justify-center"
                    >
                        <img
                            src="register.svg" // Ensure this path is correct
                            alt="Register Icon"
                            className="w-5 h-5 mr-2"
                        />
                        Register
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500 text-sm">{message}</p>}
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">Already have an account?</p>
                    <Link to="/login" className="text-blue-500 hover:underline font-medium">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
