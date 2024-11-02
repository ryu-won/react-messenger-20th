import { useState } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import chat from "../assets/chat.svg";
import story from "../assets/Story.svg";
import home from "../assets/home.svg";

const BottomNav = () => {
  const location = useLocation();
  const nav = useNavigate();

  const isHomeActive = location.pathname === "/";
  const isChatActive = location.pathname === "/chat-list";
  const isStoryActive = location.pathname === "/story";

  const activeFilter =
    "invert(29%) sepia(92%) saturate(1429%) hue-rotate(188deg) brightness(95%) contrast(93%)";

  return (
    <div className="md:max-w-[375px] mx-auto fixed bottom-0 w-full bg-white border-t border-gray-200 fixed bottom-0 ">
      <div className="flex justify-around items-center py-2">
        <button
          className={`flex flex-col items-center ${
            location.pathname === "/" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => nav("/")}
        >
          <img
            src={home}
            style={{ filter: isHomeActive ? activeFilter : "none" }}
            className="w-6 h-6"
            alt=""
          />
          <span className="text-xs mt-1">홈</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            location.pathname === "/chat-list"
              ? "text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => nav("/chat-list")}
        >
          <img
            src={chat}
            style={{ filter: isChatActive ? activeFilter : "none" }}
            className="w-6 h-6"
            alt=""
          />
          <span className="text-xs mt-1">채팅</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            location.pathname === "/story" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <img
            className="w-6 h-6"
            style={{ filter: isStoryActive ? activeFilter : "none" }}
            alt=""
            src={story}
          />
          <span className="text-xs mt-1">스토리</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
