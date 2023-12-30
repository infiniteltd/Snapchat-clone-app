import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ChatView.css';
import { selectapp } from '../features/appSlice';

function ChatView() {
    const selectedImage = useSelector(selectapp);
    const navigate = useNavigate();

    const exitHandler = () => {
        navigate('/chats', { replace: true });
    };

    useEffect(() => {
        if (!selectedImage) {
            exitHandler();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage]);


    return (
        <div className='chatView'>
            <img src={selectedImage} alt='' onClick={exitHandler} />
        </div>
    );
}

export default ChatView;
