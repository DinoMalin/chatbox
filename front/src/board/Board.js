import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

const Board = (props) => {
    const apiLink = process.env.REACT_APP_API_LINK;
    const channelID = String(props.channelID).padStart(4, '0');
    const grid = useRef(null);
    const input = useRef(null);
    const [activeTextContent, setActiveTextContent] = useState('');
    const fetchActiveTextLink = `${apiLink}/activeText/${props.channelID}`;
    const modifyActiveTextLink = `${apiLink}/activeText`;
    const modifyNameLink = `${apiLink}/nameUser`;
    const fetchNameLink = `${apiLink}/user/${props.userUUID}`;
    const [name, setName] = useState('Anonyme');

    const api = axios.create({
        baseURL: apiLink,
    });

    React.useEffect(() => {
        try {
            axios.get(fetchNameLink).then((res) => {
                setName(res.data);
            });
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        axios.post(modifyNameLink, {
            userUUID: props.userUUID,
            name: input.current.value,
        });
    }
    function handleModifyText(e) {
        setActiveTextContent(e.target.value);
        setIsWriting(true);
    }

    const [isWriting, setIsWriting] = useState(false);
    const [lastTime, setLastTime] = useState(0);

    async function fetchActiveText() {
        const result = await axios.get(fetchActiveTextLink);
        console.log('active');

        setActiveTextContent(result.data[0].active_text_area);
    }

    function postActiveText() {
        console.log(props.channelID);
        const time = Date.now() - lastTime;
        console.log(time);
        if (Date.now() - lastTime > 1000) {
            console.log('post');
            axios.post(modifyActiveTextLink, {
                channelID: props.channelID,
                content: activeTextContent,
            });
            setLastTime(Date.now());
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isWriting) {
                fetchActiveText();
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [isWriting, activeTextContent]);

    useEffect(() => {
        async function f() {
            if (activeTextContent.length > 0) {
                postActiveText();
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
            setIsWriting(false);
        }
        f();
    }, [activeTextContent]);

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
                        defaultValue={name}
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
                onChange={handleModifyText}
                value={activeTextContent}
            ></textarea>
        </div>
    );
};

export default Board;
