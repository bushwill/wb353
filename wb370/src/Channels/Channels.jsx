import React, { useState, useEffect } from 'react';

import root from '../index';
import ChannelPage from './ChannelPage';


const Channels = ({ user_id }) => {
    const [getChannels, setChannels] = useState([]);


    const viewChannel = (user_id, channel_id, channel_name) => {
        root.render(
            <React.StrictMode>
                <ChannelPage user_id={user_id} channel_id={channel_id} channel_name={channel_name} />
            </React.StrictMode>
        );
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
            {getChannels.map(channel => (
                <div key={channel.id}>
                    <span className='text-3xl font-bold mb-8'>
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
