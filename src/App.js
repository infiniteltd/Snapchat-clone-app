import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WebcamCapture from './components/WebcamCapture';
import Preview from './components/Preview';
import Chats from './components/Chats';
import ChatView from './components/ChatView';
import { login, logout, selectUser } from './features/appSlice';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebase';
import snapchat from './assests/snapchat-logo.png';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }));
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className='app__logo'
              src={snapchat} alt='' />
            <div className='app__body'>
              <div className="app__bodyBackground">
                <Routes>
                  <Route path="/chats/view" element={<ChatView />}>
                  </Route>
                  <Route path="/chats" element={<Chats />}>
                  </Route>
                  <Route path="/preview" element={<Preview />}>
                  </Route>
                  <Route path="/" element={<WebcamCapture />}>
                  </Route>
                </Routes>
              </div>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
