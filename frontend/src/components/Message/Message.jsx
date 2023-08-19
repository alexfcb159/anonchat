import React from 'react';
import './Message.css';

export default function Message (props) {
    return  (
        <div className='message' id={props.username === props.messageData.author ? 'you' : 'other'}>
            <div className='message-content'>
                <p>{props.message}</p>
            </div>
            <div className='message-meta'>
                <p id='time'>{props.time}</p>
                <p id='author'>{props.author}</p>
            </div>
        </div>
    )
}