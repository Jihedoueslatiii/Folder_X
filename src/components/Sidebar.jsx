import React from 'react';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed

const Sidebar = () => {
    return (
        <div className="w-64 min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col">
            <div className="p-6 bg-gradient-to-br from-indigo-800 to-purple-800 flex flex-col items-center shadow-md rounded-b-lg">
                <img
                    src="FOLDERX.PNG" // Adjust the path if necessary
                    alt="Logo"
                    className="w-24 h-24 mb-4 object-contain"
                />
                <span className="text-2xl font-bold text-gray-200">DASHBOARD</span>
            </div>

            <nav className="flex-1 mt-4">
                <ul className="p-4 space-y-2">
                    <li>
                        <Link
                            to="/document-bases"
                            className="block py-3 px-5 rounded-lg transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white"
                        >
                            DocumentBase
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/folders"
                            className="block py-3 px-5 rounded-lg transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white"
                        >
                            Folders
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/documents"
                            className="block py-3 px-5 rounded-lg transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white"
                        >
                            Documents
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard"
                            className="block py-3 px-5 bg-indigo-800 rounded-lg transition duration-30 ease-in-out hover:bg-indigo-700"
                        >
                            Dashboard
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
