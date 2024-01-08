import Modal from "../../../comps/modal/Modal.jsx";
import CreateProcessForm from "../component/CreateProcessForm";

export default function CreateProcess({templateCode, onSuccess, onCancel}) {
  return (
    <Modal title={"Tạo mới quy trình"} onClose={onCancel}>
      <CreateProcessForm templateCode={templateCode} onSuccess={onSuccess} onCancel={onCancel}/>
    </Modal>
  )
}