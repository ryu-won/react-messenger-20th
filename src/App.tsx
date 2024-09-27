import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import ProfileDetail from "./components/ProfileDetail";
import { useState } from "react";

function App() {
  // 상태로 관리할 유저 정보
  const [user, setUser] = useState({
    name: "채린공주",
    profilePic: "/path/to/profile-pic.jpg",
  });

  // ProfileDetail에서 닫기 기능을 위한 핸들러
  const handleCloseProfileDetail = () => {
    console.log("Profile detail closed");
    // 추가적인 동작이 필요할 경우 이곳에 작성
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatRoom />} />

        {/* 프로필 상세 보기 */}
        <Route
          path="/profile-detail"
          element={
            <ProfileDetail user={user} onClose={handleCloseProfileDetail} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
