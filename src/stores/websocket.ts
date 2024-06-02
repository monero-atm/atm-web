import { defineStore } from 'pinia';
import { ref } from 'vue';

type WebSocketMessage = string;

interface WebSocketState {
  socket: WebSocket | null;
  message: WebSocketMessage;
}

export const useWebSocketStore = defineStore('websocket', () => {
  const socket = ref<WebSocket | null>(null);
  const message = ref<WebSocketMessage>('');
  const isConnected = ref<boolean>(false);
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 10;
  const baseReconnectInterval = 1000; // in milliseconds

  const connect = (url: string) => {
    if (socket.value) return; // Prevent multiple connections

    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('WebSocket connection established');
      isConnected.value = true;
      reconnectAttempts = 0; // Reset reconnection attempts on successful connection
    };

    socket.value.onmessage = (event: MessageEvent) => {
      message.value = event.data;
    };

    socket.value.onclose = () => {
      console.log('WebSocket connection closed');
      socket.value = null;
      isConnected.value = false;
      attemptReconnect(url);
    };

    socket.value.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      socket.value?.close(); // Ensure the socket is closed on error
    };
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.close();
    }
  };

  const sendMessage = (msg: WebSocketMessage) => {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(msg);
    }
  };

  const attemptReconnect = (url: string) => {
    if (reconnectAttempts < maxReconnectAttempts) {
      const reconnectInterval = Math.min(baseReconnectInterval * (2 ** reconnectAttempts), 30000); // Exponential backoff
      reconnectAttempts++;
      console.log(`Attempting to reconnect... (attempt ${reconnectAttempts})`);

      setTimeout(() => {
        if (!isConnected.value) {
          connect(url);
        }
      }, reconnectInterval);
    } else {
      console.log('Max reconnect attempts reached. Giving up.');
    }
  };

  return {
    socket,
    message,
    isConnected,
    connect,
    disconnect,
    sendMessage,
  };
});
