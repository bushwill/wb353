import React, { useState, useEffect } from 'react';


const NestedReplies = ({ onReply, reply_id }) => {
    const [getReplies, setReplies] = useState([]);


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
                    < NestedReplies onReply={onReply} reply_id={reply.id} />
                </div>
            ))}
        </div>
    );
};

export default NestedReplies;