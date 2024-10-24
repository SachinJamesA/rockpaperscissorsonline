import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Game options
const options = ["Snake", "Water", "Gun"];
const socket = io("http://localhost:3001"); // Connect to WebSocket server

const SnakeWaterGun = () => {
  const [playerChoice, setPlayerChoice] = useState(null); // Your choice
  const [friendChoice, setFriendChoice] = useState(null); // Friend's choice
  const [result, setResult] = useState(""); // Result of the game

  // Handle player's choice
  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    socket.emit("makeChoice", choice); // Send your choice to the server
  };

  // Listen for game result from the server
  useEffect(() => {
    socket.on("gameResult", ({ yourChoice, friendChoice, result }) => {
      setPlayerChoice(yourChoice);
      setFriendChoice(friendChoice);
      setResult(result);
    });
  }, []);

  return (
    <div className="snake-water-gun-game p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Snake Water Gun</h2>
      <p className="text-lg dark:text-white mb-4">
        Select your move and see if you can beat your friend!
      </p>

      {/* Player's choices */}
      {!playerChoice && (
        <div className="choices flex justify-around mb-6">
          {options.map((option) => (
            <button
              key={option}
              className="choice-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              onClick={() => handlePlayerChoice(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Show choices and results after both have made their choice */}
      {playerChoice && friendChoice && (
        <div className="results text-lg dark:text-white">
          <p>
            <strong>Your Choice:</strong> {playerChoice}
          </p>
          <p>
            <strong>Your Friend's Choice:</strong> {friendChoice}
          </p>
          <p className="result mt-4 text-xl font-bold">{result}</p>
        </div>
      )}

      {/* Show a loading state while waiting for friend's choice */}
      {playerChoice && !friendChoice && (
        <div className="loading text-lg dark:text-white">
          Waiting for your friend to choose...
        </div>
      )}
    </div>
  );
};

export default SnakeWaterGun;
