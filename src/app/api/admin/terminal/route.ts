import { ChildProcess, spawn } from "child_process";
import { Socket } from "socket.io";
import { NextResponse } from "next/server";
import { io } from "../../../../../terminalSocket.js";

let terminalProcess: ChildProcess | null = null;
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
    console.log("Changing the terminal" + terminal);
    terminalProcess?.kill("SIGINT");
    console.log("Killed the terminal");
    terminalProcess = null;
    startTerminalSession(socket, terminal);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

async function startTerminalSession(socket: Socket, terminal: string) {
  try {
    terminalProcess = (await spawn(terminal, {
      cwd: process.cwd(),
      shell: false,
    })) as ChildProcess;
    terminalProcess.stderr?.on("data", (data: Buffer) => {
      console.log("Starting a new error");
      const output = data.toString();
      socket.emit("command_output", { output });
    });

    terminalProcess.stdout?.on("data", (data: Buffer) => {
      console.log("Starting a new terminal started");
      const output = data.toString();
      socket.emit("command_output", { output });
    });
  } catch (error) {
    console.log(error);
  }
}

function executeCommand(command: string, socket: Socket) {
  if (terminalProcess) {
    terminalProcess.stdin?.write(`${command}\n`);
  } else {
    socket.emit("command_output", { output: "No terminal session active" });
  }
}

export async function POST() {
  return NextResponse.json({ message: "Connected" });
}
