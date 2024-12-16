import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoTrash, GoArchive } from "react-icons/go";
import { useEmailsContext } from "../../context/EmailsContext";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

const MailDetails = () => {
  const { emails, setEmails } = useEmailsContext();
  const navigate = useNavigate();
  const id = useParams().id;
  const email = emails.filter((email) => email.id == id)[0];
  const viewerDiv = useRef(null);
  const viewerInstanceRef = useRef(null);

  useEffect(() => {
    //TODO: Mark email as read to the backend
    if (email && !email.read) {
      email.read = true;
      setEmails((prevEmails) =>
        prevEmails.map((e) => (e.id === email.id ? email : e))
      );
    }
  }, [email, emails, setEmails]);

  const content = email?.message || "";

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
      //   onDelete(email.id);
      navigate("/"); // Navigate back to the inbox
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg w-full lg:mr-5">
      <div className="flex items-center">
        <div className="rounded-full hover:bg-gray-200 w-fit p-2">
          <IoMdArrowBack
            size={20}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="rounded-full hover:bg-gray-200 w-fit p-2">
          <GoArchive size={16} className="cursor-pointer" />
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
        <div>
          <div ref={viewerDiv}></div>
        </div>
      </div>
    </div>
  );
};

export default MailDetails;
