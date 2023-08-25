import React, {useState} from 'react';
import '../../App.css';
import './Home.css';
import Button from "../../components/Button/Button.jsx";

export default function Home ({ socket, onUser, onLoggedInUsers }) {
    const [username, setUsername] = useState('');
    const [loggedInUsers, setLoggedInUsers] = useState([]);

    const joinLobby = () => {
        if (username !== '') {
            onUser(username);
            socket.emit('Join_lobby', {username: username, lobby: 'Lobby'});

            socket.on('Logged_in_users', (users) => { //отрабатывает для первого юзера после захода второго
                console.log(users); //отрабатывает корректно, выводит массив объектов
                console.log('4'); //отрабатывает корректно
                setLoggedInUsers(users);
                console.log(loggedInUsers); //не отрабатывает корректно, выводит пустой массив
                console.log('5'); //отрабатывает корректно
            });

            onLoggedInUsers(loggedInUsers);
        }
    }

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