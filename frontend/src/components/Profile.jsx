import { useState, useEffect } from "react";
import { MdLogout } from "react-icons/md";

const Profile = () => {
  const [user, setUser] = useState(null);

  // Fetch user from localStorage or set default if not available
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem("user"); // Remove the user from localStorage
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading if no user info is available
  }

  return (
    <div className="absolute right-5 p-5 flex flex-col items-center text-center gap-3 rounded-lg shadow-lg bg-white">
      <div>{user.email}</div>

      <img
        src={user.image}
        alt="profile"
        className="rounded-full w-16 h-16 object-cover object-center"
      />
      <h2>Hi, {user.name}!</h2>

      <button
        className="flex items-center gap-2 border rounded-full py-2 px-4 outline-none hover:bg-gray-200"
        onClick={handleLogout}
      >
        <MdLogout />
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
