import InputGroup from "../../../../comps/input/InputGroup.jsx";
import SelectDocumentField from "../template/SelectDocumentField.jsx";
import { useEffect, useState } from "react";
import TextEditor from "../../../../comps/texteditor/TextEditor";

import viewDocumentTemplate from "../../../document-template/services/viewDocumentTemplate";
import { useWorkspaceContext } from "../../../../comps/workspace/WorkspaceContext";
import { Action, WorkspaceMode } from "../../../../comps/workspace/actions";
import updateDocumentTemplate from "../../../document-template/services/updateDocumentTemplate";
import ComposeEditorLayout from "../../../../comps/layout/ComposeEditorLayout";

export default function EditDocument({ documentCode, onSuccess }) {
  const { viewItem } = viewDocumentTemplate();
  const { action, item, onSelectItem, dispatchAction, changeMode } =
    useWorkspaceContext();
  const { updateItem } = updateDocumentTemplate();

  const [ready, setReady] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    // call api to load document
    viewItem(documentCode, (res) => {
      onSelectItem(res.RETNDATA[0]);

      // set document content;
      setReady(true);
      setContent(res.RETNDATA[0].HTMLTEXT ?? "");
    });
  }, [documentCode]);

  useEffect(() => {
    if (action.action === Action.request_save && item != null) {
      updateItem(
        {
          DCMNCODE: item.DCMNCODE,
          DCMNNAME: item.DCMNNAME,
          COMPCODE: item.COMPCODE,
          content: content,
        },
        (res) => {
          onSelectItem(res.RETNDATA[0]);
          dispatchAction(Action.default);
          changeMode(WorkspaceMode.view);
          onSuccess();
        }
      );
    }
  }, [action, content]);

  const handleContentChange = (content) => {
    setContent(content);
  };

  return (
    <>
      <InputGroup label={"Trường dữ liệu"} align={"start"}>
        <SelectDocumentField content={content} />
      </InputGroup>

      {ready && (
        <ComposeEditorLayout className={"edit-mode"}>
          <TextEditor content={content} onChange={handleContentChange} />
        </ComposeEditorLayout>
      )}
    </>
  );
}
