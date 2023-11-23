import React, { useState, useEffect } from 'react';


const Replies = ({ onReply, post_id }) => {
    const [getReplies, setReplies] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/getPostReplies', {
                    method: 'POST',
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

                const data = await response.json();
                setReplies(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [post_id]);



    return (
        <div>
            {getReplies.map(reply => (
                <div key={reply.id}>
                    <div>
                        <h1 className='text-3xl font-bold mb-8'>
                            {reply.reply}
                        </h1>
                        <button onClick={() => onReply(0, reply.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                            Reply
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Replies;
