import React, { useRef } from 'react';

const Home = () => {
    const grid = useRef(null);
    const input = useRef(null);
    function handleEnter() {
        grid.current.classList.remove('border-blue-500');
        grid.current.classList.add('border-blue-600');
    }
    function handleLeave() {
        grid.current.classList.add('border-blue-500');
        grid.current.classList.remove('border-blue-600');
    }

    function handleCreate() {
        console.log('Create a channel');
    }
    function handleJoin() {
        const code = input.current.value;
        console.log(`Join a channel : ${code}`);
    }
    return (
        <div className='h-screen flex flex-col justify-center select-none'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <span className='text-sm'>Dino present</span>
                    <h1 className='text-6xl'>ChatBox</h1>
                </div>

                <div className='flex flex-col w-72'>
                    <button
                        onClick={handleCreate}
                        className='rounded-md bg-blue-500 shadow-md hover:shadow text-white px-4 py-2 mt-8 hover:bg-blue-600 ease-in-out duration-300'
                    >
                        Create a channel
                    </button>

                    <div className='inline-flex items-center justify-center w-full'>
                        <hr className='w-64 h-px my-8 bg-blue-950 border-0' />
                        <span className='absolute px-3 font-medium text-blue-950 -translate-x-1/2 bg-white left-1/2 '>
                            or
                        </span>
                    </div>

                    <div
                        ref={grid}
                        className='grid grid-cols-12 gap-0 border-2 border-blue-500 rounded-md mx-4 shadow-md hover:shadow ease-in-out duration-300'
                    >
                        <div className='col-span-9'>
                            <input
                                type='text'
                                className='w-full py-2 px-4 focus:outline-none focus:rounded-md rounded-md appearance-none ease-in-out duration-300'
                                placeholder='Enter a code...'
                                ref={input}
                            />
                        </div>
                        <div className='col-span-3'>
                            <button
                                onMouseEnter={handleEnter}
                                onMouseLeave={handleLeave}
                                onClick={handleJoin}
                                className='w-full h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4'
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
