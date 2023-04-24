import axios from 'axios';
import React, { useRef } from 'react';

const Home = (props) => {
    const apiLink = props.apiLink;
    const link = props.link;
    const grid = useRef(null);
    const input = useRef(null);
    const createChannelLink = `${apiLink}/channel`;
    const checkChannelLink = `${apiLink}/channelCheck/`;
    const getLastChannelLink = `${apiLink}/lastChannel`;

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
        axios.post(createChannelLink).then((res) => {
            console.log(res.data);
        });
        let newLink = '';
        axios.get(getLastChannelLink).then((res) => {
            console.log(res.data);
            newLink = `${link}/chatbox/${Number(res.data)}`;
        });
        //window.location.href = newLink;
    }

    function handleJoin() {
        const code = input.current.value;
        let valid = null;
        // il faut vérifier si le channel existe !
        try {
            axios.get(checkChannelLink + Number(code)).then((res) => {
                console.log(res.data);
            });
            valid = true;
        } catch (error) {
            console.log(error);
            valid = false;
        }
        if (!valid) {
            console.log(valid);
            console.log('Channel does not exist');
            return;
        }
        console.log(`Join a channel : ${code}`);
        window.location.href = `${link}/chatbox/${Number(code)}`;
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
