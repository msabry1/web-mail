import { IoMdArrowBack, IoMdDownload } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import {
  FaRegFileImage,
  FaRegFilePdf,
  FaRegFileWord,
  FaRegFileExcel,
  FaRegFileAlt,
} from "react-icons/fa";
import { useEmailsContext } from "../../context/EmailsContext";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import PropTypes from "prop-types";
import MailService from "../../services/MailService";

const FileIcon = ({ fileName }) => {
  const extension = fileName.split(".").pop().toLowerCase();
  const iconProps = { size: 40, className: "text-gray-500" };

  const fileTypeIcons = {
    jpg: <FaRegFileImage {...iconProps} />,
    jpeg: <FaRegFileImage {...iconProps} />,
    png: <FaRegFileImage {...iconProps} />,
    gif: <FaRegFileImage {...iconProps} />,
    pdf: <FaRegFilePdf {...iconProps} color="red" />,
    doc: <FaRegFileWord {...iconProps} color="blue" />,
    docx: <FaRegFileWord {...iconProps} color="blue" />,
    xls: <FaRegFileExcel {...iconProps} color="green" />,
    xlsx: <FaRegFileExcel {...iconProps} color="green" />,
  };

  return fileTypeIcons[extension] || <FaRegFileAlt {...iconProps} />;
};

FileIcon.propTypes = {
  fileName: PropTypes.string.isRequired,
};

const MailDetails = () => {
  const { emails, setEmails } = useEmailsContext();
  const navigate = useNavigate();
  const id = useParams().id;
  const [email, setEmail] = useState(
    emails.filter((email) => email.id == id)[0]
  );
  const viewerDiv = useRef(null);
  const viewerInstanceRef = useRef(null);
  const [content, setContent] = useState(email?.body || "");
  useEffect(() => {
    if (email && !email.isRead) {
      // Use immutable updates to avoid unexpected re-renders
      setEmails((prevEmails) =>
        prevEmails.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
      );
    }
  }, [setEmails, email]);

  useEffect(() => {
    console.log("id changed", email);
    const fetchEmail = async () => {
      const data = await MailService.fetchEmail(id);
      setContent(data.body);
      setEmail((prevEmail) => ({
        ...prevEmail,
        attachments: data.attachments,
      }));
    };

    fetchEmail();
  }, [id]);

  useEffect(() => {
    if (viewerDiv.current && !viewerInstanceRef.current && content) {
      viewerInstanceRef.current = new Viewer({
        el: viewerDiv.current,
        initialValue: content,
      });
    }
  }, [content]);

  const handleDelete = () => {
    try {
      navigate("/"); // Navigate back to the inbox
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = (attachment) => {
    window.open(attachment.url, "_blank");
  };

  const renderAttachments = () => {
    if (!email?.attachments || email.attachments.length === 0) return null;
    return (
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-4">Attachments</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {email.attachments.map((attachment, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 flex flex-col items-center transition-all hover:shadow-md group"
            >
              <FileIcon fileName={attachment.name} />
              <div className="mt-2 text-center">
                <p className="text-sm font-medium truncate max-w-[150px]">
                  {attachment.name}
                </p>
                <p className="text-xs text-gray-500">
                  {attachment.size
                    ? `${(attachment.size / 1024).toFixed(1)} KB`
                    : "Unknown size"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(attachment);
                }}
                className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IoMdDownload
                  size={20}
                  className="text-gray-600 hover:text-blue-600"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-2 rounded-lg w-full lg:mr-5 pb-9">
      <div className="flex items-center">
        <div className="rounded-full hover:bg-gray-200 w-fit p-2">
          <IoMdArrowBack
            size={20}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="rounded-full hover:bg-gray-200 w-fit p-2">
          <GoTrash
            size={16}
            className="cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
      <div className="ml-2 mt-5">
        <h2 className="text-xl">{email?.subject}</h2>
        <div className="mt-2 mb-5 flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile_pic"
            className="w-10 h-10 "
          />
          <div>
            <h2 className="font-semibold">{email?.to}</h2>
            <p className="text-sm">to me</p>
          </div>
        </div>
        {renderAttachments()}
        <div>
          <div ref={viewerDiv}></div>
        </div>
      </div>
    </div>
  );
};

export default MailDetails;
