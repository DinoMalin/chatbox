import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatBox from './ChatBox';
import Home from './Home';
import Cookies from 'js-cookie';

const App = () => {
    const userUUID = Cookies.get('userUUID');
    if (!userUUID) {
        Cookies.set('userUUID', Math.random().toString(36).substring(2));
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/chatbox/:channelID'
                    element={<ChatBox userUUID={userUUID} />}
                />
                <Route path='*' element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
