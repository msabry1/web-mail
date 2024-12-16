import { useEffect, useRef } from "react";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import PropTypes from "prop-types";

const EmailEditor = ({ initialContent = "", onChange }) => {
  const editorDiv = useRef(null);
  const editorInstanceRef = useRef(null);

  useEffect(() => {
    if (editorDiv.current && !editorInstanceRef.current) {
      editorInstanceRef.current = new Editor({
        el: editorDiv.current,
        height: "59vh",
        initialEditType: "wysiwyg",
        previewStyle: "tab",
        initialValue: initialContent,
        events: {
          change: () => {
            if (editorInstanceRef.current) {
              //! trying to mimic the structure of html to work with handleInputChange in useEmail hook
              onChange({target: {name: "message", value: editorInstanceRef.current.getMarkdown()}});
            }
          },
        },
      });
    }
  }, [initialContent, onChange]);

  return <div ref={editorDiv}></div>;
};

EmailEditor.propTypes = {
  initialContent: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default EmailEditor;
