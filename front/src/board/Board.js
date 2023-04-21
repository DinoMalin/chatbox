import React, { useRef } from 'react';

const Board = () => {
    const channelID = '0001';
    const grid = useRef(null);
    const input = useRef(null);
    function copyToClipboard() {
        navigator.clipboard.writeText(channelID);
    }
    function handleEnter() {
        grid.current.classList.remove('border-blue-500');
        grid.current.classList.add('border-blue-600');
    }
    function handleLeave() {
        grid.current.classList.add('border-blue-500');
        grid.current.classList.remove('border-blue-600');
    }
    function handleChangeName() {
        const name = input.current.value;
        console.log(`Change name to : ${name}`);
    }
    return (
        <div className='flex-col m-6'>
            <label
                htmlFor='name'
                className='block font-medium text-gray-700 mb-2'
            >
                Your Name
            </label>
            <div
                ref={grid}
                className='grid grid-cols-12 gap-0 border-2 border-blue-500 rounded-md shadow hover:shadow ease-in-out duration-300'
            >
                <div className='col-span-9'>
                    <input
                        type='text'
                        className='w-full py-2 px-4 focus:outline-none focus:rounded-md rounded-md appearance-none ease-in-out duration-300'
                        placeholder='Enter Your Name...'
                        ref={input}
                    />
                </div>
                <div className='col-span-3'>
                    <button
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                        onClick={handleChangeName}
                        className='w-full h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4'
                    >
                        OK
                    </button>
                </div>
            </div>
            {/*Affichage de l'ID du channel en grand */}
            <div
                className='text-4xl text-center mt-4 text-sky-900 hover:text-sky-500 ease-in-out duration-200 hover:cursor-pointer'
                onClick={copyToClipboard}
            >
                ID : #{channelID}
            </div>
            {/*Affichage de text area */}
            <textarea
                name=''
                id=''
                cols='30'
                rows='10'
                className='border-2 border-blue-500 py-2 px-4 rounded-lg focus:outline-none  resize-none w-full mt-4 shadow'
                placeholder='Write something...'
            ></textarea>
        </div>
    );
};

export default Board;
