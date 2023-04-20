import React from 'react';
import './index.css';
import Chat from './chat/Chat';
import Board from './board/Board';

const ChatBox = () => {
    return (
        <div className='flex w-screen h-screen justify-center items-center flex-wrap'>
            <Chat />
            <Board />
        </div>
    );
};

export default ChatBox;
