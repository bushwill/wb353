// NewPage.js
import React from 'react';

const App = ({ user_id, username }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <section className="py-16 text-center">
        <header>
          <h2 className="text-5xl font-bold mb-8">
            Welcome, {username}
          </h2>
        </header>
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-8">App</h2>
          <p>
            There will be stuff here eventually! Get excited!
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
