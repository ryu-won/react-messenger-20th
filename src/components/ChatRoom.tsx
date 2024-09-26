import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import ceosProfilePic from "../assets/Profile image.svg";
import userProfilePic from "../assets/Profile image.svg";

// 유저 타입 정의
interface User {
  id: number;
  name: string;
  profilePic: string;
}

// 메시지 타입 정의
interface Message {
  id: number;
  text: string;
  sender: string;
  receiver: string;
  time: string;
}

const ChatRoom: React.FC = () => {
  const navigate = useNavigate();

  // 유저 정보 관리
  const users: { ceos: User; ryu: User } = {
    ceos: {
      id: 1,
      name: "CEOS",
      profilePic: ceosProfilePic,
    },
    ryu: {
      id: 2,
      name: "채린공주",
      profilePic: userProfilePic,
    },
  };

  const [currentUser, setCurrentUser] = useState<User>(users.ryu);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 페이지 로딩 시 로컬 스토리지에서 메시지 불러오기
  useEffect(() => {
    const storedMessages = localStorage.getItem("conversationMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // 새로운 메시지가 추가될 때마다 하단으로 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 헤더의 프로필을 클릭할 때 사용자 전환
  const toggleUser = () => {
    setCurrentUser(
      currentUser.name === users.ryu.name ? users.ceos : users.ryu
    );
  };

  //프로필 보기 버튼 클릭 시 ProfileDetail로 이동
  const handleProfileDetail = () => {
    navigate("/profile-detail", { state: { user: currentUser } });
  };

  // 메시지 전송 핸들러
  const handleSendMessage = (newMessage: string) => {
    const currentTime = new Date().toISOString(); // 현재 시간
    const newMessageData: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: currentUser.name,
      receiver:
        currentUser.name === users.ryu.name ? users.ceos.name : users.ryu.name,
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
    <div className="flex flex-col h-[100vh] w-[375px] mx-auto">
      <Header user={currentUser} onProfileClick={toggleUser} />

      <div className="flex-1 overflow-y-auto p-4 mt-[56px]  mb-[50px]">
        <ProfileInfo user={currentUser} onProfileDetail={handleProfileDetail} />
        <MessageList messages={messages} currentUser={currentUser} />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
