import Workspace from "../../../comps/workspace/Workspace.jsx";
import {WorkspaceToolbar} from "../../../comps/workspace/WorkspaceToolbar.jsx";
import {useWorkspaceContext} from "../../../comps/workspace/WorkspaceContext.jsx";
import SelectDocumentTemplate from "../../document-template/components/SelectDocumentTemplate.jsx";
import InputGroup from "../../../comps/input/InputGroup.jsx";
import React, {useState} from "react";
import SelectProcess from "../component/SelectProcess.jsx";
import {Action, WorkspaceAction, WorkspaceMode} from "../../../comps/workspace/actions.js";
import Button from "../../../comps/button/Button";
import styled from "styled-components";
import EditProcessFlowForm from "./EditProcessFlowForm";
import ProcessService from "../context/ProcessService";
import CreateProcess from "./CreateProcess";
import ViewProcessFlow from "./ViewProcessFlow";
import createProcess from "../services/createProcess";
import AddProcessFlowForm from "./AddProcessFlowForm";

export default function ManageProcess() {
  return (
    <Workspace>
      <ProcessService>
        <WorkspaceToolbar
          actions={[WorkspaceAction.add, WorkspaceAction.edit, WorkspaceAction.save, WorkspaceAction.delete, WorkspaceAction.revert]}
          message={{"delete": "Bạn thực sự muốn xóa quy trình này?"}}
        />
        <ManageProcessContainer/>
      </ProcessService>
    </Workspace>
  )
}

function ManageProcessContainer() {
  const { mode, changeMode, onView, action, dispatchAction} = useWorkspaceContext();

  const [templateCode, setTemplateCode] = useState("");
  const [template, setTemplate] = useState(null);
  const [processCode, setProcessCode] = useState("");
  const [totalProcess, setTotalProcess] = useState("");
  const [process, setProcess] = useState(null);

  const onSelectTemplate = (template) => {
    if (template) {
      setTemplateCode(template.ITEMCODE);
      setTemplate(template);
      setProcessCode("");

    } else {
      setTemplateCode("");
      setTemplate(null);
      setProcessCode("");
    }
  }

  const onSelectProcess = (processCode) => {
    setProcessCode(processCode);
    changeMode(WorkspaceMode.custom);
  }

  const onViewProcess = () => {
    onView({templateCode: templateCode, processCode: processCode})
  }
  const onDocumentLoaded = (numbOptions) => {
    if (numbOptions != null && numbOptions > 0) {
      setTotalProcess("(" + numbOptions + ")");
    } else {
      setTotalProcess("");
    }
  }

  const onAddTemplateSuccess = (process, steps) => {
    setProcess({...process, steps: steps});
  }

  const onCreateSuccess = (templateCode, processCode) => {
    setTemplateCode(templateCode);
    setProcessCode(processCode);
    setProcess(null);

    dispatchAction(Action.reload);
    onView({templateCode: templateCode, processCode: processCode})
  }

  const handleOnCancel = () => {
    changeMode(WorkspaceMode.default)
  }

  return (
    <ManageProcessStyle className={'manage-process-container mt-5'}>
      <div className={"input-groups"}>
        <InputGroup label={"Loại chứng từ"}>
          <SelectDocumentTemplate value={templateCode} onChange={onSelectTemplate}/>
        </InputGroup>

        <InputGroup label={"Quy trình" + totalProcess}
                    addons={<Button disabled={templateCode === "" || processCode === ""}
                                    onClick={onViewProcess}>Load</Button>}>

          <SelectProcess action={action} templateCode={templateCode} value={processCode} onChange={onSelectProcess}
                         onLoaded={onDocumentLoaded}/>
        </InputGroup>
      </div>

      {mode === WorkspaceMode.add_new && process != null && (
        <AddProcessFlowForm action={action} process={process} templateCode={templateCode} processCode={processCode} onSuccess={onCreateSuccess}/>
      )}

      {templateCode && processCode && mode === WorkspaceMode.view && (
        <ViewProcessFlow templateCode={templateCode} processCode={processCode}/>
      )}

      {templateCode && processCode && mode === WorkspaceMode.edit && (
        <EditProcessFlowForm action={action}  templateCode={templateCode} processCode={processCode} template={template} onSuccess={onCreateSuccess}/>
      )}

      {mode === WorkspaceMode.add_new && process == null && (
        <CreateProcess templateCode={templateCode} onSuccess={onAddTemplateSuccess} onCancel={handleOnCancel}/>
      )}
    </ManageProcessStyle>
  )
}

const ManageProcessStyle = styled.div`
  .input-groups {
    flex-grow: 1;
    display: flex;
    gap: 16px;

    .input-group-fields {
      margin-bottom: 0 !important;

      .input-group-field {
        max-width: calc(100% - 120px);
      }
    }
  }

`