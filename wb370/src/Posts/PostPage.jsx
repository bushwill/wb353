import React, { useState, useEffect } from 'react';


const PostPage = ({ user_id, post_id }) => {

    const [getPostQuestion, setPostQuestion] = useState("");
    const [getPostDescription, setPostDescription] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5050/getPost', {
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
                setPostQuestion(data.question);
                setPostDescription(data.description);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [post_id]);

    return (
        <div className="bg-white min-h-screen flex flex-col justify-center items-center">
            <section className="py-16 text-center">
                <header>
                    <h2 className="text-5xl font-bold mb-8">
                        {getPostQuestion}
                    </h2>
                    <h2 className='text-3xl mb-6'>
                        {getPostDescription}
                    </h2>
                </header>
                <div className="container mx-auto">
                    <h2 className="text-5xl font-bold mb-8">
                        Replies:
                    </h2>
                    <section>
                        Replies will be here.
                    </section>
                    <footer className='fixed bottom-0 min-w-full'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                            Create Reply
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                            Refresh Replies
                        </button>
                    </footer>
                </div>
            </section>
        </div>
    );
};

export default PostPage;
