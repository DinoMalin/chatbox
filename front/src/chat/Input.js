import React from 'react';

const Input = (props) => {
    const input = React.useRef(null);
    const [id, setId] = React.useState(5);
    function handleClick() {
        props.setMessages([
            ...props.messages,
            {
                id: id,
                message: input.current.value,
                isAuthor: true,
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
                className='bg-sky-500 text-white rounded-full py-1 px-3 duration-200 ease-in-out hover:bg-sky-700 m-2'
            >
                Send
            </button>
        </div>
    );
};

export default Input;
