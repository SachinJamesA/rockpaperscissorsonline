const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import the cors package

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (optional)
  },
});

const options = ["Snake", "Water", "Gun"];
const players = {};

// Handle new player connections
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  // Initialize player scores and choices
  players[socket.id] = {
    choice: null,
    wins: 0,
    losses: 0,
    ties: 0,
  };

  // Server Code Snippet for Score Logic in server.js
  socket.on('makeChoice', (choice) => {
    players[socket.id].choice = choice;
  
    // Check if there’s another player with a choice
    const otherPlayerId = Object.keys(players).find(id => id !== socket.id);
    if (otherPlayerId && players[otherPlayerId].choice) {
      const friendChoice = players[otherPlayerId].choice;
      const yourChoice = players[socket.id].choice;
      const result = determineWinner(yourChoice, friendChoice, players[socket.id], players[otherPlayerId]);
  
      // Emit to the player who made the choice (socket.id) with player perspective
      io.to(socket.id).emit('gameResult', {
        yourChoice,
        friendChoice,
        result,
        scores: {
          yourWins: players[socket.id].wins,          // This player’s actual wins
          friendWins: players[otherPlayerId].wins,    // Other player’s actual wins
        },
      });
  
      // Emit to the other player (otherPlayerId) with friend perspective
      io.to(otherPlayerId).emit('gameResult', {
        yourChoice: friendChoice,                     // Friend's choice as the main choice
        friendChoice: yourChoice,                     // This player's choice as friend's choice
        result: result === "You win!" ? "You lose!" : result === "You lose!" ? "You win!" : result,
        scores: {
          yourWins: players[otherPlayerId].wins,      // This player’s actual wins
          friendWins: players[socket.id].wins,        // Original player’s wins as friend’s wins
        },
      });
  
      // Check for overall winner
      checkOverallWinner(players, socket.id, otherPlayerId);
    }
  });
  
  // Listen for restartMatch event
  socket.on("restartMatch", () => {
    resetGame(); // Reset game state on server
    io.emit("resetGame"); // Notify all players to reset the client state
  });

  // Handle player disconnection
  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
    delete players[socket.id];
  });
});

// Determine winner of a single round
const determineWinner = (playerChoice, friendChoice, player, friend) => {
  if (playerChoice === friendChoice) {
    player.ties++;
    friend.ties++;
    return "It's a tie!";
  }
  if (
    (playerChoice === "Snake" && friendChoice === "Water") ||
    (playerChoice === "Water" && friendChoice === "Gun") ||
    (playerChoice === "Gun" && friendChoice === "Snake")
  ) {
    player.wins++;
    friend.losses++;
    return "You win!";
  }
  player.losses++;
  friend.wins++;
  return "You lose!";
};

// Check if there is an overall winner
const checkOverallWinner = (players, playerId, friendId) => {
  if (players[playerId].wins === 2) {
    io.to(playerId).emit("overallWinner", "You are the overall winner!");
    io.to(friendId).emit("overallWinner", "You lost the game!");
    resetGame(); // Reset game after deciding overall winner
  } else if (players[friendId].wins === 2) {
    io.to(friendId).emit("overallWinner", "You are the overall winner!");
    io.to(playerId).emit("overallWinner", "You lost the game!");
    resetGame();
  }
};

// Reset game state
const resetGame = () => {
  Object.keys(players).forEach((id) => {
    players[id].wins = 0;
    players[id].losses = 0;
    players[id].ties = 0;
    players[id].choice = null;
  });
};

server.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
