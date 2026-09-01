// WebSocket client
export const connectWebSocket = () => {
  const ws = new WebSocket('ws://localhost:8080');
  ws.onmessage = (event) => {
    console.log('Message received:', event.data);
  };
};
