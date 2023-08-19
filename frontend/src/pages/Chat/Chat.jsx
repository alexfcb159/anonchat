import React, {useEffect, useState} from 'react';
import '../../App.css';
import './Chat.css';
import Button from "../../components/Button/Button.jsx";
import User from "../../components/User/User";
import Message from "../../components/Message/Message";

export default function Chat ({ socket, username }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('Send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        socket.on('Receive_message', (data) => {
            // console.log(data);
            setMessageList((list) => [...list, data]);
        })
    }, [socket]);

    return (
        <div className='container'>
            <div className='left'>
                <Button path='/' text='Create new room'/>
                <Button path='/' text='Find new room'/>
                <Button path='/' text='Exit Room'/>
                <Button path='/' text='Save nickname'/>
            </div>

            <div className='middle'>
                <div className='messages'>
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
                </div>
                <form className='input-area'>
                    <input type='text' className='input' placeholder='Enter your message' value={currentMessage} onChange={(event) => setCurrentMessage(event.target.value)} />
                    <Button text='Send message' clickHandler={sendMessage} />
                </form>
            </div>

            <div className='right'>
                <h3>Online users</h3>
                <ul className='user-list'>
                    <User name={username}/>
                </ul>
            </div>
        </div>
    )
}