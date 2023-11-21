import React from "react";

import App from '../App/App'
import root from '../index'


const LogInPage = () => {
    const redirectToApp = () => {
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    };

    return (
        <div className="bg-gray-100 rounded fixed top-10% min-w-popup min-h-popup text-center">
            <button className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                Close
            </button>
            <h2 className="text-3xl font-bold mb-8">
                Log In Page
            </h2>
        </div>
    );
};

export default LogInPage;