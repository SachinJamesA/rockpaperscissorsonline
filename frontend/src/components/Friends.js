import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    alert("Room created! Copy the link and share with your friends.");
  };

  // Function to join the room
  const joinRoom = () => {
    if (roomLink) {
      navigate(`/${roomLink}`);
    }
  };

  return (
    <section className="friends-section p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Play with Friends</h2>

      {/* Create Room Button */}
      <button
        className="create-room-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 mb-4"
        onClick={createRoom}
      >
        Create Room
      </button>

      {/* Room Link */}
      {roomLink && (
        <div className="room-link mt-4 text-sm">
          <p className="dark:text-white">
            Share the following link with your friends to join:
          </p>
          <span className="text-blue-500 dark:text-blue-300 cursor-pointer">
            {`localhost:3000/${roomLink}`}
          </span>
          <button
            className="join-room-btn bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 ml-4"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      )}
    </section>
  );
};

export default Friends;
