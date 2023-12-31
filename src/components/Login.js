import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import './Login.css';
import snapchat from '../assests/snapchat-logo.png';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { login } from '../features/appSlice';

function Login() {
    const dispatch = useDispatch();

    const signInHandler = () => {
        signInWithPopup(auth, provider).then(result => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            }));
        }).catch((error) => alert(error.message));

    };
    return (
        <div className='login'>
            <div className="login__container">
                <img src={snapchat} alt='' />
                <Button variant='outlined' onClick={signInHandler}>
                    Sign in
                </Button>
            </div>

        </div>
    );
}

export default Login;
