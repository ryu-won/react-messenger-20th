import ceosProfilePic from "../assets/Profile image.svg";
import userProfilePic from "../assets/Profile image.svg";
import styled, { keyframes } from "styled-components";

interface Message {
  id: string | number;
  sender: string;
  text: string;
  time: string | number | Date;
}

interface User {
  name: string;
}

interface MessageListProps {
  messages: Message[];
  currentUser: User;
}

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const formatTime = (time: string | number | Date): string => {
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProfilePic = (sender: string): string => {
    return sender === "CEOS" ? ceosProfilePic : userProfilePic;
  };

  return (
    <div className="px-4 ">
      {messages.length === 0
        ? null
        : messages.map((message) => (
            <MessageContainer
              key={message.id}
              isCurrentUser={message.sender === currentUser.name}
            >
              {message.sender !== currentUser.name && (
                <img
                  src={getProfilePic(message.sender)}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <MessageContent>
                {message.sender === currentUser.name ? (
                  <>
                    <TimeText isCurrentUser={true}>
                      {formatTime(message.time)}
                    </TimeText>
                    <MessageText isCurrentUser={true}>
                      {message.text}
                    </MessageText>
                  </>
                ) : (
                  <>
                    <MessageText isCurrentUser={false}>
                      {message.text}
                    </MessageText>
                    <TimeText isCurrentUser={false}>
                      {formatTime(message.time)}
                    </TimeText>
                  </>
                )}
              </MessageContent>
            </MessageContainer>
          ))}
    </div>
  );
};

const MessageContainer = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.isCurrentUser ? "flex-end" : "flex-start"};
  margin-bottom: 16px;
  animation: ${fadeIn} 0.3s ease-in-out; // 애니메이션 추가
`;

const MessageContent = styled.div`
  display: flex;
  align-items: center;
`;

const MessageText = styled.div<{ isCurrentUser: boolean }>`
  background-color: ${(props) => (props.isCurrentUser ? "#0A7CFF" : "#F0F2F3")};
  color: ${(props) => (props.isCurrentUser ? "white" : "#333")};
  padding: 8px 16px;
  border-radius: 20px;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 4px;
  display: inline-block;
`;

const TimeText = styled.span<{ isCurrentUser: boolean }>`
  font-size: 12px;
  color: #999;
  margin-left: ${(props) => (props.isCurrentUser ? "0" : "4px")};
  margin-right: ${(props) => (props.isCurrentUser ? "4px" : "0")};
  align-self: flex-end;
`;

export default MessageList;
