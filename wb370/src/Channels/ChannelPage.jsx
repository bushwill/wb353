import React, { useState } from 'react';

import Posts from '../Posts/Posts'
import CreatePostPage from '../Posts/CreatePostPage';


const ChannelPage = ({ user_id, channel_id, channel_name }) => {

  const [isCreatePostPageVisible, setCreatePostPageVisibility] = useState(false);
  const toggleCreatePostPageVisibility = () => {
    setCreatePostPageVisibility(!isCreatePostPageVisible);
    refreshPosts();
  };

  const [isPostsVisible, setPostsVisibility] = useState(true);
  const refreshPosts = () => {
    setPostsVisibility(!isPostsVisible);
  }

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <section className="py-16 text-center">
        <header>
          <h2 className="text-5xl font-bold mb-8">
            {channel_name}
          </h2>
        </header>
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-8">
            Posts:
          </h2>
          <section>
            {isPostsVisible && < Posts user_id={user_id} channel_id={channel_id} />}
            {!isPostsVisible && < Posts user_id={user_id} channel_id={channel_id} />}
          </section>
          <footer className='fixed bottom-0 min-w-full'>
            <button onClick={toggleCreatePostPageVisibility} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
              Create Post
            </button>
            <button onClick={refreshPosts} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
              Refresh Posts
            </button>
          </footer>
        </div>
      </section>
      {isCreatePostPageVisible && < CreatePostPage onCancel={toggleCreatePostPageVisibility} user_id={user_id} channel_id={channel_id} />}
    </div>
  );
};

export default ChannelPage;
