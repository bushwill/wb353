import React, { useState } from 'react';

import Posts from '../Posts/Posts'
import CreatePostPage from '../Posts/CreatePostPage';
import root from '../index'
import ChannelList from './ChannelList';


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

  const redirectToApp = () => {
    root.render(
      <React.StrictMode>
        <ChannelList user_id={user_id} />
      </React.StrictMode>
    );
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <header className="bg-white min-w-full top-0 left-0 fixed items-center text-center">
        <button onClick={redirectToApp} className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 m-3 rounded-full shadow-lg">
          Back to All Channels
        </button>
        <span className="text-5xl font-bold mb-8">
          {channel_name}:
        </span>
      </header>
      <section className="py-16 text-center">
        <h2 className='text-3xl'>
          All Posts:
        </h2>
        <div className="container mx-auto">
          <section>
            {isPostsVisible && < Posts user_id={user_id} channel_id={channel_id} />}
            {!isPostsVisible && < Posts user_id={user_id} channel_id={channel_id} />}
          </section>
        </div>
      </section>
      <footer className='fixed bottom-0 min-w-full'>
        <button onClick={toggleCreatePostPageVisibility} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
          Create Post
        </button>
        <button onClick={refreshPosts} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
          Refresh Posts
        </button>
      </footer>
      {isCreatePostPageVisible && < CreatePostPage onCancel={toggleCreatePostPageVisibility} user_id={user_id} channel_id={channel_id} />}
    </div>
  );
};

export default ChannelPage;
