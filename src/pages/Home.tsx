import Header from "../components/Header";
import { useQuery } from "react-query";
import { fetchUsers } from "../api";
import { User } from "./ChatRoom";
import FriendsList from "../components/FriendsList";
import { useState } from "react";
import ProfileDetail from "./ProfileDetail";

const Home = () => {
  const { isLoading, data = [] } = useQuery<User[]>("users", fetchUsers);
  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false);
  const [profileUser, setProfileUser] = useState<User>(data[0]);

  const profileOnClick = (index: number) => {
    setIsProfileDetailOpen(true);
    setProfileUser(data[index]);
  };

  const closeProfileDetail = () => {
    setIsProfileDetailOpen(false);
  };
  return (
    <div
      className=" md:max-w-[375px] mx-auto 
    "
    >
      <Header></Header>

      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className="w-full bg-white mt-[56px] md:max-w-[375px] mx-auto	mb-[56px] overscroll-y-auto">
          {/* 사용자 프로필 */}
          <div
            className="flex items-center p-4 border-b cursor-pointer"
            onClick={() => profileOnClick(0)}
          >
            <img
              className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"
              src={`${data[0].profilePic}`}
              alt=""
            />
            <div className="ml-4">
              <p className="text-xl font-semibold">{data[0].name}</p>
            </div>
          </div>
          {/* 활동 상태 */}
          <div className="px-4 py-3 border-b">
            <p className="text-gray-500 mb-2 text-start text-sm">활동 상태</p>
            <div className="flex space-x-4">
              {data.slice(1).map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative w-12 h-12 rounded-full ">
                    <img src={`${item.profilePic}`} alt="" className="w-full" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
                  </div>
                  <p className="text-xs mt-1">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* 친구 목록 */}
          <div className="px-4 py-3">
            <p className="text-gray-500 mb-3  text-sm text-start">
              친구 {data.length}
            </p>
            <FriendsList data={data} profileOnClick={profileOnClick} />
          </div>
        </div>
      )}
      {/* 프로필 상세 보기 */}
      {isProfileDetailOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/80 z-50">
          <ProfileDetail user={profileUser} onClose={closeProfileDetail} />
        </div>
      )}
    </div>
  );
};

export default Home;
