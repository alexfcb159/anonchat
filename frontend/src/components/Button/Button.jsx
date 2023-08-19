import React from 'react';
import { Link } from "react-router-dom";
import './Button.css';

export default function Button (props) {
    const { path, text, clickHandler } = props;

    if (clickHandler) {
        return (
            <Link to={props.path}>
                <button className='button' onClick={clickHandler}>{props.text}</button>
            </Link>
        );
    }

    return  (
        <Link to={props.path}>
            <button className='button'>{props.text}</button>
        </Link>
    )
}