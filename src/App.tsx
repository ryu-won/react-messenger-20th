import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import ProfileDetail from "./components/ProfileDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 채팅방 */}
        <Route path="/" element={<ChatRoom />} />

        {/* 프로필 상세 보기 */}
        <Route path="/profile-detail" element={<ProfileDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
