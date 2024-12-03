"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CommandOutput {
  command: string;
  output: string;
}

const socket = io("http://localhost:3005");

export default function Terminal() {
  const [command, setCommand] = useState("");
  const [terminal, setTerminal] = useState("cmd");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post("/api/admin/terminal", { terminal }).then(() => {
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      socket.on("command_output", (line) => {
        setHistory((prevHistory) => [
          ...prevHistory,
          { command: line.command, output: line.output },
        ]);
      });
    });

    return () => {
      socket.off("command_output");
      socket.off("connect");
    };
  }, []);

  const handleCommandSubmit = (command: string) => {
    if (command.trim() !== "") {
      socket.emit("commandSubmit", { command, sessionId: "your-session-id" });
      setCommand("");
      scrollAreaRef.current?.scrollTo(0, 599);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (command === "clear") {
        setHistory([]);
        setCommand("");
      } else {
        handleCommandSubmit(command);
        setCommand("");
      }
    }
  };
  const handleTerminalReload = async () => {
    socket.emit("changeTerminal", { terminal });

    setCommand("");
    setHistory([]);
  };
  return (
    <div className="w-full mx-auto h-screen bg-gray-900 shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="w-fit h-fit flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="w-fit h-fit flex items-center gap-2">
          <Input
            className="bg-white text-black text-xs"
            placeholder="Path to terminal"
            value={terminal}
            onChange={(e) => setTerminal(e.target.value)}
          />
          <Button onClick={handleTerminalReload}>Load terminal</Button>
        </div>
      </div>
      <ScrollArea
        className="flex-grow p-4 font-mono text-sm text-green-400"
        ref={scrollAreaRef}
      >
        {history.map((item, index) => (
          <div key={index}>
            <div className="flex">
              <span className="text-blue-400 mr-2">$</span>
              <span>{item.command}</span>
            </div>
            <div className="whitespace-pre-wrap mb-2">{item.output}</div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex items-center px-4 py-2 bg-gray-800">
        <span className="text-blue-400 mr-2">$</span>
        <input
          type="text"
          value={command}
          onChange={(e) => {
            setCommand(e.target.value);
          }}
          className="flex-grow bg-transparent text-green-400 focus:outline-none font-mono text-sm"
          ref={inputRef}
          autoFocus
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
