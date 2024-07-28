import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component
import Topbar from './Topbar'; // Import the Topbar component

const DocumentBase = () => {
    const [newName, setNewName] = useState('');
    const [message, setMessage] = useState('');

    const createDocumentBase = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const token = localStorage.getItem('token');
            const userId = 'user_id'; // Replace with actual user ID
    
            await axios.post('http://localhost:5000/api/document-bases', { name: newName, createdBy: userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Clear input field after successful creation
            setNewName('');
            setMessage('Document Base created successfully');
        } catch (error) {
            console.error('Error creating document base:', error);
            setMessage('Failed to create document base');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Topbar /> {/* Include the Topbar component */}
            <div className="flex flex-1">
                <Sidebar /> {/* Include the Sidebar component */}
                <div className="flex-grow flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-3xl font-bold mb-6 text-center">Create Document Base</h2>
                        <form onSubmit={createDocumentBase} className="mb-6">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="New Document Base Name"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
                            >
                                Create Document Base
                            </button>
                        </form>
                        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentBase;
