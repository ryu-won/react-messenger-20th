import Header from "../components/Header";

import { useQuery } from "react-query";
import { fetchUsers } from "../api";
import { User } from "./ChatRoom";
import FriendsList from "../components/FriendsList";

const Home = () => {
  const { isLoading, data = [] } = useQuery<User[]>("users", fetchUsers);

  return (
    <div
      className="text-center
    "
    >
      <Header></Header>

      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className="w-full mx-auto bg-white mt-[56px] md:max-w-[375px]">
          {/* 사용자 프로필 */}
          <div className="flex items-center p-4 border-b">
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
            <p className="text-gray-500 mb-2">활동 상태</p>
            <div className="flex space-x-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative w-12 h-12 rounded-full bg-gray-200">
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
                  </div>
                  <p className="text-xs mt-1">세오스</p>
                </div>
              ))}
            </div>
          </div>
          {/* 친구 목록 */}
          <div className="px-4 py-3">
            <p className="text-gray-500 mb-3">친구 {data.length}</p>
            <FriendsList data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;