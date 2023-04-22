import React, { useEffect } from 'react';
import Input from './Input';
import Message from './Message';
import axios from 'axios';

const Chat = (props) => {
    const linkFetch = `http://localhost:3000/api/messages/${props.channelID}`;
    const linkAuthor = `http://localhost:3000/api/user/${props.userUUID}`;

    const div = React.useRef(null);
    const author = axios.get(linkAuthor).then((res) => {
        return res.data;
    });
    const [messages, setMessages] = React.useState([]);

    // Fetch messages from the database every second
    React.useEffect(() => {
        const interval = setInterval(() => {
            axios.get(linkFetch).then((res) => {
                setMessages(res.data);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function handleScroll() {
        div.current.scrollTop = div.current.scrollHeight;
    }

    useEffect(() => {
        handleScroll();
    }, [messages]);

    return (
        <div className='flex flex-col h-screen w-128'>
            <div
                ref={div}
                className='scroll-smooth h-full overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-200 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-w-3'
            >
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message}
                        author={author}
                    />
                ))}
                <div className='h-8' />
            </div>
            <div>
                <hr className='border-gray-300' />
                <Input
                    div={div}
                    /*messages={messages}
                    setMessages={setMessages}
                    author={author}*/
                    channelID={props.channelID}
                    userUUID={props.userUUID}
                />
            </div>
        </div>
    );
};

export default Chat;
