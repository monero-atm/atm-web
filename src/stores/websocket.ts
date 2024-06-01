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

  const connect = (url: string) => {
    if (socket.value) return; // Prevent multiple connections

    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.value.onmessage = (event: MessageEvent) => {
      message.value = event.data;
    };

    socket.value.onclose = () => {
      console.log('WebSocket connection closed');
      socket.value = null;
    };

    socket.value.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
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

  return {
    socket,
    message,
    connect,
    disconnect,
    sendMessage,
  };
});
