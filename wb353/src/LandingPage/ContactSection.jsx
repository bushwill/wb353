import React from "react";

const redirectToGithub = () => {
    window.location.href = 'https://github.com/bushwill';
};

const redirectToLinkedIn = () => {
    window.location.href = 'https://www.linkedin.com/in/william-bushell-482467282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app';
};

const ContactSection = () => {
    return (
        <section className="py-16 text-center">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8">My socials:</h2>
                <nav>
                    <button onClick={redirectToGithub} className="bg-purple-500 hover:bg-purple-700 text-white px-6 py-3 m-px shadow-2xl">
                        Redirect to my Github
                    </button>
                    <button onClick={redirectToLinkedIn} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-px shadow-2xl">
                        Redirect to my LinkedIn
                    </button>
                </nav>
            </div>
        </section>
    );
};

export default ContactSection;