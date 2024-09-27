import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ProfileInfo from "./ProfileInfo";
import ProfileDetail from "./ProfileDetail";
import ceosProfilePic from "../assets/Profile image.svg";
import userProfilePic from "../assets/Profile image.svg";

interface User {
  id: number;
  name: string;
  profilePic: string;
  facebook: string;
  instagram: string;
}

interface Message {
  id: number;
  text: string;
  sender: string;
  receiver: string;
  time: string;
}

const ChatRoom: React.FC = () => {
  const users: { ceos: User; chae: User } = {
    ceos: {
      id: 1,
      name: "CEOS",
      profilePic: ceosProfilePic,
      facebook: "https://www.facebook.com/clubceos/",
      instagram: "https://www.instagram.com/ceos.sinchon/",
    },
    chae: {
      id: 2,
      name: "채린공주",
      profilePic: userProfilePic,
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
    },
  };

  const [currentUser, setCurrentUser] = useState<User>(users.chae);

  const otherUser =
    currentUser.name === users.chae.name ? users.ceos : users.chae;

  const initialMessages: Message[] = [
    {
      id: 1,
      text: "머하밍??",
      sender: "CEOS",
      receiver: "채린공주",
      time: new Date().toISOString(),
    },
    {
      id: 2,
      text: "과제중🤮🤮",
      sender: "채린공주",
      receiver: "CEOS",
      time: new Date().toISOString(),
    },
    {
      id: 3,
      text: "🤦‍♀️🤦‍♀️",
      sender: "CEOS",
      receiver: "채린공주",
      time: new Date().toISOString(),
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // LocalStorage에 저장된 메시지가 있으면 불러오기
    const storedMessages = localStorage.getItem("conversationMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleUser = () => {
    setCurrentUser(
      currentUser.name === users.chae.name ? users.ceos : users.chae
    );
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
      sender: currentUser.name,
      receiver:
        currentUser.name === users.chae.name
          ? users.ceos.name
          : users.chae.name,
      time: currentTime,
    };

    const updatedMessages = [...messages, newMessageData];
    setMessages(updatedMessages);
    localStorage.setItem(
      "conversationMessages",
      JSON.stringify(updatedMessages)
    );
  };

  return (
    <div className="relative flex flex-col h-[100vh] w-full md:max-w-[375px] mx-auto overflow-y-none">
      <Header
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
        <MessageList messages={messages} currentUser={currentUser} />
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
