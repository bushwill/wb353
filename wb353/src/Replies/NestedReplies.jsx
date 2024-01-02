import React, { useState, useEffect } from 'react';


const NestedReplies = ({ onReply, reply_id }) => {
    const [getReplies, setReplies] = useState([]);
    const sortedReplies = [...getReplies].sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/getReplyReplies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reply_id: reply_id,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setReplies(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [reply_id]);


    const likeReply = (reply_id) => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/likeReply', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reply_id: reply_id,
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


    const dislikeReply = (reply_id) => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/dislikeReply', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reply_id: reply_id,
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
    

    return (
        <div>
            {sortedReplies.map(reply => (
                <div key={reply.id}>
                    <div className='border-2 border-black min-w-popup'>
                        <div className='text-left'>
                            <h1 className='text-3xl font-bold'>
                                {reply.reply}
                            </h1>
                        </div>
                        <div>
                            <button onClick={() => onReply(0, reply.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                                Reply
                            </button>
                            <span>
                                Likes: {reply.likes}
                            </span>
                            <button onClick={() => likeReply(reply.id)} className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 m-3 rounded-full shadow-lg">Like</button>
                            <span>
                                Dislikes: {reply.dislikes}
                            </span>
                            <button onClick={() => dislikeReply(reply.id)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 m-3 rounded-full shadow-lg">Dislike</button>
                        </div>
                    </div>
                    <div className='ml-4'>
                        < NestedReplies onReply={onReply} reply_id={reply.id} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NestedReplies;
