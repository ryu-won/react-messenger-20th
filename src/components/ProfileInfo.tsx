import React from "react";

interface User {
  name: string;
  profilePic: string;
}

interface ProfileInfoProps {
  user: User | undefined;
  onProfileDetail: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onProfileDetail }) => {
  if (!user) {
    return <p>사용자 정보가 없습니다.</p>;
  }

  return (
    <div className="p-4 bg-white">
      <div className="flex flex-col items-center">
        {/* 프로필 이미지 */}
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-[100px] h-[100px] rounded-full"
        />

        {/* 사용자 이름 */}
        <h3 className="text-xl font-bold mt-2">{user.name}</h3>

        {/* 추가 정보 */}
        <p className="text-gray-500">Facebook 친구입니다</p>
        <p className="text-gray-500">서울특별시 마포 거주</p>

        {/* 프로필 보기 버튼 */}
        <button
          className="mt-4 px-4 py-2 rounded-full border text-gray-600"
          onClick={onProfileDetail}
        >
          프로필 보기
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
