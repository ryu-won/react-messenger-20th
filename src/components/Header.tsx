import backIcon from "../assets/Back.svg";
import call from "../assets/call.svg";
import video from "../assets/video.svg";
import search from "../assets/search.svg";

const Header = () => {
  return (
    <div className=" md:max-w-[375px] flex items-center justify-between py-[11px] px-[16px] bg-white border-b-[1px] fixed top-0 w-full md:max-w-[375px] h-[56px]">
      <div className="flex items-center">
        <span>친구</span>
      </div>

      {/* 오른쪽 아이콘 */}
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
