import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWebSocketStore = defineStore('websocket', () => {
  const socket = ref(null);
  const message = ref('');

  const connect = (url) => {
    if (socket.value) return; // Prevent multiple connections

    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.value.onmessage = (event) => {
      message.value = event.data; // Set the message content
    };

    socket.value.onclose = () => {
      console.log('WebSocket connection closed');
      socket.value = null;
    };

    socket.value.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.close();
    }
  };

  const sendMessage = (msg) => {
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
