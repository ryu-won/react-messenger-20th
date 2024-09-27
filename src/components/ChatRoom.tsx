import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ProfileInfo from "./ProfileInfo";
import ProfileDetail from "./ProfileDetail";
import ceosProfilePic from "../assets/Profile image.svg";
import userProfilePic from "../assets/Profile image.svg";

// 유저 타입 정의
interface User {
  id: number;
  name: string;
  profilePic: string;
  facebook: string;
  instagram: string;
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
  // 유저 정보 관리
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false); // 프로필 보기 버튼 클릭 상태
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
      currentUser.name === users.chae.name ? users.ceos : users.chae
    );
  };

  // 프로필 보기 버튼 클릭 시 ProfileDetail 열기
  const handleProfileDetail = () => {
    setIsProfileDetailOpen(true);
  };

  // ProfileDetail 닫기
  const closeProfileDetail = () => {
    setIsProfileDetailOpen(false);
  };

  // 메시지 전송
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
    <div className="relative flex flex-col h-[100vh] w-[375px] mx-auto">
      <Header user={currentUser} onProfileClick={toggleUser} />

      <div
        className={`flex-1 overflow-y-auto p-4 mt-[56px] ${
          isProfileDetailOpen ? "" : "mb-[50px]"
        }`}
        style={{ filter: isProfileDetailOpen ? "blur(2px)" : "none" }}
      >
        <ProfileInfo user={currentUser} onProfileDetail={handleProfileDetail} />
        <MessageList messages={messages} currentUser={currentUser} />
        <div ref={messagesEndRef} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      {isProfileDetailOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/80 z-50">
          <ProfileDetail user={currentUser} onClose={closeProfileDetail} />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
