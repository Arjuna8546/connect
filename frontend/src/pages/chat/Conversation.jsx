import React, { useEffect, useState, useRef } from "react";
import { specificconversation } from "../../Endpoints/ChatAPI";
import { useSelector } from "react-redux";


const Conversation = ({ conversationId, currentUserId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isChange,setIsChange] = useState(false)
  const [newMessage, setNewMessage] = useState("");
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);
  const typingTimeoutRef = useRef(null);
  const user = useSelector(state => state.user)

  useEffect(() => {
    const fetchConversationData = async () => {
      if (!conversationId) {
        console.error("Invalid conversationId:", conversationId);
        return;
      }

      try {
        setLoading(true);
        const response = await specificconversation(conversationId);
        const messages = response.data || [];
        setMessages(messages);

        if (messages.length > 0) {
          const participants = messages[0]?.participants || [];
          const chatPartner = participants.find((user) => user.id !== currentUserId);

          if (chatPartner) {
            setChatPartner(chatPartner);
          } else {
            console.error("No valid chat partner found");
          }
        }
      } catch (error) {
        console.error("Error fetching conversation data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversationData();
  }, [conversationId, currentUserId]);

  useEffect(() => {
    if (!conversationId) return;

    const websocket = new WebSocket(`ws://localhost:8000/ws/chat/${conversationId}/?user_id=${user?.user?.id}`);

    websocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    websocket.onclose = () => {
      setIsChange(!isChange)
      console.log("closed")
    }

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat_message") {
          const { message, user, timestamp } = data;
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: data.id, sender: user, content: message, timestamp },
          ]);
          setTypingUser(null);
        } else if (data.type === "typing") {
          const { user, receiver } = data;

          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }

          if (receiver === currentUserId && user.id !== currentUserId) {
            setTypingUser(user);
            typingTimeoutRef.current = setTimeout(() => {
              setTypingUser(null);
              typingTimeoutRef.current = null;
            }, 2000);
          }
        } else if (data.type === "online_status") {
          console.log(data.online_users)
          setOnlineUsers(data?.online_users);
        }

        else if (data.type === "message_deleted") {
          const { message_id } = data;
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.id !== message_id)
          );
        }
        
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    setSocket(websocket);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      websocket.close();
    };
  }, [isChange]);

  const handleSendMessage = () => {
    if (!conversationId || !newMessage.trim()) {
      console.error("Cannot send message: Invalid conversationId or empty message");
      return;
    }
    if (socket?.readyState === WebSocket.OPEN) {
      const messagePayload = {
        type: "chat_message",
        message: newMessage,
        user: currentUserId,
      };

      socket.send(JSON.stringify(messagePayload));
      setNewMessage("");
    } else {
      console.error("WebSocket is not open. Message not sent.");
    }
  };

  const handleTyping = () => {
    if (!chatPartner || socket?.readyState !== WebSocket.OPEN) {
      console.error("Cannot send typing event: No chat partner or WebSocket is not open.");
      return;
    }

    const receiverId = chatPartner.id;


    socket.send(
      JSON.stringify({
        type: "typing",
        user: currentUserId,
        receiver: receiverId,
      })
    );
  };

  const debouncedHandleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    handleTyping();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const handleDeleteMessage = async (messageId) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: "delete_message",
        message_id: messageId,
      }));
    }
  };


  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <button className="back-button" onClick={onBack}>Back</button>
        <h3>{chatPartner ? `Chat with ${chatPartner.username}` : "Chat"}</h3>
        <div className="online-status">
          {onlineUsers.length > 0 ? (
            onlineUsers
              .filter((user) => user.id !== currentUserId) 
              .map((user) => (
                <span key={user.id} className="online-user">
                  {user.username} (online)
                </span>
              ))
          ) : (
            <span>No users online</span>
          )}
        </div>
      </div>

      <div className="messages-container">
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((message, index) => {
            const isSentByCurrentUser = message.sender?.id === currentUserId;

            return (
              <div key={index} className={`message-wrapper ${isSentByCurrentUser ? "sent" : "received"}`}>
                {!isSentByCurrentUser && (
                  <span className="message-username">
                    {message.sender?.username || "Unknown"}
                  </span>
                )}
                <div className="message-bubble">
                  {message.content}
                  {isSentByCurrentUser && (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
              </div>
            );
          })
        )}
      </div>

      {typingUser && (
        <div className="typing-indicator">
          {typingUser.username} is typing...
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value)
            debouncedHandleTyping();
          }}
          onKeyDown={handleTyping}
          placeholder="Type a message..."
          className="message-input"
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Conversation;