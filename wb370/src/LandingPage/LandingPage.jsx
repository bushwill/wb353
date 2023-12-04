import React, { useState } from 'react';

import ContactSection from './ContactSection';
import LogInPage from './LoginPage'
import CreateUserPage from './CreateUserPage';

const LandingPage = () => {

  const [isLogInPageVisible, setLogInPageVisibility] = useState(false);
  const toggleLogInPage = () => {
    setLogInPageVisibility(!isLogInPageVisible);
  };

  const [isCreateUserPageVisible, setCreateUserPageVisibility] = useState(false);
  const toggleCreateUserPage = () => {
    setCreateUserPageVisibility(!isCreateUserPageVisible);
  };

  const [isContactSectionVisible, setContactSectionVisibility] = useState(false);
  const toggleContactSection = () => {
    setContactSectionVisibility(!isContactSectionVisible);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-8">Welcome to my System!</h2>
          <div className="text-gray-700 text-lg m-5 text-left">
            <p>
              This is a project I completed individually for CMPT 353, an introductory course to full-stack web programming
            </p>
            <p>
              Cheers! - Will
            </p>
          </div>
          <button onClick={toggleLogInPage} className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
            Log In
          </button>
          <button onClick={toggleCreateUserPage} className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
            Create Account
          </button>
        </div>
      </section>

      {/* Contact Section */}
      {isContactSectionVisible && < ContactSection onCancel={toggleContactSection} />}

      {/* LogInPage Modal */}
      {isLogInPageVisible && < LogInPage onCancel={toggleLogInPage} />}

      {/* CreateAccountPage Modal */}
      {isCreateUserPageVisible && < CreateUserPage onCancel={toggleCreateUserPage} />}

    </div>
  );
};

export default LandingPage;
