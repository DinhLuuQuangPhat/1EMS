import {WorkspaceMode} from "../../../../comps/workspace/actions.js";
import Modal from "../../../../comps/modal/Modal.jsx";
import CreateDocumentTemplateForm from "../../../document-template/components/CreateDocumentTemplateForm.jsx";
import {useWorkspaceContext} from "../../../../comps/workspace/WorkspaceContext.jsx";

export default function CreateDocumentTemplate(props) {
  const {changeMode} = useWorkspaceContext();

  const onCancel = () => {
    changeMode(WorkspaceMode.default);
  }

  return (
    <Modal title={"Thêm mới chứng từ"} onClose={onCancel}>
      <CreateDocumentTemplateForm onSuccess={props.onSuccess} onCancel={onCancel}/>
    </Modal>
  )
}