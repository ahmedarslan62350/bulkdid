"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/combinedStores";
import { getLogsAnalytics } from "@/redux/slices/analyticsSlice";

interface Log {
  id: string;
  timestamp: string;
  level: string;
  message: string;
  meta: object;
}

export default function LogMonitor() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const logs = useSelector((state: RootState) => state.analytics.logs) as Log[];
  const dispatch = useDispatch<AppDispatch>();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!logs.length) {
      dispatch(getLogsAnalytics());
    }
  }, [dispatch, logs.length]);

  useEffect(() => {
    if (logs) {
      const logsToShow = logs
        .filter(
          (log) => filter === "all" || log.level.toLocaleLowerCase() === filter
        )
        .filter((log) =>
          log?.message?.toLowerCase()?.includes(search.toLowerCase())
        );

      setFilteredLogs(logsToShow);
    }
  }, [filter, logs, search]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  if (!logs) return <p>Loading...</p>;

  const handleSelectChange = (e: string) => {
    setFilter(e);
  };

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
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setFilteredLogs([])}>Clear Logs</Button>
      </div>
      <div className="bg-black text-green-400 p-4 rounded-md h-[600px] overflow-y-auto font-mono text-sm">
        {filteredLogs
          .sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
          .map((log) => (
            <div
              key={`${log.id}${new Date()}${Math.random()}`}
              className="mb-1"
            >
              <span className="text-blue-400">
                [{new Date(log.timestamp).toLocaleString()}]
              </span>{" "}
              <span
                className={`${log.level === "info" ? "text-cyan-400" : ""} ${
                  log.level === "warning" ? "text-yellow-400" : ""
                } ${log.level === "error" ? "text-red-400" : ""}`}
              >
                {log.level.toUpperCase()}
              </span>{" "}
              <span>{log.message}</span>
              <p className="text-xs ml-5 whitespace-pre-wrap font-mono">
                {Object.keys(log.meta).length !== 0 &&
                  JSON.stringify(log.meta, null, 2)}
              </p>
            </div>
          ))}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}
