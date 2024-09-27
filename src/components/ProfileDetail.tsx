import cancel from "../assets/cancel.svg";
import settings from "../assets/setting.svg";
import facebook from "../assets/profile_facebook.svg";
import instagram from "../assets/profile_insta.svg";
import plus from "../assets/profile_plus.svg";
import edit from "../assets/edit.svg";

interface User {
  name: string;
  profilePic: string;
  facebook: string;
  instagram: string;
}

interface ProfileDetailProps {
  user: User;
  onClose: () => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ user, onClose }) => {
  return (
    <div className="h-[100vh] bg-white bg-opacity-5 flex flex-col items-center justify-center w-[375px] mx-auto">
      <div className="fixed top-0 flex items-center justify-between w-[375px] px-[16px] py-[14px]">
        <button onClick={onClose}>
          <img src={cancel} alt="Cancel" />
        </button>
        <button>
          <img src={settings} alt="Settings" />
        </button>
      </div>

      {/* 프로필 이미지 */}
      <div className="relative">
        <button>
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-[100px] h-[100px] rounded-full"
          />

          <img
            src={edit}
            alt="edit"
            className="absolute top-20 left-full transform translate-x-[-100%] "
          />
        </button>
      </div>

      {/* 사용자 이름 */}
      <h3 className="text-xl font-bold mt-[26px]">{user.name}</h3>

      {/* 소셜 아이콘 */}
      <div className="flex mt-[18px] space-x-4">
        <button className=" bg-white rounded-full flex items-center justify-center ">
          <a href={user.facebook}>
            <img src={facebook} alt="facebook" className="w-[60px] h-[60px]" />
          </a>
        </button>

        <button className=" bg-white rounded-full flex items-center justify-center ">
          <a href={user.instagram}>
            <img
              src={instagram}
              alt="instagram"
              className="w-[60px] h-[60px]"
            />
          </a>
        </button>
        <button className=" bg-white rounded-full flex items-center justify-center ">
          <a href="#">
            <img src={plus} alt="plus" className="w-[60px] h-[60px]" />
          </a>
        </button>
      </div>
    </div>
  );
};

export default ProfileDetail;
