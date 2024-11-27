"use client"

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = io();

    socket.on('log', (data) => {
      console.log(typeof data);
      setLogs((prevLogs:any):any => [...prevLogs, data]);
    });

    socket.on('error', (data) => {
      setLogs((prevLogs:any):any => [...prevLogs, `ERROR: ${data}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Logs</h1>
      <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default LogViewer;
