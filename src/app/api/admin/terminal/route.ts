import { spawn } from "child_process";
import { Socket } from "socket.io";
import { NextResponse } from "next/server";
import { io } from "../../../../../terminalSocket.js";

let terminalProcess: any = null;
let terminalType: string = "cmd";

io.on("connection", (socket) => {
  console.log("A user connected");

  if (!terminalProcess) {
    startTerminalSession(socket, terminalType);
  }

  socket.on("commandSubmit", ({ command }) => {
    executeCommand(command, socket);
  });
  socket.on("changeTerminal", ({ terminal }) => {
    terminalProcess.kill("SIGINT");
    terminalProcess = null;
    startTerminalSession(socket, terminal);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

function startTerminalSession(socket: Socket, terminal: string) {
  console.log("Starting session...");
  terminalProcess = spawn(terminal, {
    cwd: process.cwd(),
    shell: true,
  });
  terminalProcess.stderr.on("data", (data: Buffer) => {
    const output = data.toString();
    socket.emit("command_output", { output });
  });

  terminalProcess.stdout.on("data", (data: Buffer) => {
    const output = data.toString();
    output.split("\n").forEach((line: string) => {
      if (line === "") {
        return;
      } else {
        socket.emit("command_output", { output: line });
      }
    });
  });
}

function executeCommand(command: string, socket: any) {
  if (terminalProcess) {
    terminalProcess.stdin.write(`${command}\n`);
  } else {
    socket.emit("command_output", { output: "No terminal session active" });
  }
}

export async function POST() {
  return NextResponse.json({ message: "Connected" });
}
