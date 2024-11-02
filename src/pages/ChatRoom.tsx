import React, { useState, useEffect, useRef } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import ProfileInfo from "../components/ProfileInfo";
import CHeader from "../components/CHeader";
import ProfileDetail from "../pages/ProfileDetail";
import { useQuery } from "react-query";
import { fetchMessages, fetchUsers } from "../api";
import { useParams } from "react-router-dom";

export interface User {
  id: number;
  name: string;
  profilePic: string;
  facebook: string;
  instagram: string;
  description?: string;
}

export interface Message {
  id: number;
  text: string;
  sender: string;
  receiver: string;
  time: string;
}

const ChatRoom: React.FC = () => {
  const { isLoading: messageLoading, data: messageData = [] } = useQuery<
    Message[]
  >("chat-message", fetchMessages);
  const { isLoading: userLoading, data: userData = [] } = useQuery<User[]>(
    "chat-user",
    fetchUsers
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const params = useParams();
  const [currentUser, setCurrentUser] = useState<User>();
  const [otherUser, setOtherUser] = useState<User>();

  const ryuwon = userData.find((item) => item.name === "김류원");
  const other = userData.find((item) => item.name === params.sender);

  const chatKey = `conversationMessages_${params.sender}`;

  useEffect(() => {
    if (ryuwon) {
      setCurrentUser(ryuwon);
    }
  }, [userData, ryuwon]);

  useEffect(() => {
    if (other) {
      setOtherUser(other);
    }
  }, [params.sender, other]);

  useEffect(() => {
    if (messages.length === 0) {
      const storedMessages = localStorage.getItem(chatKey);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages).filter(
          (item: Message) =>
            item.sender === params.sender || item.receiver === params.sender
        );
        if (parsedMessages.length > 0) {
          setMessages(parsedMessages);
          return;
        }
      }

      const filteredMessages = messageData.filter(
        (item) =>
          (item.sender === params.sender && item.receiver === "김류원") ||
          (item.sender === "김류원" && item.receiver === params.sender)
      );
      setMessages(filteredMessages);
    }
  }, [params.sender, messageData, messages, chatKey]);

  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleUser = () => {
    setCurrentUser(currentUser?.name === "김류원" ? other : ryuwon);
    setOtherUser(currentUser?.name === "김류원" ? ryuwon : other);
  };

  const handleProfileDetail = () => {
    setIsProfileDetailOpen(true);
  };

  const closeProfileDetail = () => {
    setIsProfileDetailOpen(false);
  };

  const handleSendMessage = (newMessage: string) => {
    const currentTime = new Date().toISOString();
    const newMessageData: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "김류원",
      receiver: currentUser
        ? currentUser.name === "김류원"
          ? otherUser?.name || "김류원"
          : currentUser.name
        : "김류원",
      time: currentTime,
    };

    const updatedMessages = [...messages, newMessageData];
    setMessages(updatedMessages);
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
  };

  const loading = userLoading || messageLoading || !currentUser || !otherUser;

  return loading ? (
    <div>로딩중</div>
  ) : (
    <div className="relative flex flex-col h-[100vh] w-full md:max-w-[375px] mx-auto overflow-y-none">
      <CHeader
        user={otherUser}
        onProfileClick={toggleUser}
        isProfileDetailOpen={isProfileDetailOpen}
      />

      <div
        className={`flex-1 overflow-y-auto p-4 mt-[56px] ${
          isProfileDetailOpen ? "" : "mb-[50px]"
        }`}
        style={{ filter: isProfileDetailOpen ? "blur(4px)" : "none" }}
      >
        <ProfileInfo user={otherUser} onProfileDetail={handleProfileDetail} />
        <MessageList
          messages={messages}
          currentUser={currentUser}
          messageData={messageData}
          setMessages={setMessages}
        />
        <div ref={messagesEndRef} />
      </div>
      <MessageInput
        onSendMessage={handleSendMessage}
        isProfileDetailOpen={isProfileDetailOpen}
      />

      {isProfileDetailOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/80 z-50">
          <ProfileDetail user={otherUser} onClose={closeProfileDetail} />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
