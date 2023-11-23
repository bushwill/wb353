import React from 'react';

import Posts from '../Posts/Posts'


const ChannelPage = ({ user_id, channel_id, channel_name }) => {
  
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
            < Posts user_id={user_id} channel_id={channel_id} />
          </section>
        </div>
      </section>
    </div>
  );
};

export default ChannelPage;
