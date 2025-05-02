import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { createconversation, getchatconversation} from "../../Endpoints/ChatAPI";
import { useSelector } from "react-redux";

const ChatList = () => {
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(state=>state.user)

  useEffect(() => {
    const initializeData = async () => {
      try {

          setCurrentUserId(user?.user?.id);
        // const userResponse = await api.get("users/");
        // setUsers(userResponse.data);

        const conversationResponse = await getchatconversation();
        setConversations(conversationResponse.data);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, []);

  const handleStartConversation = async () => {
    if (selectedUser && currentUserId) {
      const participants = [selectedUser, currentUserId];
      try {
        const response = await createconversation({participants});
        setConversations([...conversations, response.data]);
        setActiveConversation(response.data);
        setErrorMessage("");
      } catch (error) {
        if (error.response?.data?.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleBackToChatList = () => {
    setActiveConversation(null);
  };

  return (
    <div className="chat-list-container">
      <div className={`chat-sidebar ${activeConversation ? "slide-out" : "slide-in"}`}>
        <header className="chat-header">
          <h1>Welcome to ChitChat</h1>
          <p>Connect with your friends instantly!</p>
        </header>
        <div className="user-selector">
          <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser || ""}>
            <option value="" disabled>
              Select a user to chat with
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <button onClick={handleStartConversation}>Start Conversation</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="conversation-list">
          <h2>Active Conversations</h2>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="conversation-item"
              onClick={() => handleSelectConversation(conversation)}
            >
              <p>
                {conversation.participants
                  .filter((user) => user.id !== currentUserId)
                  .map((user) => user.username)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        {activeConversation ? (
          <Conversation
            conversationId={activeConversation.id}
            currentUserId={currentUserId}
            onBack={handleBackToChatList}
          />
        ) : (
          <p className="no-conversation-message">Select a conversation to view.</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;