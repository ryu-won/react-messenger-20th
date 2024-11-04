import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import plus from "../assets/plus.svg";
import smile from "../assets/smile.svg";
import thumb_up from "../assets/thumb_up.svg";
import sendIcon from "../assets/send.svg";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProfileDetailOpen: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isProfileDetailOpen,
}) => {
  const [message, setMessage] = useState<string>("");
  const [isInputClicked, setIsInputClicked] = useState<boolean>(false);

  const handleSend = (): void => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
      setIsInputClicked(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleThumbsUp = (): void => {
    onSendMessage("👍");
  };

  return (
    <div
      className="flex items-center px-[8px] py-[16px] bg-white fixed bottom-0 w-full md:max-w-[375px] border-t h-[50px]"
      style={{ filter: isProfileDetailOpen ? "blur(4px)" : "none" }}
    >
      <button className="mr-[16px]">
        <img src={plus} alt="plus Icon" className="w-[28px] h-[28px]" />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setMessage(e.target.value);
          setIsInputClicked(true);
        }}
        onKeyUp={handleKeyUp}
        onFocus={() => setIsInputClicked(true)}
        className="flex-1 w-[255px] h-[34px] px-[16px] py-[7px] border focus:outline-none"
        style={{ borderRadius: "60px", backgroundColor: "#F0F2F3" }}
        placeholder="Aa"
      />
      <img
        src={smile}
        alt="smile Icon"
        className="absolute right-16 top-1/2 transform -translate-y-1/2 cursor-pointer"
        style={{ width: "24px", height: "24px" }}
      />
      <button
        className="ml-[16px]"
        onClick={isInputClicked ? handleSend : handleThumbsUp}
      >
        <img
          src={isInputClicked ? sendIcon : thumb_up}
          alt={isInputClicked ? "send Icon" : "thumb_up Icon"}
          className="w-[28px] h-[28px]"
        />
      </button>
    </div>
  );
};

export default MessageInput;
