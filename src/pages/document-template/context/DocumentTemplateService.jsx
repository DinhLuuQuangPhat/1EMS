import WorkspaceServiceContext from "../../../comps/workspace/WorkspaceServiceContext.jsx";
import {useWorkspaceContext} from "../../../comps/workspace/WorkspaceContext.jsx";
import {WorkspaceAction, WorkspaceMode} from "../../../comps/workspace/actions.js";
import {useStateContext} from "../../../context/ContextProvider";
import viewDocumentTemplate from "../services/viewDocumentTemplate";
import deleteDocumentTemplate from "../services/deleteDocumentTemplate";
import updateDocumentTemplate from "../services/updateDocumentTemplate";
import createDocumentTemplate from "../services/createDocumentTemplate";

export default function DocumentTemplateService(props) {
  const {
    setNotificationsAutoClose,
  } = useStateContext();
  const {id, onView, changeMode, onDelete, setDisabledActions} = useWorkspaceContext();

  const {viewItem} = viewDocumentTemplate();
  const {createItem} = createDocumentTemplate();
  const {updateItem } = updateDocumentTemplate();
  const {deleteItem} = deleteDocumentTemplate();

  const onViewDocument = (KEY_CODE, callBack) => {
    alert(KEY_CODE);

    viewItem(KEY_CODE, (data) => {
      if(data && data.RETNDATA){
        const item = data.RETNDATA[0];

        if(item.STTESIGN < 1){
          setDisabledActions([WorkspaceAction.save, WorkspaceAction.revert]);
        }
        onView(KEY_CODE, item);
        callBack(item);
      }
    });
  };

  const onCreateDocument = ({DCMNCODE, DCMNNAME}, callBack) => {
    createItem(DCMNCODE, DCMNNAME, (res) => {
      callBack(res);
    });
  }

  const onUpdateDocument = (data, callBack) => {
    updateItem(data, (res) => {
      setNotificationsAutoClose("Tải dữ liệu thành công");

      if(res ){
        callBack(res);
      }
    });
  }

  const onDeleteDocument = (callBack) => {
    console.log("DocumentService. delete the document and show next document in review mode");

    deleteItem(id, () => {
      onDelete(id);
      callBack();
    });
  }

  const onRevertDocument = (callBack) => {
    console.log("DocumentService. revert all data of the document and change to review mode");
    changeMode(WorkspaceMode.view);
    callBack();
  }

  return (
    <WorkspaceServiceContext.Provider
      value={{
        onView: onViewDocument,
        onCreate: onCreateDocument,
        onUpdate: onUpdateDocument,
        onDelete: onDeleteDocument,
        onRevert: onRevertDocument
      }}>
      {props.children}
    </WorkspaceServiceContext.Provider>
  )
}