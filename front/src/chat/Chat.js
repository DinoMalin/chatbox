import React, { useEffect } from 'react';
import Input from './Input';
import Message from './Message';
import CustomScrollBar from './CustomScrollBar';

const Chat = () => {
    const div = React.useRef(null);
    const [messages, setMessages] = React.useState([
        {
            id: 1,
            message: 'Hello',
            isAuthor: true,
        },
        {
            id: 2,
            message: 'Hi',
            isAuthor: false,
        },
        {
            id: 3,
            message: 'How are you?',
            isAuthor: true,
        },
        {
            id: 4,
            message: 'I am fine, and you?',
            isAuthor: false,
        },
        {
            id: 5,
            message: 'I am fine too',
            isAuthor: true,
        },
        {
            id: 6,
            message: 'What are you doing?',
            isAuthor: true,
        },
        {
            id: 7,
            message: 'I am learning React',
            isAuthor: false,
        },
        {
            id: 8,
            message: 'That is great',
            isAuthor: true,
        },
        {
            id: 9,
            message: 'Yes, it is',
            isAuthor: false,
        },
        {
            id: 10,
            message: 'What is your name?',
            isAuthor: true,
        },
        {
            id: 11,
            message: 'My name is John',
            isAuthor: false,
        },
        {
            id: 12,
            message: 'Nice to meet you',
            isAuthor: true,
        },
        {
            id: 13,
            message: 'Nice to meet you too',
            isAuthor: false,
        },
        {
            id: 14,
            message: 'Bye',
            isAuthor: true,
        },
        {
            id: 15,
            message: 'Bye',
            isAuthor: false,
        },
        {
            id: 16,
            message: 'See you later',
            isAuthor: true,
        },
        {
            id: 17,
            message: 'See you later',
            isAuthor: false,
        },
    ]);

    function handleScroll() {
        div.current.scrollTop = div.current.scrollHeight;
    }

    useEffect(() => {
        handleScroll();
    }, [messages]);

    return (
        <div className='flex flex-col h-screen w-96'>
            <CustomScrollBar className='w-2 h-full absolute right-0 top-0' />
            <div
                ref={div}
                className='scroll-smooth h-full overflow-y-auto overflow-x-hidden'
            >
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        isAuthor={message.isAuthor}
                        message={message.message}
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
                />
            </div>
        </div>
    );
};

export default Chat;
