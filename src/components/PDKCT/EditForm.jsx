import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  DatePicker,
  MultiViewCalendar,
} from "@progress/kendo-react-dateinputs";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Label } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { useStateContext } from "../../context/ContextProvider";
import moment from "moment";
import { DialogSystem } from "../";

export const CustomCalendar = (props) => {
  return <MultiViewCalendar {...props} views={1} />;
};

const EditForm = (props) => {
  const { cancelEdit, onSubmit, item, ...other } = props;
  const { getLabelValue } = useStateContext();

  const lstLocationType = useSelector((state) => state.common.lstLocationType);
  const lstProvince = useSelector((state) => state.common.lstProvince);
  const lstNation = useSelector((state) => state.common.lstNation);
  const lstTimekeepingTypeCT = useSelector(
    (state) => state.common.lstTimekeepingTypeCT
  );
  const [workPlaces, setWorkPlaces] = useState([]);
  const [newItem, setNewItem] = useState(item);

  useEffect(() => {
    if (item && item.WORKTYPE === "01") {
      setWorkPlaces(lstProvince);
    } else if (item && item.WORKTYPE === "02") {
      setWorkPlaces(lstNation);
    } else {
      setWorkPlaces(lstProvince);
    }

    setNewItem(item);
  }, [item]);

  const handleSubmit = () => {
    if (
      moment(newItem.FRLVDATE).format("YYYY-MM-DD") >
      moment(newItem.TOLVDATE).format("YYYY-MM-DD")
    ) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Ngày bắt đầu phải NHỎ hơn hay BẰNG ngày kết thúc",
      });
      return;
    }
    if (
      newItem.TIMEMORN === "" &&
      newItem.TIMEEVEN === "" &&
      newItem.TIMEAFTR === ""
    ) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng chọn ít nhất 1 buổi/ca nghỉ",
      });
      return;
    } else {
      onSubmit(newItem);
    }
  };

  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
  };

  return (
    <>
      <Dialog
        title={getLabelValue(187, "Phiếu đăng ký công tác")}
        onClose={cancelEdit}
        width="800px"
      >
        {/* Loai cong tac & Noi cong tac */}
        <div className="flex justify-start items-center gap-4 mb-3">
          {/* Loai cong tac */}
          <div className="w-full">
            <Label>{getLabelValue(188, "Loại công tác")}</Label>
            <DropDownList
              name="WORKTYPE"
              id="WORKTYPE"
              data={lstLocationType}
              textField="ITEMNAME"
              dataItemKey="ITEMCODE"
              defaultValue={
                newItem
                  ? newItem.WORKTYPE !== "" &&
                    newItem.WORKTYPE !== undefined &&
                    newItem.WORKTYPE !== null
                    ? lstLocationType.find(
                        (i) => i.ITEMCODE === newItem.WORKTYPE
                      )
                    : {}
                  : {}
              }
              onChange={(e) => {
                if (e.value.ITEMCODE == "01") {
                  setWorkPlaces(lstProvince);
                }
                if (e.value.ITEMCODE == "02") {
                  setWorkPlaces(lstNation);
                }
                setNewItem({ ...newItem, WORKTYPE: e.value.ITEMCODE });
              }}
            />
          </div>

          {/* Noi cong tac */}
          <div className="w-full">
            <Label>{getLabelValue(189, "Nơi công tác")}</Label>
            <DropDownList
              name="WORKPLAC"
              id="WORKPLAC"
              data={workPlaces}
              textField="ITEMNAME"
              dataItemKey="ITEMCODE"
              defaultValue={
                newItem
                  ? newItem.WORKPLAC !== "" &&
                    newItem.WORKPLAC !== undefined &&
                    newItem.WORKPLAC !== null
                    ? workPlaces.find((i) => i.ITEMCODE === newItem.WORKPLAC)
                    : {}
                  : {}
              }
              onChange={(e) => {
                setNewItem({ ...newItem, WORKPLAC: e.value.ITEMCODE });
              }}
            />
          </div>
        </div>

        {/* Tu ngay & Den ngay */}
        <div className="flex justify-start items-center gap-4 mb-3">
          {/* Tu ngay */}
          <div className="w-full">
            <Label>{getLabelValue(15, "Từ ngày:")}</Label>
            <DatePicker
              name={"FRLVDATE"}
              calendar={CustomCalendar}
              defaultValue={new Date(newItem?.FRLVDATE)}
              value={new Date(newItem?.FRLVDATE)}
              format="dd/MM/yyyy"
              onChange={(e) => {
                setNewItem({
                  ...newItem,
                  FRLVDATE: moment(e.value).format("YYYY-MM-DD"),
                });
              }}
            />
          </div>

          {/* Den ngay */}
          <div className="w-full">
            <Label>{getLabelValue(16, "đến ngày:")}</Label>
            <DatePicker
              name={"TOLVDATE"}
              calendar={CustomCalendar}
              defaultValue={new Date(newItem?.FRLVDATE)}
              value={new Date(newItem?.TOLVDATE)}
              format="dd/MM/yyyy"
              onChange={(e) => {
                setNewItem({
                  ...newItem,
                  TOLVDATE: moment(e.value).format("YYYY-MM-DD"),
                });
              }}
            />
          </div>
        </div>

        <div className="flex justify-start items-center gap-4 mb-3">
          <div className="w-full">
            <Label>{getLabelValue(190, "Sáng")}</Label>
            <DropDownList
              name="TIMEMORN"
              id="TIMEMORN"
              data={lstTimekeepingTypeCT}
              textField="ITEMNAME"
              dataItemKey="ITEMCODE"
              defaultValue={
                newItem
                  ? newItem.TIMEMORN !== "" &&
                    newItem.TIMEMORN !== undefined &&
                    newItem.TIMEMORN !== null
                    ? lstTimekeepingTypeCT.find(
                        (i) => i.ITEMCODE === item.TIMEMORN
                      )
                    : {}
                  : {}
              }
              onChange={(e) => {
                setNewItem({ ...newItem, TIMEMORN: e.value.ITEMCODE });
              }}
            />
          </div>

          <div className="w-full">
            <Label>{getLabelValue(191, "Chiều")}</Label>
            <DropDownList
              name="TIMEAFTR"
              id="TIMEAFTR"
              data={lstTimekeepingTypeCT}
              textField="ITEMNAME"
              dataItemKey="ITEMCODE"
              defaultValue={
                newItem
                  ? newItem.TIMEAFTR !== "" &&
                    newItem.TIMEAFTR !== undefined &&
                    newItem.TIMEAFTR !== null
                    ? lstTimekeepingTypeCT.find(
                        (i) => i.ITEMCODE === newItem.TIMEAFTR
                      )
                    : {}
                  : {}
              }
              onChange={(e) => {
                setNewItem({ ...newItem, TIMEAFTR: e.value.ITEMCODE });
              }}
            />
          </div>

          <div className="w-full">
            <Label>{getLabelValue(192, "Tối")}</Label>
            <DropDownList
              name="TIMEEVEN"
              id="TIMEEVEN"
              data={lstTimekeepingTypeCT}
              textField="ITEMNAME"
              dataItemKey="ITEMCODE"
              defaultValue={
                newItem
                  ? newItem.TIMEEVEN !== "" &&
                    newItem.TIMEEVEN !== undefined &&
                    newItem.TIMEEVEN !== null
                    ? lstTimekeepingTypeCT.find(
                        (i) => i.ITEMCODE === newItem.TIMEEVEN
                      )
                    : {}
                  : {}
              }
              onChange={(e) => {
                setNewItem({ ...newItem, TIMEEVEN: e.value.ITEMCODE });
              }}
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex items-center justify-end">
          <Button
            className="m-1"
            // type={"submit"}
            themeColor={"primary"}
            icon="save"
            svgIcon={saveIcon}
            onClick={handleSubmit}
          >
            LƯU
          </Button>

          <Button
            className="m-1"
            onClick={cancelEdit}
            icon="cancel"
            svgIcon={cancelIcon}
          >
            HỦY
          </Button>
        </div>
      </Dialog>

      {/* Thong bao */}
      {openNotify && (
        <DialogSystem item={contentNotify} cancelNotify={CancelNotifyHandler} />
      )}
    </>
  );
};

export default EditForm;
