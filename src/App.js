import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebcamCapture from './components/WebcamCapture';
import Preview from './components/Preview';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className='app__body'>
          <Routes>
            <Route path="/preview" element={<Preview />}>
            </Route>
            <Route path="/" element={<WebcamCapture />}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
