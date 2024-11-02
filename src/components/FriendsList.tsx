import { User } from "../pages/ChatRoom";

const FriendsList = ({
  data,
  profileOnClick,
}: {
  data: User[];
  profileOnClick: (index: number) => void;
}) => {
  //data는 query에서 불러옴

  return (
    <div className="space-y-4  cursor-pointer">
      {/*최상위 JSX */}
      {data.slice(1).map((user, index) => {
        return (
          <div
            className="flex items-center"
            onClick={() => profileOnClick(index + 1)}
          >
            <img
              className="w-12 h-12 rounded-full bg-gray-200"
              src={`${user.profilePic}`}
              alt=""
            />
            <div className="ml-4 text-left">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-500">{user.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsList;
