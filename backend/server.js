const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // Import CORS

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "http://localhost:3000" })); // Apply CORS to Express

let playerChoices = {}; // Track player choices by socket ID

// When a client connects
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  // Handle player's choice
  socket.on("makeChoice", (choice) => {
    playerChoices[socket.id] = choice;

    // Check if both players have made their choice
    if (Object.keys(playerChoices).length === 2) {
      const [player1, player2] = Object.keys(playerChoices);
      const player1Choice = playerChoices[player1];
      const player2Choice = playerChoices[player2];

      // Send choices to both players
      io.to(player1).emit("gameResult", {
        yourChoice: player1Choice,
        friendChoice: player2Choice,
        result: getResult(player1Choice, player2Choice),
      });
      io.to(player2).emit("gameResult", {
        yourChoice: player2Choice,
        friendChoice: player1Choice,
        result: getResult(player2Choice, player1Choice),
      });

      // Reset after the game round
      playerChoices = {};
    }
  });

  // When a client disconnects
  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
    delete playerChoices[socket.id]; // Remove player from choices
  });
});

// Function to calculate the game result
function getResult(choice1, choice2) {
  if (choice1 === choice2) return "It's a draw!";
  if (
    (choice1 === "Snake" && choice2 === "Water") ||
    (choice1 === "Water" && choice2 === "Gun") ||
    (choice1 === "Gun" && choice2 === "Snake")
  ) {
    return "You Win!";
  }
  return "Your Friend Wins!";
}

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
