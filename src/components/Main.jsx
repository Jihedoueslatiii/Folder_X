// src/components/Main.js
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import FoldersList from './FoldersList';

const Main = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-4 flex-grow">
                    <FoldersList />
                </main>
            </div>
        </div>
    );
};

export default Main;
