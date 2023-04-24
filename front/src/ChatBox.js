import React from 'react';
import './index.css';
import Chat from './chat/Chat';
import Board from './board/Board';

const ChatBox = (props) => {
    const channelID = Number(window.location.pathname.split('/')[2]);
    return (
        <div className='flex w-screen h-screen justify-center items-center flex-wrap'>
            <Chat
                apiLink={props.apiLink}
                channelID={channelID}
                userUUID={props.userUUID}
            />
            <Board
                apiLink={props.apiLink}
                link={props.link}
                channelID={channelID}
                userUUID={props.userUUID}
            />
        </div>
    );
};

export default ChatBox;
