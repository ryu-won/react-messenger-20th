import { User } from "../pages/ChatRoom";

const FriendsList = ({ data }: { data: User[] }) => {
  //data는 query에서 불러옴
  return (
    <div className="space-y-4">
      {/*최상위 JSX */}
      {data.slice(1).map((user) => {
        return (
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
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
