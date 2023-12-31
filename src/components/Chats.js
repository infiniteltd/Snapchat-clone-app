import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { ChatBubble, RadioButtonUnchecked, Search } from '@mui/icons-material';
import './Chats.css';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import Chat from '../components/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../features/appSlice';
import { resetCameraImage } from '../features/cameraSlice';

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const postRef = collection(db, 'posts');
        const orderedPostsQuery = query(postRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(orderedPostsQuery, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })));
        });

        return () => unsubscribe();
    }, []);

    const takeSnapHandler = () => {
        dispatch(resetCameraImage());
        navigate('/');
    };

    return (
        <div className='chats'>
            <div className="chats__header">
                <Avatar
                    src={user.profilePic}
                    onClick={() => auth.signOut()} className='chats__avatar'
                />
                <div className="chats__search">
                    <Search className='chats__searchIcon' />
                    <input placeholder='Friends' type='text' />
                </div>
                <ChatBubble className='chats__chatIcon' />
            </div>
            <div className="chats__posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>

            <RadioButtonUnchecked className='chats__takePicIcon'
                onClick={takeSnapHandler}
                fontSize='large'
            />
        </div>
    );
}

export default Chats;