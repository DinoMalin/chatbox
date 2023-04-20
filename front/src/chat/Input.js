import React from 'react';

const Input = (props) => {
    const input = React.useRef(null);
    const [id, setId] = React.useState(18);
    function handleClick() {
        if (input.current.value.trim().length === 0) {
            return;
        }
        props.setMessages([
            ...props.messages,
            {
                id: id,
                content: input.current.value,
                author: props.author,
                timestamp: new Date().getTime(),
            },
        ]);
        setId(id + 1);
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
