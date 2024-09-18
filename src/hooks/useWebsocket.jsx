"use client";

import { useState, useEffect } from "react";

export function useWebsocket(url) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setConnected(true);
      setSocket(ws);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onerror = (err) => {
      setError(err);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === 'getOnlineUsers') {
        setOnlineUsers(data.users);
      }
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, error, connected, onlineUsers };
}
