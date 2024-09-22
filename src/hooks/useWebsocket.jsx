"use client";

import { useState, useEffect, useRef } from "react";

export function useWebsocket(url) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  const pingIntervalRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const pingTimeout = 30000; // 30 seconds for ping
  
  const reconnectDelay = 5000; // 5 seconds between reconnection attempts

  const connectWebSocket = () => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setConnected(true);
      setSocket(ws);
      
      // Start pinging the server
      pingIntervalRef.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ event: "ping" }));
        }
      }, pingTimeout);
    };

    ws.onclose = () => {
      setConnected(false);
      setSocket(null); // Clear the socket on close
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current); // Stop pinging
      }
      
      // Attempt to reconnect after a delay
      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket();
      }, reconnectDelay);
    };

    ws.onerror = (err) => {
      setError(err);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "getOnlineUsers") {
          setOnlineUsers(data.users);
        }
      } catch (e) {
        console.error("Failed to parse message:", e);
      }
    };
  };

  useEffect(() => {
    if (!url) return;

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [url]);

  return { socket, error, connected, onlineUsers };
}
