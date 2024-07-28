import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Topbar = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/auth/current', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsername(res.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-200">Welcome, {username}</span>
            </div>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-600 rounded-md p-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
                <div className="flex items-center space-x-6">
                    <Link to="/profile">
                        <span className="text-gray-200 hover:text-indigo-300 transition duration-200 cursor-pointer">Profile</span>
                    </Link>
                    <Link to="/settings">
                        <span className="text-gray-200 hover:text-indigo-300 transition duration-200 cursor-pointer">Settings</span>
                    </Link>
                    <span className="text-gray-200 hover:text-red-400 transition duration-200 cursor-pointer">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
