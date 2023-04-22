import React from 'react';
import './index.css';
import Chat from './chat/Chat';
import Board from './board/Board';

const ChatBox = (props) => {
    const channelID = window.location.pathname.split('/')[2];
    return (
        <div className='flex w-screen h-screen justify-center items-center flex-wrap'>
            <Chat channelID={channelID} userUUID={props.userUUID} />
            <Board />
        </div>
    );
};

export default ChatBox;
