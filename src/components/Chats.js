import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { ChatBubble, Search } from '@mui/icons-material';
import './Chats.css';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import Chat from '../components/Chat';

function Chats() {
    const [posts, setPosts] = useState([]);

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

    return (
        <div className='chats'>
            <div className="chats__header">
                <Avatar className='chats__avatar' />
                <div className="chats__search">
                    <Search />
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
        </div>
    );
}

export default Chats;