import 'react-quill/dist/quill.snow.css';
import React, {useRef, useState} from "react";
import ReactQuill, {Quill} from 'react-quill';
import styled from "styled-components";
import {
  insert_dienGiai, insert_fileDinhKem, insert_LOGO,
  insert_ngayCT,
  insert_nguoiNhan,
  insert_noiDung,
  insert_soCT,
  insert_triGia
} from "./toolbar/EditorToolbarUtil";
import {TextEditorStyle} from "./TextEditorReview";

import {CntnField} from "./plugins/CntnField";
import {CodeField} from "./plugins/CodeField";
import {DateField} from "./plugins/DateField";
import {EmplField} from "./plugins/EmplField";
import {FileField} from "./plugins/FileField";
import {LogoField} from "./plugins/LogoField";
import {NoteField} from "./plugins/NoteField";
import {ValueField} from "./plugins/ValueField";

Quill.register(CntnField, true);
Quill.register(CodeField, true);
Quill.register(DateField, true);
Quill.register(EmplField, true);
Quill.register(FileField, true);
Quill.register(LogoField, true);
Quill.register(NoteField, true);
Quill.register(ValueField, true);

const Editor = ({content, onChange, placeholder}) => {
  const quillRef = useRef();
  const [contentHtml, setContentHtml] = useState(content ?? "");

  const handleOnChange = (val) => {
    setContentHtml(val);
    onChange(val);
  }

  return (
    <EditorStyle className="text-editor">
      <TextEditorStyle className={"content-html"}>
        <ReactQuill
          ref={quillRef}
          value={contentHtml}
          onChange={handleOnChange}
          placeholder={placeholder ?? ""}
          modules={Editor.modules}
          // formats={Editor.formats}
          theme={"snow"}
        />
      </TextEditorStyle>
    </EditorStyle>
  )
}

Editor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insert_LOGO: insert_LOGO,
      insert_soCT: insert_soCT,
      insert_ngayCT: insert_ngayCT,
      insert_triGia: insert_triGia,
      insert_noiDung: insert_noiDung,
      insert_dienGiai: insert_dienGiai,
      insert_nguoiNhan: insert_nguoiNhan,
      insert_fileDinhKem: insert_fileDinhKem,
    }
  },
  clipboard: {
    matchVisual: false
  }
};
//
// Editor.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "color"
// ];


/*
 * Render component on page
 */

export default Editor;

const EditorStyle = styled.div`
  .ql-editor {
    min-height: 16em;
  }
`;

