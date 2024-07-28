import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.response?.data?.message || 'Failed to fetch user profile');
                toast.error(error.response?.data?.message || 'Failed to fetch user profile');
                navigate('/login'); // Redirect to login if the user is not authenticated
            }
        };

        fetchUserProfile();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
                {user && (
                    <div>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                        {/* Add more user information as needed */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
