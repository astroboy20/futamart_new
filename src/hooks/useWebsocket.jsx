"use client";

import { useState, useEffect } from "react";

export function useWebsocket(url) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!url) return; // Exit if URL is not provided

    const ws = new WebSocket(url);

    ws.onopen = () => {
      setConnected(true);
      setSocket(ws);
    };

    ws.onclose = () => {
      setConnected(false);
      setSocket(null); // Clear the socket on close
    };

    ws.onerror = (err) => {
      setError(err);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'getOnlineUsers') {
          setOnlineUsers(data.users);
        }
      } catch (e) {
        console.error("Failed to parse message:", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, error, connected, onlineUsers };
}
