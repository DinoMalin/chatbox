import React from 'react';
import axios from 'axios';

const Input = (props) => {
    const apiLink = props.apiLink;
    const linkPost = `${apiLink}/messages/send`;
    const input = React.useRef(null);
    console.log('empty');
    function handleClick() {
        if (input.current.value.trim().length === 0) {
            return;
        }
        axios
            .post(linkPost, {
                channelID: props.channelID,
                userUUID: props.userUUID,
                content: input.current.value,
            })
            .then((res) => {
                console.log('post', res);
            });
        input.current.value = '';
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleClick();
        }
    }

    return (
        <div className='flex justify-between'>
            <input
                type='text'
                placeholder='Type your message...'
                className='rounded-full py-1 px-2 m-2 focus:outline-none w-full'
                ref={input}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleClick}
                className='bg-blue-500 text-white rounded-full py-1 px-3 duration-200 ease-in-out hover:bg-blue-600 m-2'
            >
                Send
            </button>
        </div>
    );
};

export default Input;
