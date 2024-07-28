import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from './Topbar'; // Adjust the path as needed

const ParentComponent = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <Topbar username={username} />
            {/* Other components */}
        </div>
    );
};

export default ParentComponent;
