import React, { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { Label } from "@progress/kendo-react-labels";
import { TreeView } from "@progress/kendo-react-treeview";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { useStateContext } from "../../context/ContextProvider";

const DialogTree = (props) => {
  const { data, onCanCel, onSubmit, TitleDialog } = props;

  const { getLabelValue } = useStateContext();

  const [result, setResult] = useState();
  const onItemClick = (data) => {
    setResult(data);
  };

  return (
    <Dialog title={TitleDialog} onClose={onCanCel}>
      <div className="max-h-96 h-96 min-h-[300px] overflow-y-auto w-96 max-w-96">
        <Label>{TitleDialog}</Label>
        <div className={"k-form-field-wrap"}>
          <TreeView data={data} size="small" onItemClick={onItemClick} />
        </div>
      </div>
      <DialogActionsBar layout="start">
        <Button
          type={"submit"}
          themeColor={"primary"}
          onClick={() => {
            onSubmit(result);
          }}
          icon="save"
          svgIcon={saveIcon}
        >
          {getLabelValue(168, "Chọn")}
        </Button>
        <Button onClick={onCanCel} icon="cancel" svgIcon={cancelIcon}>
          {getLabelValue(77, "Hủy")}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default DialogTree;
