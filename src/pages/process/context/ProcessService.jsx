import WorkspaceServiceContext from "../../../comps/workspace/WorkspaceServiceContext.jsx";
import {useWorkspaceContext} from "../../../comps/workspace/WorkspaceContext.jsx";
import {WorkspaceMode} from "../../../comps/workspace/actions.js";
import {useStateContext} from "../../../context/ContextProvider";
import createProcess from "../services/createProcess";
import deleteProcess from "../services/deleteProcess";

export default function ProcessService(props) {
  const {
    setNotificationsAutoClose,
  } = useStateContext();

  const {id, changeMode,  onDelete} = useWorkspaceContext();

  // const {viewItem} = viewProcess();
  const {createItem: updateItem} = createProcess();
  const {deleteItem} = deleteProcess();

  const onUpdateProcess = (data, callBack) => {
    updateItem(data, (res) => {
      setNotificationsAutoClose("Tải dữ liệu thành công");

      if(res ){
        callBack(res);
      }
    });
  }

  const onDeleteProcess = (callBack) => {
    deleteItem(id, () => {
      onDelete(id);
      callBack();
    });
  }

  const onRevertProcess = (callBack) => {
    changeMode(WorkspaceMode.view);
    callBack();
  }

  return (
    <WorkspaceServiceContext.Provider
      value={{
        onUpdate: onUpdateProcess,
        onDelete: onDeleteProcess,
        onRevert: onRevertProcess
      }}>
      {props.children}
    </WorkspaceServiceContext.Provider>
  )
}