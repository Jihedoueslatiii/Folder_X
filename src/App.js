import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './index.css';

import DocumentBases from './components/DocumentBase';
import Folders from './components/Folder';
import Documents from './components/Document';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';



function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/document-bases" element={<DocumentBases />} />
                    <Route path="/folders" element={<Folders />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/profile" element={<Profile />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
