// ReactQuillEditor.tsx
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
  value: string;
  onChange: (content: string) => void;
}

function ReactQuillEditor({ value = "", onChange }: ReactQuillEditorProps) {
  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(_html) => {
        onChange(_html);
      }}
      modules={modules}
      style={{ margin: "0 auto" }}
    />
  );
}

export default ReactQuillEditor;
