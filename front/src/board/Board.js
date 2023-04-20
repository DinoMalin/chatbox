import React from 'react';

const Board = () => {
    const channelID = '0001';
    function copyToClipboard() {
        navigator.clipboard.writeText(channelID);
    }
    return (
        <div className='flex-col m-6'>
            <label
                htmlFor='name'
                className='block font-medium text-gray-700 mb-2'
            >
                Your Name
            </label>
            <input
                type='text'
                name='name'
                className='border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter your name...'
            />
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
                className='border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none w-full mt-4'
                placeholder='Write something...'
            ></textarea>
        </div>
    );
};

export default Board;
