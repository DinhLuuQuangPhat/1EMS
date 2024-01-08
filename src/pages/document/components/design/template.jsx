import InputGroup from "../../../../comps/input/InputGroup";
import SelectDocumentField from "../template/SelectDocumentField";
import TextEditor from "../../../../comps/texteditor/TextEditor";
import {useState} from "react";

export const EditorTemplateDemo = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (content) => {
    setContent(content);
  }

  return (
    <div>
      <InputGroup label={"Trường dữ liệu"} align={"start"}>
        <SelectDocumentField content={content} />
      </InputGroup>

      <TextEditor content={content} onChange={handleContentChange}/>
    </div>
  )
}