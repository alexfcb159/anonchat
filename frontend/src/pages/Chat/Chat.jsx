import React, {useEffect, useState} from 'react';
import '../../App.css';
import './Chat.css';
import Button from "../../components/Button/Button.jsx";
import User from "../../components/User/User";
import Message from "../../components/Message/Message";
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Chat ({ socket, username, loggedInUsers }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [currentRoom, setCurrentRoom] = useState('Lobby');
    const [previousRoom, setPreviousRoom] = useState('Lobby');

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('Send_message', {messageData: messageData, room: room});
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage('');
        }
    };

    const joinRoom = async () => {
        console.log(currentRoom);
        if (currentRoom !== '') {
            await socket.emit('Join_room', {room: currentRoom});
            setPreviousRoom(currentRoom);
        }
    }

    useEffect(() => {
        socket.on('Receive_message', (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className='container'>
            <div className='left'>
                <input
                    type='text'
                    className='input-small'
                    placeholder='Enter room id'
                    onChange={(event) => setCurrentRoom(event.target.value)}
                />
                <Button text='Create new room' clickHandler={joinRoom} />
                <Button path='/' text='Find new room'/>
                <Button path='/' text='Exit Room'/>
                <Button path='/' text='Save nickname'/>
            </div>

            <div className='middle'>
                <div className='messages'>
                    <ScrollToBottom className='message-container'>
                        {messageList.map((messageContent) => {
                            return (
                                <Message
                                    message={messageContent.message}
                                    time={messageContent.time}
                                    author={messageContent.author}
                                    username={username}
                                    messageData={messageContent}
                                />
                            )
                        })}
                    </ScrollToBottom>
                </div>
                <form className='input-area'>
                    <input
                        type='text'
                        className='input'
                        placeholder='Enter your message'
                        value={currentMessage}
                        onChange={(event) => setCurrentMessage(event.target.value)}
                    />
                    <Button text='Send message' clickHandler={sendMessage} />
                </form>
            </div>

            <div className='right'>
                <h3>Online users</h3>
                <ul className='user-list'>
                    {loggedInUsers.map((users) => {
                        return (
                            <User key={users.name} name={users.name}/>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}