import * as React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
const NotifyDialog = ({
  visible,
  toggleDialog,
  stringNotify,
  contenNotify,
}) => {
  return (
    <div>
      {visible && (
        <Dialog
          title={contenNotify ? contenNotify : "Thông báo"}
          onClose={toggleDialog}
        >
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            {stringNotify}
          </p>
          <DialogActionsBar>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={toggleDialog}
            >
              Đóng
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default NotifyDialog;
