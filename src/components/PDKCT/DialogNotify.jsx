import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

const DialogNotify = (props) => {
  const { item, cancelNotify } = props;
  const { getLabelValue } = useStateContext();

  let contentDialog = "";
  if (item.type === "") {
    contentDialog += item.content;
  }

  return (
    <Dialog
      title={getLabelValue(83, "Thông báo")}
      onClose={cancelNotify}
      minWidth={300}
    >
      <p>{contentDialog}</p>
      <DialogActionsBar layout="center">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={cancelNotify}
        >
          {getLabelValue(84, "Đóng")}
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default DialogNotify;
