import { IoMdClose } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import EmailSuccessAnimation from "../EmailSuccessAnimation";
import { useUI } from "../../../context/UIContext";
import { useEmailsContext } from "../../../context/EmailsContext";
import { useEmail } from "../../../hooks/useEmail";
import EmailEditor from "./EmailEditor";
import PropTypes from "prop-types";

const PRIORITY_OPTIONS = [
  {
    value: "Minor",
    label: "Low Priority",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    value: "Medium",
    label: "Medium Priority",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    value: "Major",
    label: "High Priority",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
];

const SendMail = ({ draftToEdit = null, onCancel }) => {
  const {
    formData,
    loading,
    showSuccessAnimation,
    handleInputChange,
    resetForm,
    handleSaveDraft,
    handleSuccessClose,
    setLoading,
    setShowSuccessAnimation,
  } = useEmail(draftToEdit);

  const { setComposing } = useUI();
  const { deleteDraft } = useEmailsContext();

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Existing send mail logic
      if (formData.id) {
        deleteDraft(formData.id);
      }
      console.log("sending mail");
      setShowSuccessAnimation(true);
      resetForm();
      setComposing(false);
    } catch (err) {
      console.error("Error sending email:", err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        onCancel();
      }, 1000);
    }
  };

  return (
    <>
      <div className="absolute bottom-0 lg:right-16 right-0 rounded-t-lg lg:w-fit w-full bg-white p-5 shadow-lg">
        <div className="flex items-center bg-gray-200 p-2 rounded-lg mb-3 justify-between">
          <span>{draftToEdit ? "Edit Draft" : "New Message"}</span>
          <div className="flex items-center gap-2">
            <IoMdClose
              className="cursor-pointer"
              onClick={() => {
                handleSaveDraft({ ...formData });
                setComposing(false);
                onCancel();
              }}
            />
          </div>
        </div>
        <form className="flex flex-col gap-3" onSubmit={sendMail}>
          <div className="border-b flex items-center gap-3 pb-1">
            <span>To</span>
            <input
              type="email"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="outline-none w-full"
              required
            />
          </div>
          <div className="border-b flex items-center gap-3 pb-1">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="outline-none w-full"
              required
            />
          </div>

          {/* Improved Priority Selector */}
          <div className="border-b flex items-center gap-3 pb-1">
            <span>Priority</span>
            <div className="flex items-center space-x-2">
              {PRIORITY_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer
                    ${
                      formData.priority === option.value
                        ? `${option.bgColor} ${option.color} font-semibold`
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={formData.priority === option.value}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <FaCircle className={`w-3 h-3 ${option.color}`} />
                  {option.label.split(" ")[0]}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <EmailEditor
              initialContent={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#1A73E8] text-white px-4 py-1 rounded-full"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
      <EmailSuccessAnimation
        isVisible={showSuccessAnimation}
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default SendMail;

SendMail.propTypes = {
  draftToEdit: PropTypes.shape({
    id: PropTypes.number,
    to: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    priority: PropTypes.oneOf(["low", "medium", "high"]),
  }),
  onCancel: PropTypes.func,
};
