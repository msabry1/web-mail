import { CheckSquare, Square, Star } from "lucide-react";
import { PriorityIcons } from "../../../context/EmailsContext";
// import { formatDate } from "../../../utils/dateFormatter";
import PropTypes from "prop-types";

const MailListItem = ({
  item,
  isSelected,
  onSelect,
  onClick,
  onStar,
  isDraft,
}) => {
  if (isDraft) {
    return (
      <div
        className={`flex gap-2 items-center justify-between border-b py-2 cursor-pointer hover:bg-gray-50 ${
          isSelected ? "bg-gray-100" : ""
        }`}
      >
        <div className="mr-4" onClick={onSelect}>
          {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
        </div>

        <div className="flex-grow flex items-center gap-2" onClick={onClick}>
          <img
            src={PriorityIcons[item.priority]}
            alt={`${item.priority} priority`}
            className="w-5 h-5"
          />
          <div className="flex-grow">
            <p className="font-semibold">{item.to || "No recipient"}</p>
            <p className="text-sm text-gray-600 truncate">
              {item.subject || "No subject"}
            </p>
            <p className="text-xs text-gray-500">
              Saved:{new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-2 items-center justify-between border-b py-2 cursor-pointer hover:bg-gray-50 ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      <div className="mr-4" onClick={onSelect}>
        {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
      </div>

      <div className="flex-grow flex items-center gap-2" onClick={onClick}>
        <img
          src={PriorityIcons[item.priority]}
          alt={`${item.priority} priority`}
          className="w-5 h-5"
        />
        <div className="flex-grow">
          <p
            className={`font-semibold ${
              !item.read ? "text-black" : "text-gray-500"
            }`}
          >
            {item.to}
          </p>
          <p className="text-sm text-gray-600 truncate">{item.subject}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onStar} className="hover:bg-gray-100 rounded-full p-1">
          <Star
            size={20}
            fill={item.starred ? "gold" : "none"}
            stroke={item.starred ? "gold" : "currentColor"}
            className="transition-colors duration-200"
          />
        </button>

        <div className="text-sm text-gray-500 mr-2">
          {new Date(item?.createdAt?.seconds * 1000)
                .toUTCString()
                .slice(5, 11)}
        </div>
      </div>
    </div>
  );
};

export default MailListItem;

MailListItem.propTypes = {
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onStar: PropTypes.func.isRequired,
  isDraft: PropTypes.bool,
};
