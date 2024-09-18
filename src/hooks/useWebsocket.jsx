"use client";

import { useState, useEffect } from "react";

export const useWebsocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = (user) => {
      console.log("WebSocket connected", user);
      setConnected(true);
      if (user) {
        setOnlineUsers(user);
      }
    };
    console.log(onlineUsers);
    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
      setTimeout(() => {
        setSocket(new WebSocket(url));
      }, 3000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError(event);
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [url]);

  return { socket, error, connected, onlineUsers };
};
