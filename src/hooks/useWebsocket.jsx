"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const useWebsocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    };

    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessage(event.data);
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError(event);
    };
    setSocket(ws);

    return () => {
      ws?.onclose();
    };
  }, [url]);

  return { socket, error, connected };
};
