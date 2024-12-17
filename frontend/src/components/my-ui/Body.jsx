import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SendMail from "../mail-composing/send-mail/SendMail";
import Profile from "./Profile";
import { useUI } from "../../context/UIContext";

const Body = () => {
  const { composing, profile, setComposing } = useUI();
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {composing && <SendMail onCancel={setComposing(false)} />}
      {profile && <Profile />}
    </div>
  );
};

export default Body;
