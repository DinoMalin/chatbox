const Message = (props) => {
    function convertTimeStampToHour(timestamp) {
        let a = new Date(timestamp).toLocaleString();
        a = a.slice(11, 16);
        return a;
    }
    return props.message.author === props.author ? (
        <div className='flex flex-row-reverse'>
            <div className='bg-blue-500 text-white rounded-2xl py-1 px-3 m-1 max-w-xs break-words'>
                {props.message.content}
            </div>
        </div>
    ) : (
        <div className='flex'>
            <div>
                <div className='bg-gray-200 text-black rounded-2xl py-1 px-3 mx-1 max-w-xs break-words'>
                    {props.message.content}
                </div>
                <div className='flex justify-between'>
                    <span className='ml-4 text-xs text-gray-500'>
                        {`${props.message.author} · ${convertTimeStampToHour(
                            props.message.timestamp
                        )}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Message;
