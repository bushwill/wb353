import React, { useState, useEffect } from 'react';

import root from '../index';


const Posts = ({ user_id, channel_id }) => {
    const [getPosts, setPosts] = useState([]);


    const viewPost = () => {
        /*
        root.render(
            <React.StrictMode>
                <ChannelPage user_id={user_id} channel_id={channel_id} channel_name={channel_name} />
            </React.StrictMode>
        );
        */
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/getChannelPosts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        channel_id: channel_id,  // or just { channel_id } with ES6 shorthand
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [channel_id]);



    return (
        <div>
            {getPosts.map(post => (
                <div key={post.id}>
                    <div className='border-2 border-black'>
                        <header className='border-2 border-black'>
                            <h1 className='text-3xl font-bold mb-8'>
                                {post.question}
                            </h1>
                        </header>
                        <h1 className='text-3xl mb-8'>
                            {post.description}
                        </h1>
                        <button className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 m-3 rounded-full shadow-lg">
                            View Post
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
