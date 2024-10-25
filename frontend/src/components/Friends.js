import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/outline'; // Importing the back arrow icon

const Friends = () => {
  const [roomLink, setRoomLink] = useState("");
  const navigate = useNavigate();

  // Function to generate a random room ID
  const generateRoomId = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    return randomId;
  };

  // Function to create a room
  const createRoom = () => {
    const newRoomId = generateRoomId();
    const link = `room/${newRoomId}`;
    setRoomLink(link);
    alert("Room created! Copy the link and share it with your friends.");
  };

  // Function to join the room
  const joinRoom = () => {
    if (roomLink) {
      navigate(`/${roomLink}`);
    }
  };

  // Function to copy the room link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(`localhost:3000/${roomLink}`);
    alert("Room link copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <section className="friends-section p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
        {/* Back Button */}
        <div
          className="back-button mb-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="h-6 w-6 text-blue-600 dark:text-blue-300 hover:text-blue-500 transition duration-200" />
        </div>
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-4 text-center">
          Play with Friends
        </h2>

        {/* Create Room Button */}
        <button
          className="create-room-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 mb-4 w-full"
          onClick={createRoom}
        >
          Create Room
        </button>

        {/* Room Link */}
        {roomLink && (
          <div className="room-link mt-4 text-sm text-center">
            <p className="dark:text-white">
              Share the following link with your friends to join:
            </p>
            <span className="text-blue-500 dark:text-blue-300 cursor-pointer">
              {`localhost:3000/${roomLink}`}
            </span>
            <button
              className="copy-link-btn bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 ml-4"
              onClick={copyLinkToClipboard}
            >
              Copy Link
            </button>
            <button
              className="join-room-btn bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 ml-4 w-full mt-2"
              onClick={joinRoom}
            >
              Join Room
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Friends;
