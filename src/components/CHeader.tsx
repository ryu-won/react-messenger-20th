import backIcon from "../assets/Back.svg";
import call from "../assets/call.svg";
import video from "../assets/video.svg";
import search from "../assets/search.svg";
import { Navigate, useNavigate } from "react-router-dom";

interface User {
  name: string;
  profilePic: string;
}

interface HeaderProps {
  user: User;
  onProfileClick: () => void;
  isProfileDetailOpen: boolean;
}

const ChatRoomHeader: React.FC<HeaderProps> = ({
  user,
  onProfileClick,
  isProfileDetailOpen,
}) => {
  const nav = useNavigate();

  return (
    <div
      className="flex items-center justify-between py-[11px] px-[16px] bg-white border-b-[1px] fixed top-0 w-full md:max-w-[375px] h-[56px]"
      style={{ filter: isProfileDetailOpen ? "blur(4px)" : "none" }}
    >
      <div className="flex items-center">
        <button className="mr-[8px]" onClick={() => nav(-1)}>
          <img src={backIcon} alt="Back Icon" className="w-[28px] h-[28px]" />
        </button>

        {/* 프로필 이미지 */}
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-[34px] h-[34px] rounded-full cursor-pointer"
          onClick={onProfileClick}
        />

        {/* 사용자 이름 */}
        <div className="ml-[16px]">
          <h3
            className="text-[#0C0C0C] font-pretendard text-[18px] font-bold leading-[26px] cursor-pointer"
            onClick={onProfileClick}
          >
            {user.name}
          </h3>
        </div>
      </div>

      {/* 오른쪽 아이콘 */}
      <div className="flex space-x-[12px]">
        <button>
          <img src={search} alt="search Icon" className="w-[28px] h-[28px]" />
        </button>
        <button>
          <img src={call} alt="call Icon" className="w-[28px] h-[28px]" />
        </button>
        <button>
          <img src={video} alt="video Icon" className="w-[28px] h-[28px]" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoomHeader;
