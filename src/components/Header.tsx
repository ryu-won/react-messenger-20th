import React from "react";
import backIcon from "../assets/Back.svg";
import call from "../assets/call.svg";
import video from "../assets/video.svg";
import search from "../assets/search.svg";

// 유저 타입 정의
interface User {
  name: string;
  profilePic: string;
}

// Header 컴포넌트의 props 타입 정의
interface HeaderProps {
  user: User;
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onProfileClick }) => {
  return (
    <div className="flex items-center justify-between py-[11px] px-[16px] bg-white shadow-md fixed top-0 w-[375px] h-[56px]">
      <div className="flex items-center">
        {/* 뒤로가기 버튼 */}
        <button className="mr-[8px]">
          <img src={backIcon} alt="Back Icon" className="w-[28px] h-[28px]" />
        </button>

        {/* 프로필 이미지 */}
        <img
          src={user.profilePic} // 유저의 프로필 이미지 사용
          alt="Profile"
          className="w-[34px] h-[34px] rounded-full cursor-pointer"
          onClick={onProfileClick} // 프로필 클릭 시 사용자 전환
        />

        {/* 사용자 이름 */}
        <div className="ml-[16px]">
          <h3
            className="text-[#0C0C0C] font-pretendard text-[18px] font-bold leading-[26px] cursor-pointer"
            onClick={onProfileClick} // 프로필 클릭 시 사용자 전환
          >
            {user.name}
          </h3>
        </div>
      </div>

      {/* 오른쪽에 아이콘들 */}
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

export default Header;
