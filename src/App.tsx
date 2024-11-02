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
  const chatRoomMatch = useMatch("/chat-room/:sender");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat-room/:sender" element={<ChatRoom />} />
        <Route path="/chat-list" element={<ChatList />} />
      </Routes>
      <div className=" md:max-w-[375px] mx-auto">
        {" "}
        {chatRoomMatch ? null : <BottomNav></BottomNav>}
      </div>

      <ReactQueryDevtools />
    </>
  );
}

export default App;
