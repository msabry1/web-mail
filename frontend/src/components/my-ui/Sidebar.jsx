import { useState } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { useUI } from "../../context/UIContext";
import { useEmailsContext } from "../../context/EmailsContext";
const Sidebar = () => {
  const { toggleComposing } = useUI();
  const { currentFolder, setCurrentFolder } = useEmailsContext();
  const [showFolders, setShowFolders] = useState(false);

  // Function to handle menu item selection
  const handleMenuItemClick = async (key) => {
    // Replace this with your specific logic
    console.log("Selected menu item:", key);
    setCurrentFolder(key);

    // You can add more actions here, like:
    // - Filtering emails
    // - Updating state
    // - Calling a parent component method
  };

  const menuItems = [
    {
      icon: <img src="/inbox.png" alt="inbox" width={20} />,
      label: "Inbox",
      key: "inbox",
    },
    {
      icon: <FaRegStar />,
      label: "Starred",
      key: "starred",
    },
    {
      icon: <VscSend />,
      label: "Sent",
      key: "sent",
    },
    {
      icon: <img src="/draft.png" alt="inbox" width={20} />,
      label: "Drafts",
      key: "drafts",
    },
    {
      icon: <GoTrash />,
      label: "Trash",
      key: "trash",
    },
  ];

  // Additional menu items that can be toggled
  const folders = [
    {
      label: "Work",
      key: "Work",
    },
    {
      label: "College",
      key: "College",
    },
  ];

  return (
    <div className="w-[20%] flex pr-4 flex-col gap-5 sidebar text-gray-800">
      {/* Compose Button */}
      <div
        className="flex gap-3 ml-3 items-center w-fit bg-[#C2E7FF] p-4 rounded-xl cursor-pointer hover:shadow-lg"
        onClick={toggleComposing}
      >
        <GoPencil size={18} />
        <span className="font-semibold text-sm">Compose</span>
      </div>

      {/* Main Menu Items */}
      <div className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => handleMenuItemClick(item.key)}
            className={`flex items-center gap-5 pl-5 pr-2 py-2 cursor-pointer rounded-r-full ${
              currentFolder === item.key
                ? "bg-gray-300"
                : "hover:bg-gray-300"
            }`}
          >
            {item.icon}
            <span
              className={
                currentFolder === item.key ? "font-semibold" : ""
              }
            >
              {item.label}
            </span>
          </div>
        ))}

        {/* More Items Toggle */}
        <div
          className="flex items-center gap-5 pl-5 pr-2 py-2 hover:bg-gray-300 cursor-pointer rounded-r-full"
          onClick={() => setShowFolders(!showFolders)}
        >
          <IoIosArrowDown
            className={`transition-transform ${
              showFolders ? "rotate-180" : ""
            }`}
          />
          <span>My Folders</span>
        </div>

        {/* Additional Menu Items */}
        {showFolders &&
          folders.map((item) => (
            <div
              key={item.key}
              onClick={() => handleMenuItemClick(item.key)}
              className={`flex items-center gap-5 pl-5 pr-2 py-2 cursor-pointer rounded-r-full ${
                currentFolder === item.key
                  ? "bg-gray-300"
                  : "hover:bg-gray-300"
              }`}
            >
              {item.icon}
              <span
                className={
                  currentFolder === item.key ? "font-semibold" : ""
                }
              >
                {item.label}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
