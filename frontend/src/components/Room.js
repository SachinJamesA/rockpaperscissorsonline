import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SnakeWaterGun from "./SnakeWaterGun";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/outline'; // Importing the back arrow icon

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Joined room: ${roomId}`);
  }, [roomId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="room-container p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
        {/* Back Button */}
        <div
          className="back-button mb-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="h-6 w-6 text-blue-600 dark:text-blue-300 hover:text-blue-500 transition duration-200" />
        </div>
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-4 text-center">
          Room ID: {roomId}
        </h2>
        <p className="text-lg dark:text-white mb-4 text-center">
          Invite your friends and start playing Snake Water Gun!
        </p>

        {/* Snake Water Gun Game */}
        <SnakeWaterGun />
      </div>
    </div>
  );
};

export default Room;
