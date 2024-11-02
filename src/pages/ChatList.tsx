import { useQuery } from "react-query";
import ChatItem from "../components/ChatItem";
import Header from "../components/Header";
import { fetchMessages } from "../api";
import { Message } from "./ChatRoom";

const ChatList = () => {
  const { isLoading, data = [] } = useQuery<Message[]>(
    "messages",
    fetchMessages
  );

  const chatItemData = data.reduceRight((p: Message[], n: Message) => {
    if (!p.find((item) => item.sender === n.sender) && n.sender !== "김류원") {
      return [...p, n];
    }
    return p;
  }, []);

  // console.log(data);
  return (
    <div className=" mt-[56px]  md:max-w-[375px] mx-auto">
      <Header />
      {chatItemData && chatItemData.map((item) => <ChatItem {...item} />)}
    </div>
  );
};

export default ChatList;
