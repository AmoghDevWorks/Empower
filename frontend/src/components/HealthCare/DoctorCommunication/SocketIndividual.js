import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Backend URL

const SocketIndividual = () => {
  const [username, setUsername] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]); // Store usernames here

  // On first load, prompt for username and register it
  useEffect(() => {
    const storedUsername = prompt('Enter your username:');
    if (storedUsername) {
      setUsername(storedUsername);
      socket.emit('register', storedUsername); // Emit the username to server
    }
  }, []);

  useEffect(() => {
    // Listen for updated user list
    socket.on('update_user_list', (userList) => {
      setUsers(userList);
    });

    // Listen for private messages
    socket.on('private_message', ({ sender, message }) => {
      setChat((prevChat) => [...prevChat, { sender, message }]);
    });

    // Handle user not connected
    socket.on('user_not_connected', (recipient) => {
      alert(`${recipient} is not connected.`);
    });

    return () => {
      socket.off('private_message');
      socket.off('user_not_connected');
      socket.off('update_user_list');
    };
  }, []);

  const sendMessage = () => {
    if (!recipient) {
      alert('Please select a recipient!');
      return;
    }

    socket.emit('private_message', {
      sender: username,
      recipient,
      message,
    });

    setChat((prevChat) => [
      ...prevChat,
      { sender: 'You', message: message },
    ]);
    setMessage('');
  };

  return (
    <div className="text-indigo-600 flex flex-col h-screen justify-between bg-gray-100 p-5">
      <div className="text-center text-3xl mb-5">
        <h1 className='font-haverbrooke text-5xl font-semibold'>Connect with a Doctor </h1>
      </div>

      {/* Chat Box */}
      <div className="flex flex-col h-2/3 bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        <div className="flex-1 space-y-4">
          {chat.map((line, index) => (
            <div
              key={index}
              className={`flex ${line.sender === 'You' ? 'justify-end' : 'justify-start'} space-x-2`}
            >
              {/* Sender's Name and Message */}
              <div
                className={`p-3 rounded-lg ${
                  line.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                } max-w-xs`}
              >
                <strong>{line.sender}:</strong> {line.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="mt-5">
        <label className="block mb-2">Select recipient:</label>
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
        >
          <option value="">Select a user</option>
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocketIndividual;