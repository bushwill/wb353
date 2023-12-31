import React, { useState, useEffect } from 'react';

import root from '../index';
import ChannelPage from './ChannelPage';


const Channels = ({ user_id }) => {
    const [getChannels, setChannels] = useState([]);
    const [getSearchText, setSearchText] = useState('');


    const viewChannel = (user_id, channel_id, channel_name) => {
        root.render(
            <React.StrictMode>
                <ChannelPage user_id={user_id} channel_id={channel_id} channel_name={channel_name} />
            </React.StrictMode>
        );
    };


    const handleSearch = () => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/searchChannel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: getSearchText,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setChannels(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/getChannels', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setChannels(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <input
                type="text"
                value={getSearchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for channels..."
            />
            <button onClick={handleSearch}>Search</button>
            {getChannels.map(channel => (
                <div key={channel.id} className='border-2 border-black'>
                    <span className='text-3xl font-bold mx-16'>
                        {channel.name}
                    </span>
                    <button onClick={() => viewChannel(user_id, channel.id, channel.name)} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 m-3 rounded-full shadow-lg">
                        View Channel Posts
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Channels;
