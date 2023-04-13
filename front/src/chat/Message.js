const Message = (props) => {
    return props.isAuthor ? (
        <div className='flex flex-row-reverse'>
            <div className='bg-sky-500 text-white rounded-2xl py-1 px-3 m-1 max-w-xs break-words'>
                {props.message}
            </div>
        </div>
    ) : (
        <div className='flex'>
            <div className='bg-gray-200 text-black rounded-2xl py-1 px-3 m-1 max-w-xs break-words'>
                {props.message}
            </div>
        </div>
    );
};

export default Message;
