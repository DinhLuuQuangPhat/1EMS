import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

const DialogDelete = ({
  acptDelete,
  setAcptDelete,
  onCancelDelete,
  dialogDelete,
  setDialogDelete,
  MainCode,
}) => {
  const { getLabelValue } = useStateContext();

  const onSubmitHandler = () => {
    setAcptDelete(!acptDelete);
    setDialogDelete(!dialogDelete);
  };

  return (
    <Dialog
      title={getLabelValue(83, "Thông báo")}
      onClose={onCancelDelete}
      minWidth={300}
    >
      {getLabelValue(256, "Bạn có muốn xóa chứng từ:") + MainCode}
      <DialogActionsBar layout="center">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid bg-slate-100"
          onClick={onSubmitHandler}
        >
          {getLabelValue(257, "Có")}
        </button>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={onCancelDelete}
        >
          {getLabelValue(258, "Không")}
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default DialogDelete;
