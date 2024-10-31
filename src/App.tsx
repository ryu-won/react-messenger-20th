import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import ProfileDetail from "./pages/ProfileDetail";
import { useState } from "react";
import BottomNav from "./components/BottomNav";
import { ReactQueryDevtools } from "react-query/devtools";

import Home from "./pages/Home";
import ChatList from "./pages/ChatList";

function App() {
  const chatRoomMatch = useMatch("/userID");

  // 상태로 관리할 유저 정보
  const [user, setUser] = useState({
    name: "김류원",
    profilePic: "/path/to/profile-pic.jpg",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.facebook.com/",
  });

  // ProfileDetail에서 닫기 기능을 위한 핸들러
  const handleCloseProfileDetail = () => {
    console.log("Profile detail closed");
    // 추가적인 동작이 필요할 경우 이곳에 작성
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userID" element={<ChatRoom />} />
        <Route path="/chat-list" element={<ChatList />} />

        {/* 프로필 상세 보기 */}
        <Route
          path="/profile-detail"
          element={
            <ProfileDetail user={user} onClose={handleCloseProfileDetail} />
          }
        />
      </Routes>

      {chatRoomMatch ? null : <BottomNav></BottomNav>}
      <ReactQueryDevtools />
    </>
  );
}

export default App;
