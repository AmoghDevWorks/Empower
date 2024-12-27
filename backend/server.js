const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const { Server } = require('socket.io');
const http = require('http');

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Create an HTTP server using Express
const server = http.createServer(app);

// Create a Socket.IO server and associate it with the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Map to store user-specific socket connections
const users = new Map();

// Handle Socket.IO events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Register user with their socket ID
  socket.on('register', (username) => {
    users.set(username, socket.id);
    console.log(`${username} registered with socket ID: ${socket.id}`);
    
    // Notify all clients of the new user
    io.emit('update_user_list', [...users.keys()]);
  });

  // Handle private messages
  socket.on('private_message', ({ sender, recipient, message }) => {
    const recipientSocketId = users.get(recipient);

    if (recipientSocketId) {
      // Send the message to the recipient
      io.to(recipientSocketId).emit('private_message', {
        sender,
        message,
      });
    } else {
      // Notify the sender if the recipient is not connected
      socket.emit('user_not_connected', recipient);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    let disconnectedUser;
    for (const [username, socketId] of users.entries()) {
      if (socketId === socket.id) {
        disconnectedUser = username;
        users.delete(username);
        break;
      }
    }
    console.log(`User disconnected: ${disconnectedUser}`);

    // Notify all clients of the updated user list
    io.emit('update_user_list', [...users.keys()]);
  });
});

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
