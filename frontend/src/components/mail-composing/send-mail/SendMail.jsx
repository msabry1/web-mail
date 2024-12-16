import { IoMdClose } from "react-icons/io";
import EmailSuccessAnimation from "../EmailSuccessAnimation"; // Import the new component
import { useUI } from "../../../context/UIContext";
import { useEmailsContext } from "../../../context/EmailsContext";
import { useEmail } from "../../../hooks/useEmail";
import EmailEditor from "./EmailEditor";
import PropTypes from "prop-types";

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
      // const emailContent = editorInstanceRef.current.getMarkdown();

      //TODO: await MailService.sendMail({
      //   ...formData,
      //   message: emailContent
      // });

      // If this was a draft, delete it after sending
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
  }),
  onCancel: PropTypes.func,
};
