import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from './Sidebar'; // Adjust the path as needed
import Topbar from './Topbar'; // Import the Topbar component

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [foldersCount, setFoldersCount] = useState(0);
    const [documentsCount, setDocumentsCount] = useState(0);
    const [totalSize, setTotalSize] = useState(0); // For file size if needed
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const foldersRes = await axios.get('/api/folders');
                const documentsRes = await axios.get('/api/documents');
                
                setFoldersCount(foldersRes.data.length);
                setDocumentsCount(documentsRes.data.length);
                
                // Calculate total file size if needed
                const totalFileSize = documentsRes.data.reduce((sum, doc) => {
                    // Assuming each document has a `fileSize` property
                    return sum + (doc.fileSize || 0);
                }, 0);
                setTotalSize(totalFileSize);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Chart Data
    const data = {
        labels: ['Folders', 'Documents', 'Files'],
        datasets: [{
            data: [foldersCount, documentsCount, totalSize],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar username="User" />
                <main className="p-4 flex-grow">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">Dashboard</h2>
                        {loading ? (
                            <p className="text-center">Loading...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4">Folders</h3>
                                    <Pie data={{
                                        labels: ['Folders'],
                                        datasets: [{
                                            data: [foldersCount],
                                            backgroundColor: ['#FF6384']
                                        }]
                                    }} />
                                    <p className="mt-4 text-center text-gray-700">Total Folders: {foldersCount}</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4">Documents</h3>
                                    <Pie data={{
                                        labels: ['Documents'],
                                        datasets: [{
                                            data: [documentsCount],
                                            backgroundColor: ['#36A2EB']
                                        }]
                                    }} />
                                    <p className="mt-4 text-center text-gray-700">Total Documents: {documentsCount}</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4">Files</h3>
                                    <Pie data={{
                                        labels: ['Files'],
                                        datasets: [{
                                            data: [totalSize / (1024 * 1024)], // Convert to MB
                                            backgroundColor: ['#FFCE56']
                                        }]
                                    }} />
                                    <p className="mt-4 text-center text-gray-700">
                                        Total File Size: {totalSize ? `${(totalSize / (1024 * 1024)).toFixed(2)} MB` : 'No files'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
