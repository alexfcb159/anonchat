import React, {useEffect, useState} from 'react';
import '../../App.css';
import './Home.css';
import Button from "../../components/Button/Button.jsx";

export default function Home ({ socket, onUser, onLoggedInUsers }) {
    const [username, setUsername] = useState('');

    const joinLobby = () => {
        if (username !== '') {
            onUser(username);
            socket.emit('Join_lobby', {username: username, lobby: 'Lobby'});
        }
    }

    useEffect(() => {
        socket.on('Logged_in_users', (users) => {
            onLoggedInUsers(users);
        });
    }, [socket]);

    return (
        <div className='container'>
            <form className='form'>
                <label htmlFor='nickname' className='label'>Your nickname:</label>
                <input type='text' id='nickname' className='input' placeholder='Enter your nickname' onChange={(event) => setUsername(event.target.value)}/>
                <Button
                    path='/chat'
                    text='Enter lobby'
                    clickHandler={joinLobby}
                />
            </form>
        </div>
    )
}