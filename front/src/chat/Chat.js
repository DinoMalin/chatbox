import React, { useEffect } from 'react';
import Input from './Input';
import Message from './Message';
import axios from 'axios';

const Chat = (props) => {
    const apiLink = props.apiLink;
    const linkFetch = `${apiLink}/messages/${props.channelID}`;
    const div = React.useRef(null);
    const [messages, setMessages] = React.useState([]);
    // Fetch messages from the database every second
    React.useEffect(() => {
        axios.get(`${linkFetch}?all=true`).then((res) => {
            //console.log(res.data);
            if (res.data.length === 0) {
                return;
            } else {
                console.log('set');
                setMessages(res.data.reverse());
            }
        });
    }, []);

    console.log('msg : ', messages);
    // Fetch messages from the database every second
    React.useEffect(() => {
        const fetchMessage = async () => {
            const res = await axios.get(`${linkFetch}`);
            console.log(res.data);
            if (res.data.length !== 0) {
                if (messages.length === 0) {
                    console.log('length nulle');
                    setMessages(res.data.reverse());
                    console.log('message:', messages);
                } else if (
                    res.data[0].id !== messages[messages.length - 1].id
                ) {
                    console.log('new message');
                    setMessages((messages) => messages.concat(res.data));
                }
            }
        };
        const interval = setInterval(fetchMessage, 1000);
        return () => clearInterval(interval);
    }, [messages]);

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
                        uuid={props.userUUID}
                        apiLink={apiLink}
                    />
                ))}
                <div className='h-8' />
            </div>
            <div>
                <hr className='border-gray-300' />
                <Input
                    apiLink={props.apiLink}
                    div={div}
                    channelID={props.channelID}
                    userUUID={props.userUUID}
                />
            </div>
        </div>
    );
};

export default Chat;
