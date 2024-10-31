import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const nav = useNavigate();

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 fixed bottom-0 ">
      <div className="flex justify-around items-center py-2">
        <button
          className={`flex flex-col items-center ${
            activeTab === "home" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => nav("/")}
        >
          <img className="w-6 h-6" />
          <span className="text-xs mt-1">홈</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "chat" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => nav("/chat-list")}
        >
          <img className="w-6 h-6" />
          <span className="text-xs mt-1">채팅</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeTab === "story" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("story")}
        >
          <img className="w-6 h-6" />
          <span className="text-xs mt-1">스토리</span>
        </button>
      </div>
      <div className="w-16 h-1 bg-black mx-auto mt-1 rounded"></div>
    </div>
  );
};

export default BottomNav;
