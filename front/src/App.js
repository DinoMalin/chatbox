import React from 'react';
import './index.css';
import Chat from './chat/Chat';

const App = () => {
    return (
        <div className='flex w-screen h-screen justify-center'>
            <div className=''>
                <Chat />
            </div>
        </div>
    );
};

export default App;
