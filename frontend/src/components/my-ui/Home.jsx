import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { UIProvider } from "../../context/UIContext";
import { EmailsProvider } from "../../context/EmailsContext";
const Home = () => {
  return (
    <EmailsProvider>
      <UIProvider>
        <Navbar />
        <Outlet />
      </UIProvider>
    </EmailsProvider>
  );
};

export default Home;
