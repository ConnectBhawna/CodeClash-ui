import { useEffect, useState } from "react";

const WS_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export const useSocket = (token) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      ws = null;
    };
  }, [token]);

  return socket;
};
