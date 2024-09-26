import React, { useState } from "react";
import plus from "../assets/plus.svg";
import smile from "../assets/smile.svg";
import thumb_up from "../assets/thumb_up.svg";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = (): void => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center px-[8px] py-[16px] bg-white fixed bottom-0 w-[375px] border-t h-[50px]">
      <button className="mr-[16px]">
        <img src={plus} alt="plus Icon" className="w-[28px] h-[28px]" />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        onKeyUp={handleKeyUp}
        className="flex-1 w-[255px] h-[34px] px-[7px] py-[16px] border focus:outline-none"
        style={{ borderRadius: "60px", backgroundColor: "#F0F2F3" }}
        placeholder="Aa"
      ></input>
      <img
        src={smile}
        alt="smile Icon"
        className="absolute right-16 top-1/2 transform -translate-y-1/2 cursor-pointer"
        style={{ width: "24px", height: "24px" }}
      />
      <button className="ml-[16px]" onClick={handleSend}>
        <img src={thumb_up} alt="thumb_up Icon" className="w-[28px] h-[28px]" />
      </button>
    </div>
  );
};

export default MessageInput;
