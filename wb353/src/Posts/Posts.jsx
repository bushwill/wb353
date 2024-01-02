import React, { useState, useEffect } from 'react';

import root from '../index';
import PostPage from './PostPage'


const Posts = ({ user_id, channel_id }) => {
    const [getPosts, setPosts] = useState([]);
    const sortedPosts = [...getPosts].sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
    const [getSearchText, setSearchText] = useState('');



    const viewPost = (user_id, post_id) => {
        root.render(
            <React.StrictMode>
                <PostPage user_id={user_id} post_id={post_id} />
            </React.StrictMode>
        );
    };


    const likePost = (post_id) => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/likePost', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_id: post_id,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    };


    const dislikePost = (post_id) => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/dislikePost', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_id: post_id,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };


    const handleSearch = () => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/searchPost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: getSearchText,
                        channel_id: channel_id,
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
                        channel_id: channel_id,
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
            <input
                type="text"
                value={getSearchText}
                onChange={(e) => setSearchText(e.target.value)} 
                placeholder="Search for posts..."
            />
            <button onClick={handleSearch}>Search</button>
            {sortedPosts.map(post => (
                <div key={post.id}>
                    <div className='border-2 border-black min-w-popup'>
                        <div className='text-left'>
                            <header>
                                <h2 className='text-3xl font-bold'>
                                    {post.question}
                                </h2>
                            </header>
                            <p className='text-3xl mb-8'>
                                {post.description}
                            </p>
                        </div>
                        <div className='items-right'>
                            <button onClick={() => viewPost(user_id, post.id)} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 m-3 rounded-full shadow-lg">
                                View Post
                            </button>
                            <span>
                                Likes: {post.likes}
                            </span>
                            <button onClick={() => likePost(post.id)} className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 m-3 rounded-full shadow-lg">Like</button>
                            <span>
                                Dislikes: {post.dislikes}
                            </span>
                            <button onClick={() => dislikePost(post.id)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 m-3 rounded-full shadow-lg">Dislike</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
