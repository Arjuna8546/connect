const user_url = import.meta.env.VITE_WEBSOCKET_USER_URL
let socketInstance = null;

export const getSocket = (userId) => {
    if (!socketInstance || socketInstance.readyState === WebSocket.CLOSED) {
        socketInstance = new WebSocket(`${user_url}${userId}/`);

        socketInstance.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socketInstance.onclose = () => {
            console.log("❌ WebSocket disconnected");
            socketInstance = null;
        };

        socketInstance.onerror = (error) => {
            console.error("❌ WebSocket error:", error);
        };

    }

    return socketInstance;
};

export const disconnectSocket = () => {
    if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
      socketInstance.close();
      socketInstance = null;
      console.log(" WebSocket manually disconnected");
    }
  };