import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ timestamp: new Date().toISOString(), value: Math.random() * 100 }));
  }, 1000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
