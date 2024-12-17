import { PRIORITY_ICONS } from "../../../constants/priorities";

const MailsListHeader = ({ priorityOptions, activeFilter, onFilterChange }) => {
  return (
    <div className="md:flex hidden lg:gap-5 gap-2 items-center inbox-nav">
      {priorityOptions.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 hover:bg-gray-100 cursor-pointer px-5 py-3 ${
            activeFilter === index
              ? "text-indigo-500 border-b-2 border-indigo-500"
              : ""
          }`}
          onClick={() => onFilterChange(item, index)}
        >
          <img
            src={item === "drafts" ? "/draft.png" : PRIORITY_ICONS[item]}
            alt={item}
            width={20}
          />
          {item}
        </div>
      ))}
    </div>
  );
};
export default MailsListHeader;

import PropTypes from 'prop-types';

MailsListHeader.propTypes = {
  priorityOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilter: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

