import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SendMail from "./SendMail";
import Profile from "./Profile";

const Body = () => {
  // Placeholder for frontend logic
  const open = false; // Replace with your own logic to decide if SendMail modal should be visible
  const profile = true; // Replace with your own logic to decide if Profile should be visible

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
      {profile && <Profile />}
      {open && <SendMail />}
    </div>
  );
};

export default Body;
