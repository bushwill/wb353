/*
    TODO -> Prevent two channels of the same name
*/

import React, { useState } from 'react';

import CreateChannelPage from './CreateChannelPage'
import Channels from './Channels';

const ChannelList = ({ user_id, username }) => {

  const [isCreateChannelPageVisible, setCreateChannelPageVisibility] = useState(false);
  const toggleCreateChannelPageVisibility = () => {
    setCreateChannelPageVisibility(!isCreateChannelPageVisible);
    refreshChannels();
  };

  const [isChannelsVisible, setChannelsVisibility] = useState(true);
  const refreshChannels = () => {
    setChannelsVisibility(!isChannelsVisible);
  }

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <section className="py-16 text-center">
        <header>
          <h2 className="text-5xl font-bold mb-8">
            Welcome, {username}!
          </h2>
          <h2 className="text-5xl font-bold mb-8">
            Channels:
          </h2>
        </header>
        <div className="container mx-auto">
          <section>
            {isChannelsVisible && < Channels user_id={user_id} />}
            {!isChannelsVisible && < Channels user_id={user_id} />}
          </section>
          <footer className='fixed bottom-0 min-w-full'>
            <button onClick={toggleCreateChannelPageVisibility} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
              Create Channel
            </button>
            <button onClick={refreshChannels} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
              Refresh Channels
            </button>
          </footer>
        </div>
      </section>
      {isCreateChannelPageVisible && < CreateChannelPage onCancel={toggleCreateChannelPageVisibility} user_id={user_id} />}
    </div>
  );
};

export default ChannelList;
