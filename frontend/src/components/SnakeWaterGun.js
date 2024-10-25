import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Game options
const options = ["Snake", "Water", "Gun"];
const socket = io("http://localhost:3001"); // Connect to WebSocket server

const SnakeWaterGun = () => {
  const [playerChoice, setPlayerChoice] = useState(null); // Your choice
  const [friendChoice, setFriendChoice] = useState(null); // Friend's choice
  const [result, setResult] = useState(""); // Result of the game
  const [yourWins, setYourWins] = useState(0); // Your round wins
  const [friendWins, setFriendWins] = useState(0); // Friend's round wins
  const [overallWinner, setOverallWinner] = useState(""); // Overall winner message
  const [gameEnded, setGameEnded] = useState(false); // Track if the game has ended


  // Handle player's choice
  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    socket.emit("makeChoice", choice); // Send your choice to the server
  };

  // Reset game state
  const resetGame = () => {
    setPlayerChoice(null);
    setFriendChoice(null);
    setResult("");
    setOverallWinner("");
    setGameEnded(false); // Reset game ended state
  };

  // Restart the match
  const handleRestartMatch = () => {
    resetGame();
    setYourWins(0);
    setFriendWins(0);
    socket.emit("restartMatch"); // Notify server to reset players' scores
  };

  // Listen for game result from the server
  useEffect(() => {
    socket.on("gameResult", ({ yourChoice, friendChoice, result, scores }) => {
      setPlayerChoice(yourChoice);
      setFriendChoice(friendChoice);
      setResult(result);
      setYourWins(scores.yourWins); // Update yourWins
      setFriendWins(scores.friendWins); // Update friendWins

      // Check for overall winner
      if (scores.yourWins === 2 || scores.friendWins === 2) {
        setOverallWinner(scores.yourWins === 2 ? "You are the overall winner!" : "Your friend is the overall winner!");
        setGameEnded(true); // Mark game as ended
        console.log("Game ended."); // Debug log
      }
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.off("gameResult");
    };
  }, []);

  return (
    <div className="snake-water-gun-game p-8 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-xl transition-all duration-300">
      <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-6 text-center">Snake Water Gun</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
        Select your move and see if you can beat your friend!
      </p>

      {/* Display overall winner */}
      {overallWinner && (
        <div className="overall-winner text-lg text-green-600 dark:text-green-400 mb-4 text-center">
          <strong>{overallWinner}</strong>
        </div>
      )}

      {/* Player's choices */}
      {!gameEnded && !playerChoice && (
        <div className="choices flex justify-center mb-6 space-x-4">
          {options.map((option) => (
            <button
              key={option}
              className="choice-btn bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition hover:bg-blue-500 transform hover:scale-105"
              onClick={() => handlePlayerChoice(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Show choices and results after both have made their choice */}
      {playerChoice && friendChoice && (
        <div className="results text-lg text-gray-800 dark:text-gray-200 text-center">
          <p>
            <strong>Your Choice:</strong> {playerChoice}
          </p>
          <p>
            <strong>Your Friend's Choice:</strong> {friendChoice}
          </p>
          <p className={`result mt-4 text-xl font-bold ${result === "You win!" ? "text-green-500" : result === "You lose!" ? "text-red-500" : "text-yellow-500"}`}>
            {result}
          </p>
        </div>
      )}

      {/* Show a loading state while waiting for friend's choice */}
      {playerChoice && !friendChoice && (
        <div className="loading text-lg text-gray-700 dark:text-gray-300 text-center">
          Waiting for your friend to choose...
        </div>
      )}

      {/* Display scores */}
      <div className="scores text-lg text-gray-800 dark:text-gray-200 mt-4 text-center">
        <p><strong>Your Wins:</strong> {yourWins}</p>
        <p><strong>Your Friend's Wins:</strong> {friendWins}</p>
      </div>

      <div className="action-buttons mt-6 text-center">
        <button
          className="restart-btn bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition hover:bg-green-500 transform hover:scale-105"
          onClick={handleRestartMatch}
        >
          Restart Match
        </button>
      </div>
    </div>
  );
};

export default SnakeWaterGun;
