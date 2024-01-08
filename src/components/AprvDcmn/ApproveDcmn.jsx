import React, { useEffect, useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { useStateContext } from "../../context/ContextProvider";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { TextArea, MaskedTextBox } from "@progress/kendo-react-inputs";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "@progress/kendo-react-labels";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { getLstDepartment_Employee } from "../../actions/common";
import { DialogSystem } from "../";

const ApproveDcmn = (props) => {
  const { onSubmit, onCancel, item } = props;
  const { getLabelValue, appColors, userData } = useStateContext();

  const lstDcmnPrcs = useSelector((state) => state.document.lstDcmnPrcs);
  const lstLocation = useSelector((state) => state.common.lstLocation);
  const lstDepartment = useSelector((state) => state.common.lstDepartment);
  const lstDepartment_Employee = useSelector(
    (state) => state.common.lstDepartment_Employee
  );
  useEffect(() => {
    dispatch(getLstDepartment_Employee(""));
  }, []);
  const listPDCT = useSelector((state) => state.document.lstAprvDcmn);

  const [aprvInfo, setAprvInfo] = useState({
    LCTNCODE: item.LCTNCODE,
    DCMNCODE: item.DCMNCODE,
    KEY_CODE: item.KEY_CODE,
    PRCSEMPL: userData.EMPLCODE,
    PRCSCODE: "",
    NOTETEXT: "",
    ADD_EMPL: "",
    DPTMCODE: "",
  });

  const NoteTextChgeHandler = (event) => {
    setAprvInfo({ ...aprvInfo, NOTETEXT: event.value });
  };
  const DcmnPrcsChgeHandler = (event) => {
    setAprvInfo({ ...aprvInfo, PRCSCODE: event.value.ITEMCODE });
  };

  const dispatch = useDispatch();
  const DptmChgeHandler = (event) => {
    if (event.target.value !== null) {
      const arrayItem = event.value;
      let listItem = "";
      arrayItem.map((i) => {
        if (listItem === "") {
          listItem = listItem + i.ITEMCODE;
        } else {
          listItem = listItem + "," + i.ITEMCODE;
        }
      });

      setAprvInfo({ ...aprvInfo, DPTMCODE: listItem });
      dispatch(getLstDepartment_Employee(listItem));
    }

    if (event.value.length === 0) {
      dispatch(getLstDepartment_Employee(""));
    }
  };

  const AddEmplHandler = (event) => {
    if (event.target.value !== null) {
      const arrayItem = event.value;
      let listItem = "";
      arrayItem.map((i) => {
        if (listItem === "") {
          listItem = listItem + i.ItemCode;
        } else {
          listItem = listItem + "," + i.ItemCode;
        }
      });

      setAprvInfo({ ...aprvInfo, ADD_EMPL: listItem });
    }
  };

  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const SubmitAprvHandler = () => {
    if (aprvInfo.PRCSCODE === "") {
      setContentNotify({
        type: "",
        content: "Vui lòng chọn 1 Loại xet duyệt",
      });
      setOpenNotify(true);
      return;
    }
    onSubmit(aprvInfo);
    setOpenNotify(false);
  };
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
  };

  return (
    <>
      <Dialog title="" onClose={onCancel} width="1000px" minWidth="1000px">
        <div className="">
          <div className="grid grid-cols-1 gap-4">
            {/* Chi nhanh */}
            <div className="w-full">
              <div>
                <Label className="text-sm text-gray-500">
                  {getLabelValue(173, "Chi nhánh")}
                </Label>
                <DropDownList
                  id="LCTNCODE"
                  name="LCTNCODE"
                  style={{ borderColor: "grey" }}
                  value={
                    aprvInfo?.LCTNCODE
                      ? lstLocation.find(
                          (i) => i.ITEMCODE === aprvInfo.LCTNCODE
                        )
                      : {}
                  }
                  textField="ITEMNAME"
                  dataItemKey="ITEMCODE"
                  data={lstLocation}
                  className={appColors.inputColor}
                  size="small"
                  disabled={true}
                />
              </div>
            </div>

            {/* So chung tu & Ngay chung tu & NV trinh ky */}
            <div className="w-full">
              <div className="grid grid-cols-4 gap-4">
                {/* So chung tu */}
                <div>
                  <Label className="text-sm text-gray-500">
                    {getLabelValue(117, "Số chứng từ")}
                  </Label>
                  <MaskedTextBox
                    id="MAINCODE"
                    name="MAINCODE"
                    style={{ borderColor: "grey" }}
                    value={aprvInfo?.MAINCODE}
                    readonly={true}
                    className={appColors.inputColor}
                    size="small"
                  />
                </div>

                {/* Ngay chung tu */}
                <div>
                  <Label className="text-sm text-gray-500">
                    {getLabelValue(118, "Ngày chứng từ")}
                  </Label>
                  <DatePicker
                    format="dd/MM/yyyy"
                    value={
                      aprvInfo?.MAINDATE
                        ? new Date(aprvInfo?.MAINDATE)
                        : new Date()
                    }
                    className={appColors.inputColor}
                    size="small"
                    disabled={true}
                  />
                </div>

                {/* NV trinh ky */}
                <div className="col-span-2">
                  <Label className="text-sm text-gray-500">
                    {getLabelValue(172, "NV trình ký")}
                  </Label>
                  <MaskedTextBox
                    id="EMSGNAME"
                    name="EMSGNAME"
                    style={{ borderColor: "grey" }}
                    value={aprvInfo?.EMSGNAME}
                    readonly={true}
                    className={appColors.inputColor}
                    size="small"
                  />
                </div>
              </div>
            </div>

            {/* Ghi chu */}
            <div className="w-full">
              <div>
                <Label className="text-sm text-gray-500">
                  {getLabelValue(128, "Ghi chú")}
                </Label>
                <TextArea
                  id="NOTESGST"
                  name="NOTESGST"
                  value={aprvInfo?.NOTETEXT}
                  rows={4}
                  size="small"
                  className={appColors.inputColor}
                  autoSize={false}
                  onChange={NoteTextChgeHandler}
                />
              </div>
            </div>

            {/* Loai xet duyet */}
            <div className="w-full">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">
                    {getLabelValue(176, "Loại xét duyệt")}
                  </Label>
                  <DropDownList
                    id="PRCSCODE"
                    name="PRCSCODE"
                    style={{ borderColor: "grey" }}
                    value={
                      aprvInfo?.PRCSCODE
                        ? lstDcmnPrcs.find(
                            (i) => i.ITEMCODE === aprvInfo.PRCSCODE
                          )
                        : {}
                    }
                    textField="ITEMNAME"
                    dataItemKey="ITEMCODE"
                    data={lstDcmnPrcs}
                    className={appColors.inputColor}
                    size="small"
                    onChange={DcmnPrcsChgeHandler}
                  />
                </div>
                {aprvInfo.PRCSCODE === "005" && (
                  <div>
                    <Label className="text-sm text-gray-500">
                      {getLabelValue(150, "Bộ phận")}
                    </Label>
                    <MultiSelect
                      id="DPTMCODE"
                      name="DPTMCODE"
                      style={{ borderColor: "grey" }}
                      value={
                        lstDepartment
                          ? lstDepartment.filter((aprvInfo) =>
                              aprvInfo.DPTMCODE.split(",").includes(
                                aprvInfo.ITEMCODE
                              )
                            )
                          : []
                      }
                      textField="ITEMNAME"
                      dataItemKey="ITEMCODE"
                      data={lstDepartment}
                      className={appColors.inputColor}
                      size="small"
                      onChange={DptmChgeHandler}
                      autoClose={false}
                    />
                  </div>
                )}
                {aprvInfo.PRCSCODE === "005" && (
                  <div className="col-span-2">
                    <Label className="text-sm text-gray-500">
                      {getLabelValue(176, "Loại xét duyệt")}
                    </Label>
                    <MultiSelect
                      id="ADD_EMPL"
                      name="ADD_EMPL"
                      style={{ borderColor: "grey" }}
                      value={
                        lstDepartment_Employee
                          ? lstDepartment_Employee.filter((aprvInfo) =>
                              aprvInfo.ADD_EMPL.split(",").includes(
                                aprvInfo.ItemCode
                              )
                            )
                          : []
                      }
                      textField="ItemName"
                      dataItemKey="ItemCode"
                      data={lstDepartment_Employee}
                      className={appColors.inputColor}
                      size="small"
                      onChange={AddEmplHandler}
                      autoClose={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogActionsBar layout={"center"}>
          <div className="flex items-center justify-end">
            <Button
              className="m-1 uppercase"
              type={"submit"}
              themeColor={"primary"}
              icon="save"
              svgIcon={saveIcon}
              onClick={SubmitAprvHandler}
            >
              {getLabelValue(81, "Thực hiện")}
            </Button>
            <Button
              className="m-1 uppercase"
              onClick={onCancel}
              icon="cancel"
              svgIcon={cancelIcon}
            >
              {getLabelValue(77, "Hủy")}
            </Button>
          </div>
        </DialogActionsBar>
      </Dialog>

      {openNotify && (
        <DialogSystem cancelNotify={CancelNotifyHandler} item={contentNotify} />
      )}
    </>
  );
};

export default ApproveDcmn;
0;
