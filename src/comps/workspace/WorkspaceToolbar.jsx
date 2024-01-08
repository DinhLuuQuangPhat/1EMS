import { useWorkspaceContext } from "./WorkspaceContext.jsx";
import { Action, WorkspaceAction, WorkspaceMode } from "./actions.js";
import styled from "styled-components";
import ConfirmModal from "../modal/ConfirmModal.jsx";
import { useWorkspaceService } from "./WorkspaceServiceContext.jsx";
import Button from "../button/Button";
import { ButtonIcons } from "../button/ButtonIcons";

export function WorkspaceToolbar(props) {
  const { onDelete, onRevert } = useWorkspaceService();
  const { action, actions, dispatchAction, changeMode } = useWorkspaceContext();

  const handleOnDelete = () => {
    dispatchAction(Action.request_delete);
  };
  const handleOnRevert = () => {
    dispatchAction(Action.request_revert);
  };

  const handleSave = () => {
    dispatchAction(Action.request_save);
  };
  const handleDelete = (confirm) => {
    if (confirm === true) {
      if (props.onDelete) {
        props.onDelete(() => {
          dispatchAction(Action.refresh);
        });
      } else {
        onDelete(() => {
          dispatchAction(Action.refresh);
        });
      }
    } else {
      dispatchAction(Action.default);
    }
  };

  const handleRevert = (confirm) => {
    if (confirm === true) {
      onRevert(() => {
        dispatchAction(Action.refresh);
      });
    } else {
      dispatchAction(Action.default);
    }
  };

  const handlePrint = () => {
    dispatchAction(Action.request_print);
  };

  const handleAddNew = () => {
    if (props.type === "request") {
      dispatchAction(Action.request_add_new);
    } else {
      changeMode(WorkspaceMode.add_new);
    }
  };
  const handleOnEdit = () => {
    if (props.type === "request") {
      dispatchAction(Action.request_edit);
    } else {
      changeMode(WorkspaceMode.edit);
    }
  };

  return (
    <>
      <WorkspaceToolbarStyle className={"toolbar"}>
        {props.actions.includes(WorkspaceAction.add) && (
          <Button
            icon={ButtonIcons.add}
            disabled={!actions.includes(WorkspaceAction.add)}
            onClick={handleAddNew}
            title="Thêm chứng từ"
          >
            Thêm
          </Button>
        )}

        {props.actions.includes(WorkspaceAction.edit) && (
          <Button
            icon={ButtonIcons.edit}
            disabled={!actions.includes(WorkspaceAction.edit)}
            onClick={handleOnEdit}
            title="Sửa chứng từ"
          >
            Sửa
          </Button>
        )}

        {props.actions.includes(WorkspaceAction.delete) && (
          <Button
            icon={ButtonIcons.delete}
            disabled={!actions.includes(WorkspaceAction.delete)}
            onClick={handleOnDelete}
            title="Xóa chứng từ"
          >
            Xóa
          </Button>
        )}

        {props.actions.includes(WorkspaceAction.save) && (
          <Button
            icon={ButtonIcons.save}
            disabled={!actions.includes(WorkspaceAction.save)}
            onClick={handleSave}
          >
            Lưu
          </Button>
        )}

        {props.actions.includes(WorkspaceAction.revert) && (
          <Button
            icon={ButtonIcons.revert}
            disabled={!actions.includes(WorkspaceAction.revert)}
            onClick={handleOnRevert}
            title="Huy Thao tac"
          >
            Khôi phục
          </Button>
        )}

        {props.actions.includes(WorkspaceAction.print) && (
          <Button
            icon={ButtonIcons.print}
            disabled={!actions.includes(WorkspaceAction.print)}
            onClick={handlePrint}
          >
            In
          </Button>
        )}
      </WorkspaceToolbarStyle>

      {action.action === Action.request_delete && (
        <ConfirmModal
          title={"Xác nhận!"}
          ok={"Đồng ý"}
          cancel={"Hủy"}
          onClose={handleDelete}
        >
          {props.message && props.message.delete ? (
            <p dangerouslySetInnerHTML={{ __html: props.message.delete }} />
          ) : (
            <p>Bạn có thực sự muốn xóa chứng từ này?</p>
          )}
        </ConfirmModal>
      )}

      {action.action === Action.request_revert && (
        <ConfirmModal
          title={"Xác nhận!"}
          ok={"Đồng ý"}
          cancel={"Hủy"}
          onClose={handleRevert}
        >
          <p>
            Bạn có thực sự muốn hủy mọi thay đổi và khôi phục lại trạng thái ban
            đầu?
          </p>
        </ConfirmModal>
      )}
    </>
  );
}

const WorkspaceToolbarStyle = styled.div`
  display: flex;
  gap: 8px;
`;
