import {useEffect, useState} from "react";
import viewDocumentTemplate from "../../../document-template/services/viewDocumentTemplate";
import {useWorkspaceContext} from "../../../../comps/workspace/WorkspaceContext";
import ComposeEditorLayout from "../../../../comps/layout/ComposeEditorLayout";
import styled from "styled-components";
import TextEditor from "../../../../comps/texteditor/TextEditor";
import TextEditorReview from "../../../../comps/texteditor/TextEditorReview";

export default function ViewDocument(props) {
  const {viewItem} = viewDocumentTemplate();

  const {onSelectItem} = useWorkspaceContext();

  const [content, setContent] = useState("");

  useEffect(() => {
    // call api to load document
    viewItem(props.documentCode, (res) => {
      onSelectItem(res.RETNDATA[0]);

      // set document content;
      setContent(res.RETNDATA[0].HTMLTEXT ?? "");
    });
  }, [props.documentCode]);

  return (
    <ComposeEditorLayout className={'review-mode'}>
      <TextEditorReview content={content} />
    </ComposeEditorLayout>
  )
}

const ComposeReviewStyle = styled.div`

`
