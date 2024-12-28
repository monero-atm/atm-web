import { defineStore } from 'pinia';
import { ref } from 'vue';

type WebSocketMessage = string;

export const useWebSocketStore = defineStore('websocket', () => {
  const socket = ref<WebSocket | null>(null);
  const message = ref<WebSocketMessage>('');
  const isConnected = ref(false);
  const reconnectInterval = 2000; // in milliseconds
  const lastUrl = ref<string | null>(null);

  const connect = (url: string) => {
    // If already connected or connecting, return
    if (socket.value) return;

    // Store the last used URL for potential reconnection
    lastUrl.value = url;

    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log('WebSocket connection established');
      isConnected.value = true;

      // Send the cancel message on reconnection
      sendMessage(JSON.stringify({ event: 'cancel', value: null }));
    };

    socket.value.onmessage = (event: MessageEvent) => {
      message.value = event.data;
    };

    socket.value.onclose = () => {
      console.log('WebSocket connection closed');
      
      // Only attempt reconnect if we had a last known URL
      if (lastUrl.value) {
        attemptReconnect(lastUrl.value);
      }

      socket.value = null;
      isConnected.value = false;
    };

    socket.value.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      socket.value?.close(); // Ensure the socket is closed on error
    };
  };

  const disconnect = () => {
    if (socket.value) {
      // Remove the last URL to prevent automatic reconnection
      lastUrl.value = null;
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