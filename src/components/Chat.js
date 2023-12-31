import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import './Chat.css';
import { StopRounded } from '@mui/icons-material';
import ReactTimeago from 'react-timeago';
import { selectImage } from '../features/appSlice';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openHandler = () => {
        const openRef = collection(db, 'posts');
        if (!read) {
            dispatch(selectImage(imageUrl));
            setDoc(doc(openRef, id), {
                read: true,
            }, { merge: true });

            navigate('/chats/view');
        }
    };

    return (
        <div onClick={openHandler} className='chat'>
            <Avatar className='chat__avatar' src={profilePic} />
            <div className="chat__info">
                <h4>{username}</h4>
                <p>
                    {!read && "Tap to view -"}{" "} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
                </p>
            </div>
            {!read && <StopRounded className='chat__readIcon' />}
        </div>
    );
}

export default Chat;
