import React, { useState } from 'react';

import App from '../App/App'
import root from '../index'


const LoginPage = ({ onCancel }) => {
    const redirectToApp = () => {
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    };


    const [getUsername, setUsername] = useState("");
    const [getPassword, setPassword] = useState("");

    const [getPopupTitle, setPopupTitle] = useState("");
    const [getPopupMessage, setPopupMessage] = useState("");


    const loginUser = () => {
        fetch('http://localhost:5050/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: getUsername }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        console.error(`HTTP error! Status: ${response.status}, Message: ${data.message || 'Unknown error'}`);
                        setPopupTitle('Error!');
                        setPopupMessage(data.message);
                        setPassword('');
                    });
                } else {
                    return response.json().then(data => {
                        if (data.username === getUsername && data.password === getPassword) {
                            redirectToApp();
                        } else {
                            setPopupTitle('Error! No account found.');
                            setPopupMessage(`Wrong username and/or password.`);
                            setPassword('');
                        }
                    });
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert(`Error: ${error.message || 'Unknown error'}`);
            });
    }



    return (
        <div className="bg-gray-100 rounded fixed top-10% min-w-popup min-h-popup text-center">
            <header className="bg-gray-200 text-left">
                <button onClick={onCancel} className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 m-3 rounded-full shadow-lg">
                    Cancel User Login
                </button>
                <button onClick={redirectToApp} className="bg-pink-500 hover:bg-pink-400 text-white px-3 py-1 m-3 rounded-full shadow-lg">
                    Admin Login
                </button>
            </header>
            <h2 className="text-3xl font-bold mb-8">
                Login:
            </h2>
            <p className='text-red-300'>{getPopupTitle}</p>
            <p className='text-red-300'>{getPopupMessage}</p>
            <form>
                <input
                    className="px-3 py-1 m-1 border-2 border-green-500"
                    type="text"
                    placeholder="Username"
                    value={getUsername}
                    onChange={e => setUsername(e.target.value)}
                />
                <br></br>
                <input
                    className="px-3 py-1 m-1 border-2 border-green-500"
                    type="text"
                    placeholder="Password"
                    value={getPassword}
                    onChange={e => setPassword(e.target.value)}
                />
                <br></br>
                <button type="button" onClick={loginUser} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
