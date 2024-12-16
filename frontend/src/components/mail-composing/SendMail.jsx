import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import EmailSuccessAnimation from "./EmailSuccessAnimation"; // Import the new component
import { useUI } from "../../context/UIContext";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/editor";

const SendMail = () => {
  const { toggleComposing } = useUI();
  const initialData = {
    to: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const editorDiv = useRef(null);
  const editorInstanceRef = useRef(null);

  useEffect(() => {
    if (editorDiv.current && !editorInstanceRef.current) {
      editorInstanceRef.current = new Editor({
        el: editorDiv.current,
        height: "59vh",
        initialEditType: "wysiwyg",
        previewStyle: "tab",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //TODO: await MailService.sendMail(formData);
      // const emailContent = editorInstanceRef.current.getMarkdown();
      // console.log("Email content:", emailContent);
      setFormData(initialData);
      setShowSuccessAnimation(true);
    } catch (err) {
      console.error("Error sending email:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessAnimationClose = () => {
    setShowSuccessAnimation(false);
    setTimeout(() => {
      toggleComposing();
    }, 500);
  };

  return (
    <>
      <div className="absolute bottom-0 lg:right-16 right-0 rounded-t-lg lg:w-fit w-full bg-white p-5 shadow-lg">
        <div className="flex items-center bg-gray-200 p-2 rounded-lg mb-3 justify-between">
          <span>New Message</span>
          <IoMdClose className="cursor-pointer" onClick={toggleComposing} />
        </div>
        <form className="flex flex-col gap-3" onSubmit={sendMail}>
          <div className="border-b flex items-center gap-3 pb-1">
            <span>To</span>
            <input
              type="email"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="outline-none"
              required
            />
          </div>
          <div className="border-b flex items-center gap-3 pb-1">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="outline-none"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <div ref={editorDiv}></div>
          </div>

          <div>
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
        onClose={handleSuccessAnimationClose}
      />
    </>
  );
};

export default SendMail;
