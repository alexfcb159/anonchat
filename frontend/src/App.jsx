import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Chat from "./pages/Chat/Chat.jsx";
import io from "socket.io-client";

const socket = io.connect('http://localhost:3000');

export default function App() {
    const [username, setUsername] = useState('');
    const [loggedInUsers, setLoggedInUsers] = useState([]);

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home socket={socket} onUser={setUsername} onLoggedInUsers={setLoggedInUsers}/>}/>
                    <Route path='/chat' element={<Chat socket={socket} username={username} loggedInUsers={loggedInUsers}/>}/>
                </Routes>
            </Router>
        </>
    )
}