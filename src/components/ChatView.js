import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ChatView.css';
import { selectSelectedImage } from '../features/appSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView() {
    const selectedImage = useSelector(selectSelectedImage);
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedImage) {
            exitHandler();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage]);

    const exitHandler = () => {
        navigate('/chats', { replace: true });
    };


    return (
        <div className='chatView'>
            <img src={selectedImage} alt='' onClick={exitHandler} />
            <div className="chatView__timer">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[10, 6, 3, 0]}
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exitHandler();
                        }
                        return remainingTime;
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    );
}

export default ChatView;
