import { useState, useCallback, useEffect } from 'react';

// Use a default empty string if VITE_REACT_APP_WEBSOCKET_URL is not defined
const websocketUrl = import.meta.env.VITE_REACT_APP_WEBSOCKET_URL || '';

interface GameState {
  board: (string | null)[][];
  currentPlayer: 'X' | 'O';
  winner: 'X' | 'O' | null | 'T';
}

interface Move {
  row: number;
  col: number;
}

interface Message {
  type: string;
  payload: any;
}

const useMultiplayer = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const heartbeatInterval = useRef<number | null>(null);

  const jsonSchemaValidator = useCallback((data: any, schema: any): boolean => {
    try {
      // Basic check to see if data and schema exist. More robust schema validation can be added here.
      if (!data || typeof data !== 'object' || !schema || typeof schema !== 'object') {
        console.error('Invalid data or schema provided for validation.');
        return false;
      }
      return true; // Placeholder for actual schema validation
    } catch (e) {
      console.error('Schema validation error:', e);
      return false;
    }
  }, []);

  const sendMessage = useCallback(
    (message: Message) => {
      if (!websocket) {
        console.error('WebSocket connection not established.');
        return;
      }

      try {
        const messageString = JSON.stringify(message);

        // Basic check for potentially malicious strings. More robust input sanitization can be added here.
        if (typeof messageString !== 'string' || messageString.includes('<script>') || messageString.includes('<iframe>')) {
          console.error('Potential malicious input detected. Closing WebSocket connection.');
          websocket.close();
          setWebsocket(null);
          return;
        }

        websocket.send(messageString);
      } catch (error: any) {
        console.error('Error sending message:', error);
      }
    },
    [websocket]
  );

  const handleIncomingMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const message: Message = JSON.parse(event.data);

        if (!jsonSchemaValidator(message, { type: 'object', properties: { type: { type: 'string' }, payload: { type: 'any' } } })) {
          console.error('Invalid message format. Closing WebSocket connection.');
          websocket?.close();
          setWebsocket(null);
          return;
        }

        switch (message.type) {
          case 'gameStateUpdate':
            if (!jsonSchemaValidator(message.payload, { type: 'object', properties: { board: { type: 'array' }, currentPlayer: { type: 'string' }, winner: { type: ['string', 'null'] } } })) {
              console.error('Invalid gameStateUpdate payload. Closing WebSocket connection.');
              websocket?.close();
              setWebsocket(null);
              return;
            }
            setGameState(message.payload);
            break;
          case 'opponentMove':
            if (!jsonSchemaValidator(message.payload, { type: 'object', properties: { row: { type: 'number' }, col: { type: 'number' } } })) {
              console.error('Invalid opponentMove payload. Closing WebSocket connection.');
              websocket?.close();
              setWebsocket(null);
              return;
            }
            //No UI for this
            break;
          case 'gameStart':
            //Handle if needed, to display user name
            break;
          case 'gameReset':
            //handle if neeeded.
            break;
          default:
            console.error('Unknown message type:', message.type);
        }
      } catch (error: any) {
        console.error('Error handling incoming message:', error);
        websocket?.close();
        setWebsocket(null);
      }
    },
    [jsonSchemaValidator, websocket]
  );

  useEffect(() => {
    if (!websocketUrl) {
      console.error('VITE_REACT_APP_WEBSOCKET_URL is not defined in .env. Please add a valid WebSocket URL.');
      return;
    }

    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket(websocketUrl);

      ws.onopen = () => {
        console.log('WebSocket connection established.');
        if (ws) {
          heartbeatInterval.current = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'heartbeat', payload: 'ping' }));
            }
          }, 30000);
        }
      };

      ws.onmessage = handleIncomingMessage;

      ws.onclose = () => {
        console.log('WebSocket connection closed.');
        clearInterval(heartbeatInterval.current as number);
        setWebsocket(null);
      };

      ws.onerror = (error: any) => {
        console.error('WebSocket error:', error);
        clearInterval(heartbeatInterval.current as number);
        setWebsocket(null);
      };

      setWebsocket(ws);
    } catch (error: any) {
      console.error('Failed to create WebSocket connection:', error);
      setWebsocket(null);
    }

    return () => {
      if (ws) {
        clearInterval(heartbeatInterval.current as number);
        ws.close();
      }
    };
  }, [handleIncomingMessage, websocketUrl]);

  return {
    websocket,
    sendMessage,
    gameState,
  };
};

export { useMultiplayer };