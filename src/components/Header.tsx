import personPlus from "../assets/person_plus.svg";
import setting from "../assets/setting.svg";
import video from "../assets/video.svg";
import search from "../assets/search.svg";
import { useMatch } from "react-router-dom";

const Header = () => {
  const match = useMatch("/");

  return (
    <div className=" md:max-w-[375px] flex items-center justify-between py-[11px] px-[16px] bg-white border-b-[1px] fixed top-0 w-full md:max-w-[375px] h-[56px] mx-auto">
      <div className="flex items-center text-[24px] font-[700]">
        <span>{match ? "친구" : "채팅"}</span>
      </div>

      {/* 오른쪽 아이콘 */}
      <div className="flex space-x-[12px]">
        <button>
          <img src={search} alt="search Icon" className="w-[28px] h-[28px]" />
        </button>
        {match ? (
          <button>
            <img
              src={personPlus}
              alt="call Icon"
              className="w-[28px] h-[28px]"
            />
          </button>
        ) : null}
        <button>
          <img src={setting} alt="video Icon" className="w-[28px] h-[28px]" />
        </button>
      </div>
    </div>
  );
};

export default Header;
