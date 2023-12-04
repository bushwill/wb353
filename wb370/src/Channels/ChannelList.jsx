/*
    TODO -> Prevent two channels of the same name
*/

import React, { useState, useEffect } from 'react';

import CreateChannelPage from './CreateChannelPage'
import Channels from './Channels';

const ChannelList = ({ user_id }) => {

  const [getUsername, setUsername] = useState("");
  useEffect(() => {
    const fetchData = async () => {
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
        setUsername(data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user_id]);


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
    <div className="bg-white flex flex-col min-w-screen items-center">
      <header className="bg-white min-w-full top-0 left-0 fixed items-center text-center">
        <span className="text-5xl font-bold mx-6">
          Channels:
        </span>
      </header>
      <section className="py-16 text-center min-w-full">
        <h2 className='text-5xl font-bold mx-6'>
          Welcome, {getUsername}!
        </h2>
        <div className="container mx-auto">
          <section>
            {isChannelsVisible && <Channels user_id={user_id} />}
            {!isChannelsVisible && <Channels user_id={user_id} />}
          </section>
        </div>
      </section>
      <footer className='fixed bottom-0 min-w-full'>
        <button onClick={toggleCreateChannelPageVisibility} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
          Create Channel
        </button>
        <button onClick={refreshChannels} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
          Refresh Channels
        </button>
      </footer>
      {isCreateChannelPageVisible && <CreateChannelPage onCancel={toggleCreateChannelPageVisibility} user_id={user_id} />}
    </div>
  );

};

export default ChannelList;
