import { useQuery } from "react-query";
import { Message, User } from "../pages/ChatRoom";
import { fetchUsers } from "../api";
import { useNavigate } from "react-router-dom";

const ChatItem = ({ sender, text }: Message) => {
  const { isLoading, data = [] } = useQuery("messageUser", fetchUsers);
  const nav = useNavigate();

  const findProfilePic = (): User =>
    data.find((userInfo: User) => userInfo.name === sender);
  //filter와 map의 차이  map은 전체 배열을 수정해서 새롭게 만들고
  //filter는 그중에서 찾음
  const getProfilePic = findProfilePic()?.profilePic;

  const onClick = () => {
    nav(`/chat-room/${sender}`);
  };

  return (
    <div className="flex items-center cursor-pointer  p-3 " onClick={onClick}>
      <div>
        {!isLoading && (
          <img className="w-12 h-12 rounded-full " src={getProfilePic} alt="" />
        )}
      </div>
      <div className="ml-4 text-left cursor-pointer  justify-self-center ">
        <div className="font-semibold">{sender}</div>
        <div className="text-sm text-gray-500">{text}</div>
      </div>
    </div>
  );
};

export default ChatItem;
