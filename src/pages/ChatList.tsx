import { useQuery } from "react-query";
import ChatItem from "../components/ChatItem";
import Header from "../components/Header";
import { fetchMessages, fetchUsers } from "../api";
import { Message, User } from "./ChatRoom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatList = () => {
  const { isLoading, data = [] } = useQuery<Message[]>(
    "messages",
    fetchMessages
  );

  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    let parsedMessages: Message[] = [];

    // 전체 `localStorage`에서 마지막 메세지 불러오기
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        // 각 키의 메시지 데이터를 JSON.parse로 배열로 변환
        const storedMessages = JSON.parse(localStorage.getItem(key) || "[]");

        // 배열인지 확인 후에 `reduce` 메서드 사용
        if (Array.isArray(storedMessages)) {
          const latestMessage = storedMessages.reduce(
            (latest: Message | null, item: Message) => {
              return !latest || new Date(item.time) > new Date(latest.time)
                ? item
                : latest;
            },
            null
          );

          if (latestMessage) {
            parsedMessages = [...parsedMessages, latestMessage];
          }
        }
      }
    }

    const JsonMessages = data.reduceRight((p: Message[], n: Message) => {
      if (!p.find((item) => item.chatRoomId === n.chatRoomId)) {
        return [...p, n];
      }
      return p;
    }, []);

    const filteredMessages = parsedMessages
      .concat(JsonMessages)
      .reduce((p: Message[], n: Message) => {
        if (
          !p.find((item) => item.chatRoomId === n.chatRoomId) &&
          !p.find((item) => item === n)
        ) {
          return [...p, n];
        }
        return p;
      }, []);
    filteredMessages.sort(
      (a, b): number => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    setMessageList(filteredMessages);
  }, [data]);

  // console.log(data);
  return (
    <div className=" mt-[56px]  md:max-w-[375px] mx-auto">
      <Header />
      {messageList && messageList.map((item) => <ChatItem {...item} />)}
    </div>
  );
};

export default ChatList;
