interface User {
  name: string;
  profilePic: string;
}

interface ProfileInfoProps {
  user: User;
  onProfileDetail: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onProfileDetail }) => {
  if (!user) {
    return <p>사용자 정보가 없습니다.</p>;
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center">
        {/* 프로필 이미지 */}
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-[96px] h-[100px] rounded-full"
        />

        {/* 사용자 이름 */}
        <h3 className="font-bold mt-[10px]" style={{ fontSize: "22px" }}>
          {user.name}
        </h3>

        {/* 추가 정보 */}
        <p className="text-sm mt-[10px]" style={{ color: "#8D8D8D" }}>
          Facebook 친구입니다
        </p>
        <p className="text-sm mt-[4px]" style={{ color: "#8D8D8D" }}>
          서울특별시 마포 거주
        </p>

        {/* 프로필 보기 버튼 */}
        <button
          className="mt-[10px] px-[20px] py-[6px] rounded-full text-gray-600"
          style={{
            color: "#737373",
            backgroundColor: "#F0F2F3",
            fontSize: "14px",
          }}
          onClick={onProfileDetail}
        >
          프로필 보기
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
