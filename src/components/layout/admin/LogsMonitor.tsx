"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import socket from "@/lib/Socket";

interface Log {
  id: string;
  timestamp: string;
  level: string;
  message: string;
}

interface LogMonitorProps {
  initialLogs: Log[];
}

export default function LogMonitor({ initialLogs }: LogMonitorProps) {
  const [logs, setLogs] = useState<Log[]>(initialLogs || []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Function to add new logs safely
  const addLog = (newLog: Log) => {
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  useEffect(() => {
    // Listener for receiving log messages
    const handleLog = (data: Log) => addLog(data);

    // Listener for error logs
    const handleError = (data: Log) => addLog(data);

    socket.on("log", handleLog);
    socket.on("info", handleLog);
    socket.on("warning", handleLog);
    socket.on("all", handleLog);
    socket.on("error", handleError);

    return () => {
      // Cleanup listeners to prevent memory leaks
      socket.off("log", handleLog);
      socket.off("error", handleError);
    };
  }, []);

  useEffect(() => {
    // Auto-scroll terminal to the bottom on new logs
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSelectChange = (e: string) => {
    setFilter(e);
    socket.emit("filter", e); // Emit filter event to the server
  };

  const filteredLogs = logs
    .filter((log) => filter === "all" || log.level === filter)
    .filter((log) => log.message.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Select value={filter} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setLogs([])}>Clear Logs</Button>
      </div>
      <div
        ref={terminalRef}
        className="bg-black text-green-400 p-4 rounded-md h-[600px] overflow-y-auto font-mono text-sm"
      >
        {filteredLogs.map((log) => (
          <div key={`${log.id}${new Date()}${Math.random()}`} className="mb-1">
            <span className="text-blue-400">
              [{new Date(log.timestamp).toLocaleString()}]
            </span>{" "}
            <span
              className={`${
                log.level === "info" ? "text-cyan-400" : ""
              } ${log.level === "warning" ? "text-yellow-400" : ""} ${
                log.level === "error" ? "text-red-400" : ""
              }`}
            >
              {log.level.toUpperCase()}
            </span>{" "}
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
