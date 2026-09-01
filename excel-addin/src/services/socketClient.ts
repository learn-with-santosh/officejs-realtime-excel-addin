export let socket: WebSocket | null = null;

export const connectWebSocket = (onDataReceived: (data: any) => void, onStatusChange: (status: string) => void) => {
  socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    onStatusChange('Connected to server.');
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onDataReceived(data);
    } catch (e) {
      console.error('Error parsing socket data', e);
    }
  };

  socket.onclose = () => {
    onStatusChange('Disconnected from server.');
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
    onStatusChange('Error in connection.');
  };
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
