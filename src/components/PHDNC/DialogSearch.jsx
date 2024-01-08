import React, { useEffect, useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { useStateContext } from "../../context/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { getLstPHTAM_PHDNC } from "../../actions/account";
import DialogGrid from "./DialogGrid";

const DialogSearch = ({ item, onSubmitSrch, onCancel }) => {
  const { getLabelValue } = useStateContext();

  let para001 =
    "'" +
    item.DDDD +
    "','" +
    item.DCMNSBCD +
    "','" +
    item.DCMNSBCD +
    "'," +
    item.OBJCTYPE +
    ",'" +
    item.OBJCCODE +
    "','" +
    item.CUOMCODE +
    "','','1900-01-01','',1,2";

  console.log(item);
  console.log(para001);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstPHTAM_PHDNC(para001));
  }, [dispatch, item]);
  const lstPHTAM_PHDNC = useSelector((state) => state.Account.lst_PHTAM_PHDNC);
  const [dataItem, setDataItem] = useState();
  useEffect(() => {
    setDataItem(lstPHTAM_PHDNC);
  }, [lstPHTAM_PHDNC]);

  const [selectedItem, setSelectedItem] = useState();
  const SelectedItemHandler = (dataItem) => {
    setSelectedItem(dataItem);
  };

  return (
    <Dialog
      title={getLabelValue(232, "Danh sách chứng từ")}
      onClose={onCancel}
      minWidth={300}
      width={1024}
    >
      {dataItem?.length > 0 && (
        <DialogGrid dataItem={dataItem} onSelectedItem={SelectedItemHandler} />
      )}

      <DialogActionsBar layout="center">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={() => onSubmitSrch(selectedItem)}
        >
          {getLabelValue(168, "Chọn")}
        </button>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={onCancel}
        >
          {getLabelValue(77, "Hủy")}
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default DialogSearch;
