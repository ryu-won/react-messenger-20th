import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cancel from "../assets/cancel.svg";
import setting from "../assets/setting.svg";

interface User {
  name: string;
  profilePic: string;
}

interface LocationState {
  user: User;
}

const ProfileDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = (location.state as LocationState)?.user;

  if (!user) {
    return <div>유저 정보가 없습니다.</div>;
  }

  return (
    <div className="h-[100vh] bg-blue-100 flex flex-col items-center justify-center w-[375px] mx-auto ">
      {/* 상단 바 */}
      <div className="fixed top-0 flex items-center justify-between w-[375px] px-4">
        <button onClick={() => navigate(-1)}>
          <img src={cancel} alt="cancel" />
        </button>
        <button>
          <img src={setting} alt="setting" />
        </button>
      </div>

      {/* 프로필 이미지 */}
      <img
        src={user.profilePic}
        alt="Profile"
        className="w-[100px] h-[100px] rounded-full mt-8"
      />

      {/* 사용자 이름 */}
      <h3 className="text-xl font-bold mt-4">{user.name}</h3>

      {/* 소셜 아이콘 */}
      <div className="flex mt-8 space-x-4">
        <button className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow">
          <i className="fab fa-facebook text-xl text-blue-500"></i>
        </button>
        <button className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow">
          <i className="fab fa-instagram text-xl text-pink-500"></i>
        </button>
        <button className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow">
          <i className="fas fa-plus text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default ProfileDetail;
