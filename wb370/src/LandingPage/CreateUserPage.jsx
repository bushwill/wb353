import React from "react";

import App from '../App/App'
import root from '../index'


const CreateUserPage = ({ onCancel }) => {
    const redirectToApp = () => {
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    };

    return (
        <div className="bg-gray-100 rounded fixed top-10% min-w-popup min-h-popup text-center">
            <header className="bg-gray-200 text-left">
                <button onClick={onCancel} className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 m-3 rounded-full shadow-lg">
                    Cancel User Creation
                </button>
                <button onClick={redirectToApp} className="bg-pink-500 hover:bg-pink-400 text-white px-3 py-1 m-3 rounded-full shadow-lg">
                    Admin Log In
                </button>
            </header>
            <h2 className="text-3xl font-bold mb-8">
                Create User:
            </h2>
            <form>
                <input
                    className="px-3 py-1 m-1 border-2 border-green-500"
                    type="text"
                    placeholder="Username">
                </input>
                <br></br>
                <input
                    className="px-3 py-1 m-1 border-2 border-green-500"
                    type="text"
                    placeholder="Password">
                </input>
                <br></br>
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUserPage;