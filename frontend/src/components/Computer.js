import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/outline'; // Importing the back arrow icon

const options = ["Snake", "Water", "Gun"];

const Computer = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [yourWins, setYourWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [overallWinner, setOverallWinner] = useState("");
  const [gameEnded, setGameEnded] = useState(false);

  const navigate = useNavigate();

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const computerChoice = generateComputerChoice();
    setComputerChoice(computerChoice);
    determineResult(choice, computerChoice);
  };

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const determineResult = (player, computer) => {
    if (player === computer) {
      setResult("It's a draw!");
    } else if (
      (player === "Snake" && computer === "Water") ||
      (player === "Water" && computer === "Gun") ||
      (player === "Gun" && computer === "Snake")
    ) {
      setResult("You win!");
      setYourWins((prevWins) => prevWins + 1);
    } else {
      setResult("You lose!");
      setComputerWins((prevWins) => prevWins + 1);
    }

    if (yourWins === 2 || computerWins === 2) {
      setOverallWinner(yourWins === 2 ? "You are the overall winner!" : "The computer is the overall winner!");
      setGameEnded(true);
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setOverallWinner("");
    setGameEnded(false);
  };

  const handleRestartMatch = () => {
    resetGame();
    setYourWins(0);
    setComputerWins(0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="computer-game-container p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md transition-all duration-300">
        {/* Back Button */}
        <div className="back-button mb-4 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="h-6 w-6 text-blue-600 dark:text-blue-300 hover:text-blue-500 transition duration-200" />
        </div>

        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-4 text-center">Snake Water Gun vs Computer</h2>

        {/* Display overall winner */}
        {overallWinner && (
          <div className="overall-winner text-lg dark:text-white mb-4">
            <strong>{overallWinner}</strong>
          </div>
        )}

        {/* Player's choices */}
        {!gameEnded && !playerChoice && (
          <div className="choices flex justify-around mb-6">
            {options.map((option) => (
              <button
                key={option}
                className="choice-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200 transform hover:scale-105"
                onClick={() => handlePlayerChoice(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Show choices and results after both have made their choice */}
        {playerChoice && computerChoice && (
          <div className="results text-lg dark:text-white text-center mt-4">
            <p>
              <strong>Your Choice:</strong> {playerChoice}
            </p>
            <p>
              <strong>Computer's Choice:</strong> {computerChoice}
            </p>
            <p className={`result mt-4 text-xl font-bold ${result === "You win!" ? "text-green-500" : result === "You lose!" ? "text-red-500" : "text-yellow-500"}`}>
              {result}
            </p>
          </div>
        )}

        {/* Loading state while waiting for computer's choice */}
        {playerChoice && !computerChoice && (
          <div className="loading text-lg dark:text-white text-center">
            Waiting for the computer to choose...
          </div>
        )}

        {/* Display scores */}
        <div className="scores text-lg dark:text-white mt-4 text-center">
          <p><strong>Your Wins:</strong> {yourWins}</p>
          <p><strong>Computer Wins:</strong> {computerWins}</p>
        </div>

        {/* Show restart button if the game has ended */}
        <div className="action-buttons mt-4 text-center">
          <button
            className="restart-btn bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-200 transform hover:scale-105"
            onClick={handleRestartMatch}
          >
            Restart Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default Computer;
