import {useEffect, useState} from "react";
import TextEditorCompose from "../../../../comps/texteditor/TextEditorCompose";
import {document_template_content} from "../../../../comps/texteditor/input_sample";
import ComposeEditorLayout from "../../../../comps/layout/ComposeEditorLayout";

export default function ComposeDocumentTemplate(props) {
  const [content, setContent] = useState("");
  const [fieldData, setFieldData] = useState({});

  useEffect(() => {
    if (props.documentId != null && props.documentId > 0) {
      loadDocumentData(props.documentId);
    }
  }, [props.documentId]);

  const handleContentChange = (content) => {
    setContent(content);
  }

  const loadDocumentData = (documentId) => {
    if (documentId != null && documentId > 0) {
      // call api to get the document data.
      // then update the content
      setContent(document_template_content);
    }
  }

  return (
    <ComposeEditorLayout>
      <TextEditorCompose content={content} values={fieldData} onChange={handleContentChange}/>
    </ComposeEditorLayout>
  )
}