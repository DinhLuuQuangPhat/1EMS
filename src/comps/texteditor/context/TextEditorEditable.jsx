import HTMLReactParser from "html-react-parser";
import {useTextEditorContext} from "./TextEditorProvider.jsx";
import EditorInput, {EditorInputClassName} from "../input/EditorInput";
function TextEditorEditable() {
  const {disabled, content} = useTextEditorContext();

  const options = {
    replace: (node, index) => {
      if (node != null && node.attribs != null) {
        const className = node.attribs.class + "";

        const type = node.attribs.type ?? "";
        const name = node.attribs.name + "";
        const title = node.attribs.title ?? "";

        if(node.attribs.class === EditorInputClassName){
          return <EditorInput key={"input_name_" + name + "_node_index_" + index} className={className} type={type} name={name} placeholder={title} disabled={disabled} />;
        }
      }
    },
  };

  return (
    <div className={"ql-editor"}>{HTMLReactParser(content, options)}</div>
  );
}

export default TextEditorEditable;