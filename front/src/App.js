import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatBox from './ChatBox';
import Home from './Home';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chatbox' element={<ChatBox />} />
                <Route path='*' element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
