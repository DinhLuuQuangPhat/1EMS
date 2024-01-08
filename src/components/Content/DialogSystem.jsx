import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

const DialogSystem = (props) => {
  const { item, cancelNotify } = props;
  const { getLabelValue } = useStateContext();

  let contentDialog = "";
  if (item.type === "") {
    contentDialog = <p>{item.content}</p>;
  }

  if (item.error && item.error === "CUOMCODE") {
    if (item.content.CUOMCODE !== "VND") {
      contentDialog =
        contentDialog +
        getLabelValue(137, "Đơn vị tính ") +
        " " +
        item.content.CUOMCODE +
        " " +
        getLabelValue(138, "phải khác ") +
        " " +
        item.content.CUOMRATE;
    } else {
      contentDialog =
        contentDialog +
        getLabelValue(137, "Đơn vị tính ") +
        " " +
        item.content.CUOMCODE +
        " " +
        getLabelValue(139, "phải bằng 1");
    }
  }

  return (
    <Dialog
      title={getLabelValue(83, "Thông báo")}
      onClose={cancelNotify}
      minWidth={300}
    >
      {contentDialog}
      <DialogActionsBar layout='center'>
        <button
          className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'
          onClick={cancelNotify}
        >
          {getLabelValue(84, "Đóng")}
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default DialogSystem;
