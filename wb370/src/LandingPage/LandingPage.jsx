import React, { useState } from 'react';

import ContactSection from './Sections/ContactSection';
import LogInPage from './LoginPage'

const LandingPage = () => {

  const [isLogInPageVisible, setLogInPageVisibility] = useState(false);
  const toggleLogInPage = () => {
    setLogInPageVisibility(!isLogInPageVisible);
  };

  const [isContactSectionVisible, setContactSectionVisibility] = useState(true);
  const toggleContactSection = () => {
    setContactSectionVisibility(!isContactSectionVisible);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-8">Welcome to my System!</h2>
          <p className="text-gray-700 text-lg mb-4 text-left">
            This is a project I completed individually for CMPT 353, an introductory course to full-stack web programming
          </p>
          <p className="text-gray-700 text-lg mb-4 text-right">
            Cheers! - Will
          </p>
          <button onClick={toggleLogInPage} className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
            Log In
          </button>
          <button onClick={toggleLogInPage} className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
            Create Account
          </button>
        </div>
      </section>

      {/* Contact Section */}
      {isContactSectionVisible && < ContactSection />}

      {/* LogInPage Modal */}
      {isLogInPageVisible && < LogInPage />}

    </div>
  );
};

export default LandingPage;