import { MdLogout } from "react-icons/md";
import { useUI } from "../../context/UIContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user, logout } = useUser();
  const { toggleProfile } = useUI();
  const navigate = useNavigate();
  const handleLogout = () => {
    toggleProfile();
    logout();
    navigate("/login");
  }
  if (!user) {
    return (
      <div className="absolute right-5 p-5 flex flex-col items-center text-center gap-3 rounded-lg shadow-lg bg-white">
        <div className="animate-pulse">
          <div className="h-16 w-16 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 w-24 bg-gray-300 mb-2"></div>
          <div className="h-4 w-36 bg-gray-300"></div>
        </div>
      </div>
    );
  }

  // Render user profile
  return (
    <div className="absolute right-5 p-5 flex flex-col items-center text-center gap-3 rounded-lg shadow-lg bg-white">
      <div className="text-sm text-gray-500">{user.username}</div>

      <img
        src={user.image || "/default-avatar.png"}
        alt="profile"
        className="rounded-full w-16 h-16 object-cover object-center"
        onError={(e) => {
          e.target.src = "/default-avatar.png";
        }}
      />

      <h2 className="font-semibold">Hi, {user.name}!</h2>

      <div className="flex flex-col gap-2 w-full">
        <button
          className="flex items-center justify-center gap-2 border rounded-full py-2 px-4 outline-none hover:bg-gray-200 transition-colors"
          onClick={handleLogout}
        >
          <MdLogout />
          Logout
        </button>

        <button
          className="flex items-center justify-center gap-2 border rounded-full py-2 px-4 outline-none hover:bg-gray-200 transition-colors"
          onClick={toggleProfile}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Profile;
