import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Adjust the path as needed
import Topbar from './Topbar'; // Import the Topbar component

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [newName, setNewName] = useState('');
    const [newContent, setNewContent] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await axios.get('/api/documents');
                setDocuments(res.data.documents); // Adjust based on API response
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };
        fetchDocuments();
    }, []);

    const createDocument = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newName);
            formData.append('content', newContent);
            formData.append('createdBy', 'user_id'); // Replace with actual user ID or remove if not needed
            if (file) {
                formData.append('file', file);
            }
            const res = await axios.post('/api/documents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDocuments([...documents, res.data.document]); // Adjust based on API response
            setNewName('');
            setNewContent('');
            setFile(null);
            setMessage('Document created successfully');
        } catch (error) {
            setMessage('Failed to create document');
            console.error('Error creating document:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Topbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center">Documents</h2>
                        <form onSubmit={createDocument}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Document Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="New Document Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Content</label>
                                <textarea
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="New Document Content"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Upload File</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
                            >
                                Create Document
                            </button>
                        </form>
                        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                        <ul className="mt-6 list-disc list-inside">
                            {documents.map((doc) => (
                                <li key={doc._id} className="mb-2">{doc.name}</li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Documents;
