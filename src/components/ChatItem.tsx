import { useQuery } from "react-query";
import { Message } from "../pages/ChatRoom";

const ChatItem = ({ sender, text }: Message) => {
  const [isLoading, data] = useQuery("messageUser");

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-gray-200">
        <img src="" alt="" />
      </div>
      <div className="ml-4 text-left">
        <div className="font-semibold">{sender}</div>
        <div className="text-sm text-gray-500">{text}</div>
      </div>
    </div>
  );
};

export default ChatItem;
