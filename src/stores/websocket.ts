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
  const reconnectInterval = 2000; // in milliseconds

  const connect = (url: string) => {
    if (socket.value) return; // Prevent multiple connections

    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('WebSocket connection established');
      isConnected.value = true;
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
    console.log('Attempting to reconnect...');

    setTimeout(() => {
      if (!isConnected.value) {
        connect(url);
      }
    }, reconnectInterval);
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
