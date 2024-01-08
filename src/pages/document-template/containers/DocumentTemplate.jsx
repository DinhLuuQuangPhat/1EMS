import Workspace from "../../../comps/workspace/Workspace";
import SelectDocumentTemplate from "../components/SelectDocumentTemplate";
import {useWorkspaceContext} from "../../../comps/workspace/WorkspaceContext";
import {Action, WorkspaceAction, WorkspaceMode} from "../../../comps/workspace/actions";
import InputGroup from "../../../comps/input/InputGroup";
import CreateDocumentTemplate from "../../document/components/template/CreateDocumentTemplate";
import EditDocument from "../../document/components/design/EditDocument";
import ViewDocument from "../../document/components/design/ViewDocument";
import {WorkspaceToolbar} from "../../../comps/workspace/WorkspaceToolbar";

import Button from "../../../comps/button/Button";
import {ButtonIcons} from "../../../comps/button/ButtonIcons";
import DocumentTemplateService from "../context/DocumentTemplateService";

export default function DocumentTemplate() {
  return (
    <Workspace>
      <DocumentTemplateService>
        <WorkspaceToolbar actions={[WorkspaceAction.add, WorkspaceAction.edit, WorkspaceAction.save, WorkspaceAction.delete, WorkspaceAction.revert]}/>
        <ManageDocumentContainer/>
      </DocumentTemplateService>
    </Workspace>
  )
}

const ManageDocumentContainer = () => {
  const {id, mode, action, changeMode, onSelect, onView, onEdit, dispatchAction} = useWorkspaceContext();

  const handleOnChange = (document) => {
    if (document != null) {
      onSelect(document.ITEMCODE);
      changeMode(WorkspaceMode.selected);
    } else {
      onSelect(null);
      changeMode(WorkspaceMode.default);
    }
  }
  const onCreateSuccess = (ITEMCODE) => {
    onEdit(ITEMCODE);
    dispatchAction(Action.refresh);
  }

  const handleOnUpdate = () => {
    onView(id);
  }

  return (
    <div className={'manage-template-container mt-5'}>
      <InputGroup label={"Tên chứng từ"}
                  addons={<Button icon={ButtonIcons.load} disabled={id == null} onClick={() => onView(id)}>Load</Button>}>
        <SelectDocumentTemplate action={action} value={id} onChange={handleOnChange}/>
      </InputGroup>

      {id != null ? (
        <>
          {mode === WorkspaceMode.view && (
            <ViewDocument documentCode={id}/>
          )}

          {mode === WorkspaceMode.edit && (
            <EditDocument documentCode={id} onSuccess={handleOnUpdate}/>
          )}
        </>
      ) : (
        <div style={{
          minHeight: 250,
          display: "flex",
          border: "1px solid #ccc",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "125%",
          color: "#CCC",
          marginTop: 50,
        }}>
          Please select a document
        </div>
      )}

      {mode === WorkspaceMode.add_new && (
        <CreateDocumentTemplate onSuccess={onCreateSuccess}/>
      )}
    </div>
  )
}


