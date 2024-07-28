import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Adjust the path as needed
import '../styles/Folders.css';  // Adjust the path based on where you save your CSS file

const Folders = ({ documentBaseId }) => {
    const [folders, setFolders] = useState([]);
    const [newName, setNewName] = useState('');
    const [message, setMessage] = useState('');
    const [parentFolder, setParentFolder] = useState('');

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`/api/folders/document-base/${documentBaseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setFolders(res.data);
            } catch (error) {
                console.error('Error fetching folders:', error);
                setMessage('Failed to fetch folders');
            }
        };
        fetchFolders();
    }, [documentBaseId]);

    const createFolder = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/folders', { name: newName, parentFolder, documentBase: documentBaseId, createdBy: 'userId' }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFolders([...folders, res.data]); // Update the state with the new folder
            setNewName('');
            setMessage('Folder created successfully');
        } catch (error) {
            console.error('Error creating folder:', error);
            setMessage('Failed to create folder');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">Folders</h2>
                    <form onSubmit={createFolder} className="mb-6">
                        <div className="mb-4">
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="New Folder Name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Parent Folder (Optional)</label>
                            <select
                                value={parentFolder}
                                onChange={(e) => setParentFolder(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">None</option>
                                {folders.map((folder) => (
                                    <option key={folder._id} value={folder._id}>{folder.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
                        >
                            Create Folder
                        </button>
                    </form>
                    {message && <p className="text-center text-red-500 mb-4">{message}</p>}
                    <div className="grid grid-cols-2 gap-4">
                        {folders.map((folder) => (
                            <div key={folder._id} className="folder-card p-4 bg-gray-50 border border-gray-200 rounded-md">
                                <div className="folder-icon mb-2">
                                    {/* Add folder icon here */}
                                </div>
                                <div className="folder-name text-center font-semibold">{folder.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Folders;
