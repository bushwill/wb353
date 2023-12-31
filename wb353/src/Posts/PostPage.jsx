import React, { useState, useEffect } from 'react';

import Replies from '../Replies/Replies'
import CreateReplyPage from '../Replies/CreateReplyPage'


const PostPage = ({ user_id, post_id }) => {

    const [getPost_ID, setPost_ID] = useState(post_id);
    const [getReply_ID, setReply_ID] = useState(0);
    const [getPostQuestion, setPostQuestion] = useState("");
    const [getPostDescription, setPostDescription] = useState("");
    const [getPostCreator, setPostCreator] = useState("");

    const [isCreateReplyPageVisible, setCreateReplyPageVisibility] = useState(false);
    const toggleCreateReplyPageVisibility = (post_id, reply_id) => {
        setPost_ID(post_id);
        setReply_ID(reply_id);
        setCreateReplyPageVisibility(!isCreateReplyPageVisible);
        refreshReplies();
    };

    const [isRepliesVisible, setRepliesVisibility] = useState(true);
    const refreshReplies = () => {
        setRepliesVisibility(!isRepliesVisible);
    }


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

            try {
                const response = await fetch('http://localhost:5050/getUserByID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user_id,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPostCreator(data.username);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [post_id, user_id]);

    return (
        <div className="bg-white min-h-screen flex flex-col items-center">
            <header className="bg-white min-w-full top-0 left-0 items-center text-center">
                <h2 className="text-5xl font-bold mb-8">
                    {getPostQuestion}
                </h2>
                <h2 className='text-3xl mb-6'>
                    {getPostDescription}
                </h2>
                <h2 className='text-3xl mb-6'>
                    Posted by {getPostCreator}
                </h2>
            </header>
            <section className="py-16 text-center min-w-full">
                <div className="container mx-auto justify-self-end">
                    <section>
                        {isRepliesVisible && < Replies onReply={toggleCreateReplyPageVisibility} post_id={post_id} />}
                        {!isRepliesVisible && < Replies onReply={toggleCreateReplyPageVisibility} post_id={post_id} />}
                    </section>
                </div>
            </section>
            <footer className='fixed bottom-0 min-w-full'>
                <button onClick={() => toggleCreateReplyPageVisibility(post_id, 0)} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                    Create Reply to Post
                </button>
                <button onClick={refreshReplies} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                    Refresh Replies
                </button>
            </footer>
            {isCreateReplyPageVisible && < CreateReplyPage onCancel={toggleCreateReplyPageVisibility} user_id={user_id} post_id={getPost_ID} reply_id={getReply_ID} />}
        </div>
    );
};

export default PostPage;
