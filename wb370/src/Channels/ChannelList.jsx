import React from 'react';

import Channels from './Channels';

const ChannelList = ({ user_id, username }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <section className="py-16 text-center">
        <header>
          <h2 className="text-5xl font-bold mb-8">
            Welcome, {username}!
          </h2>
        </header>
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-8">
            Channels:
          </h2>
          <section>
            < Channels user_id={user_id}/>
          </section>
        </div>
      </section>
    </div>
  );
};

export default ChannelList;
