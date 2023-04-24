import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatBox from './ChatBox';
import Home from './Home';
import Cookies from 'js-cookie';
import axios from 'axios';

const App = () => {
    const apiLink = 'http://localhost:3001/api';
    const link = 'http://localhost:3000';

    const [userUUID, setUserUUID] = React.useState('');

    function saveUUIDInDB() {
        axios.post(`${apiLink}/user`, {
            uuid: Cookies.get('userUUID'),
        });
    }

    async function fetchUser(uuid) {
        const res = await axios.get(`${apiLink}/user/${uuid}`);
        if (res.data.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    function newUUID() {
        return Math.random().toString(36).substring(2);
    }

    React.useEffect(() => {
        async function f() {
            const uuid = Cookies.get('userUUID');
            console.log('uuid', uuid);
            if (uuid.length === 0 || uuid === 'undefined') {
                const newUuid = newUUID();
                setUserUUID(newUUID);
                Cookies.set('userUUID', userUUID, { expires: 365 });
                saveUUIDInDB();
            } else if (!fetchUser(uuid)) {
                const newUuid = newUUID();
                setUserUUID(newUUID);
                saveUUIDInDB();
            } else {
                setUserUUID(uuid);
            }
        }
        f();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Home apiLink={apiLink} link={link} />}
                />
                <Route
                    path='/chatbox/:channelID'
                    element={
                        <ChatBox
                            userUUID={userUUID}
                            apiLink={apiLink}
                            link={link}
                        />
                    }
                />
                <Route path='*' element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
