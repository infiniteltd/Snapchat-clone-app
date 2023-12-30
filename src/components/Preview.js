import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Preview.css';
import { selectCameraImage, resetCameraImage } from '../features/cameraSlice';
import { Close, TextFields, Create, Note, MusicNote, AttachFile, Crop, Timer, Send } from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';
import { uploadString, getDownloadURL, ref } from 'firebase/storage';
import { db, storage, serverTimestamp } from '../components/firebase';

function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cameraImage) {
            navigate('/', { replace: true });
        }
    }, [cameraImage, navigate]);

    const closePreviewHandler = () => {
        dispatch(resetCameraImage());
    };

    const sendPostHandler = () => {
        const postRef = collection(db, 'posts');
        const id = uuid();
        const storageRef = ref(storage, `posts/${id}`);
        const uploadTask = uploadString(storageRef, cameraImage, "data_url");

        uploadTask.then((snapshot) => {
            // Handle state change (optional)
            console.log(snapshot);

            // Complete function
            getDownloadURL(storageRef).then((url) => {
                addDoc(postRef, {
                    imageUrl: url,
                    username: 'KRIS Codes',
                    read: false,
                    // profilePic,
                    timestamp: serverTimestamp(),
                });
                navigate('/chats', { replace: true });
            });
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className='preview'>
            <Close className='preview__close' onClick={closePreviewHandler} />
            <div className="preview__toolbarRight">
                <TextFields />
                <Create />
                <Note />
                <MusicNote />
                <AttachFile />
                <Crop />
                <Timer />
            </div>
            <img src={cameraImage} alt='' />

            <div onClick={sendPostHandler} className="preview__footer">
                <h2>Send Now</h2>
                <Send fontSize='small' className='preview__sendIcon' />
            </div>
        </div>
    );
}

export default Preview

