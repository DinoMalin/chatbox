import React, { useEffect } from 'react';
import Input from './Input';
import Message from './Message';

const Chat = () => {
    const div = React.useRef(null);
    const author = 'John';
    const [messages, setMessages] = React.useState([
        {
            id: 1,
            content: 'Hello',
            author: 'John',
            timestamp: 1689561600000,
        },
        {
            id: 2,
            content: 'Hi',
            author: 'Jane',
            timestamp: 1689561600001,
        },
        {
            id: 3,
            content: 'How are you?',
            author: 'John',
            timestamp: 1689561600002,
        },
        {
            id: 4,
            content: 'I am fine, and you?',
            author: 'Jane',
            timestamp: 1689561600003,
        },
        {
            id: 5,
            content: 'I am fine too',
            author: 'John',
            timestamp: 1689561600004,
        },
        {
            id: 6,
            content: 'What are you doing?',
            author: 'Jane',
            timestamp: 1689561600005,
        },
        {
            id: 7,
            content: 'I am learning React',
            author: 'John',
            timestamp: 1689561600006,
        },
        {
            id: 8,
            content: 'That is great',
            author: 'Jane',
            timestamp: 1689561600007,
        },
        {
            id: 9,
            content: 'Yes, it is',
            author: 'John',
            timestamp: 1689561600008,
        },
        {
            id: 10,
            content: 'What is your name?',
            author: 'Jane',
            timestamp: 1689561600009,
        },
        {
            id: 11,
            content: 'My name is John',
            author: 'John',
            timestamp: 1689561600010,
        },
        {
            id: 12,
            content: 'Nice to meet you',
            author: 'Jane',
            timestamp: 1689561600011,
        },
        {
            id: 13,
            content: 'Nice to meet you too',
            author: 'John',
            timestamp: 1689561600012,
        },
        {
            id: 14,
            content: 'Bye',
            author: 'Jane',
            timestamp: 1689561600013,
        },
        {
            id: 15,
            content: 'Bye',
            author: 'John',
            timestamp: 1689561600014,
        },
        {
            id: 16,
            content: 'See you later',
            author: 'Jane',
            timestamp: 1689561600015,
        },
        {
            id: 17,
            content: 'See you later',
            author: 'John',
            timestamp: 1689561600016,
        },
    ]);

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
                    messages={messages}
                    setMessages={setMessages}
                    author={author}
                />
            </div>
        </div>
    );
};

export default Chat;
