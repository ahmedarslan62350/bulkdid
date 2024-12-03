const http = require("http");
const next = require("next");
const socketIo = require("socket.io");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

let dev = process.env.NODE_ENV ? true : false;

const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = http.createServer(handler);
  const io = new socketIo.Server(httpServer);

  const createLogStream = (filePath, socket, eventName) => {
    const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
    const rl = readline.createInterface({ input: stream });

    rl.on("line", (line) => {
      if (line.trim()) {
        const data = {
          id: `${new Date().toLocaleTimeString()}-${Math.random() * 1000000}`,
          level: eventName === "error" ? "error" : "info",
          message: line,
          timestamp: new Date().toISOString(),
        };
        socket.emit(eventName, data);
      }
    });

    rl.on("close", () => console.log(`${filePath} stream closed.`));

    return rl;
  };

  io.on("connection", (socket) => {
    console.log("Client connected");

    const logFilePath = path.join(process.cwd(), "logs", "combined.log");
    const errorFilePath = path.join(process.cwd(), "logs", "error.log");
    const logStream = createLogStream(logFilePath, socket, "info");

    socket.on("filter", (data) => {
      if (data === "info" || data === "all") {
        createLogStream(logFilePath, socket, data);
        return;
      }
      createLogStream(errorFilePath, socket, data);
    });
    const watchFile = (filePath, eventName) => {
      let lastSize = 0;

      fs.watchFile(filePath, { interval: 1000 }, (curr, prev) => {
        if (curr.mtime > prev.mtime) {
          const stream = fs.createReadStream(filePath, {
            start: lastSize,
            encoding: "utf-8",
          });
          stream.on("data", (chunk) => {
            const lines = chunk.split("\n");
            lines.forEach((line) => {
              if (line.trim()) {
                const data = {
                  id: `${new Date().toLocaleTimeString()}-${
                    Math.random() * 1000000
                  }`,
                  level: eventName,
                  message: line,
                  timestamp: new Date().toISOString(),
                };
                socket.emit(eventName, data);
              }
            });
            lastSize += chunk.length;
          });
        }
      });
    };

    watchFile(logFilePath, "log");
    watchFile(errorFilePath, "error");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      logStream.close();
      fs.unwatchFile(logFilePath);
      fs.unwatchFile(errorFilePath);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
