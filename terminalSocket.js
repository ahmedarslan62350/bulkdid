const http = require("http");
const socket = require("socket.io");

const server = http.createServer();

const io = new socket.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

if (process.env.isTerminalSocketRunning) {
  console.log("Socket.IO server is already running");
} else {
  server.listen(3005, () => {
    process.env.isTerminalSocketRunning = true;
    console.log("Socket.IO server is running on http://localhost:3005");
  });
}

module.exports = { server, io };
