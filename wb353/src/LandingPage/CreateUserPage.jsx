import React, { useState } from 'react';


const CreateUserPage = ({ onCancel }) => {

    const [getUsername, setUsername] = useState("");
    const [getPassword, setPassword] = useState("");

    const [getPopupTitle, setPopupTitle] = useState("");
    const [getPopupMessage, setPopupMessage] = useState("");


    const createUser = () => {
        fetch('http://localhost:5050/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: getUsername, password: getPassword }),
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
                    setPassword('');
                    setPopupTitle("Success!");
                    setPopupMessage("Your user has been created successfully! Try logging in using the log in button");
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
                    Close Window
                </button>
            </header>
            <h2 className="text-3xl font-bold mb-8">
                Create User:
            </h2>
            <p>{getPopupTitle}</p>
            <p>{getPopupMessage}</p>
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
                <button type="button" onClick={createUser} className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 m-5 rounded-full shadow-lg">
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUserPage;
