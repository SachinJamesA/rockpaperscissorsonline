import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SnakeWaterGun from "./SnakeWaterGun";

const Room = () => {
  const { roomId } = useParams();

  useEffect(() => {
    console.log(`Joined room: ${roomId}`);
  }, [roomId]);

  return (
    <div className="room-container p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">
        Room ID: {roomId}
      </h2>
      <p className="text-lg dark:text-white mb-4">
        Invite your friends and start playing Snake Water Gun!
      </p>

      {/* Snake Water Gun Game */}
      <SnakeWaterGun />
    </div>
  );
};

export default Room;
