import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { RadioButtonUnchecked } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../features/cameraSlice';
import './WebcamCapture.css';

const videoConstraints = {
    width: 400,
    height: 500,
    facingMode: "user",
};

function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const captureHandler = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate('/preview');
    }, [webcamRef, dispatch, navigate]);


    return (
        <div className='webcamCapture'>
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />
            <RadioButtonUnchecked
                className='webcamCapture__button'
                onClick={captureHandler}
                fontSize='large'
            />
        </div>
    );
}

export default WebcamCapture;
