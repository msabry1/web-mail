import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SendMail from "../mail-composing/send-mail/SendMail";
import Profile from "./Profile";
import { useUI } from "../../context/UIContext";

const Body = () => {
  const { composing, profile } = useUI();
  return (
      <div className="flex h-screen ">
        <Sidebar />
        <div className="flex-grow overflow-hidden">
          <Outlet />
        </div>
        {composing && <SendMail />}
        {profile && <Profile />}
      </div>
  );
};

export default Body;
