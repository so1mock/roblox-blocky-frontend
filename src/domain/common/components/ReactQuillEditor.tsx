// ReactQuillEditor.tsx
import { forwardRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// 커스텀 툴바 옵션
const toolbarOptions = [
  [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ color: [] }, { background: [] }],
  ["image", "video"],
];

interface ReactQuillEditorProps {
  value?: string;
}

const ReactQuillEditor = forwardRef<ReactQuill, ReactQuillEditorProps>(
  ({ value = "" }, ref) => {
    const handleChange = (content: string) => {
      console.log(content);
    };

    const modules = {
      toolbar: {
        container: toolbarOptions,
      },
    };

    return (
      <ReactQuill
        ref={ref}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        style={{ margin: "0 auto" }}
      />
    );
  },
);

// ✅ displayName 지정
ReactQuillEditor.displayName = "ReactQuillEditor";
export default ReactQuillEditor;
