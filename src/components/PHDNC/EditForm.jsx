import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { useStateContext } from "../../context/ContextProvider";
import { getLstBusnSpend, getLstCostTypeACC } from "../../actions/account";
import moment from "moment";
import {
  FieldEditCombobox,
  FieldEditDatePicker,
  FieldEditInput,
  FieldEditNumberic,
  FieldEditDropdown,
  FieldEditTextArea,
} from "../";
import DialogNotify from "./DialogNotify";

function useWindowSize() {
  const [size, setSize] = useState(1024);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1023) {
        setSize(1024 - 10);
      }
      if (window.innerWidth <= 1023) {
        setSize(900 - 10);
      }
      if (window.innerWidth <= 899) {
        setSize(768 - 10);
      }
      if (window.innerWidth <= 767) {
        setSize(600 - 10);
      }
      if (window.innerWidth <= 599) {
        setSize(480 - 10);
      }
      if (window.innerWidth <= 479) {
        setSize(375 - 10);
      }
      if (window.innerWidth <= 374) {
        setSize(320 - 10);
      }
      if (window.innerWidth <= 320) {
        setSize(300 - 10);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const EditForm = (props) => {
  const { onCancelEdit, onSubmit, item, DcmnView, ...other } = props;
  const { getLabelValue } = useStateContext();
  const widthResize = useWindowSize();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstCostTypeACC());
  }, []);
  const lstAcctDcmn = useSelector((state) => state.Account.lstAcctDcmn); // tai khoan BusnCode
  const lstBusnSpend = useSelector((state) => state.Account.lstBusnSpend); // tai khoan SpndCode
  const lstCostTypeACC = useSelector((state) => state.Account.lstCostTypeACC); // CostType

  const [lstCostCode, setLstCostCode] = useState([]);
  const lstLocation = useSelector((state) => state.common.lstLocation);
  const lstDepartment = useSelector((state) => state.common.lstDepartment);
  const lstMnfr = useSelector((state) => state.Account.lstMnfr); // CostType
  const lstAcObManage = useSelector((state) => state.common.lstAcObManage); // Du an

  const CostTypeChgeHanlder = (event) => {
    setNewItem({ ...newItem, COSTTYPE: parseInt(event.value.ITEMCODE) });

    if (event.value.ITEMCODE == 1) {
      setLstCostCode(lstLocation);
    } else if (event.value.ITEMCODE == 2) {
      setLstCostCode(lstDepartment);
    } else if (event.value.ITEMCODE == 3) {
      setLstCostCode(lstMnfr);
    } else if (event.value.ITEMCODE == 4) {
      setLstCostCode(lstAcObManage);
    } else setLstCostCode([]);
  };

  const [newItem, setNewItem] = useState(item);
  useEffect(() => {
    setNewItem(item);

    if (item.COSTTYPE == 1) {
      setLstCostCode(lstLocation);
    } else if (item.COSTTYPE == 2) {
      setLstCostCode(lstDepartment);
    } else if (item.COSTTYPE == 3) {
      setLstCostCode(lstMnfr);
    } else if (item.COSTTYPE == 4) {
      setLstCostCode(lstAcObManage);
    } else setLstCostCode([]);
  }, [item]);

  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
  };

  const handleSubmit = () => {
    if (newItem.MNEYCRAM === 0) {
      setOpenNotify(true);
      setContentNotify({ type: "", content: "Chưa nhập Số tiền" });
      return;
    }
    if (newItem.MNEYCRAM !== 0) {
      onSubmit(newItem);
    }
  };

  useEffect(() => {
    let ParaBusnSpend =
      "'" +
      newItem.RFRNDCMN +
      "', '" +
      moment(new Date()).format("YYYY-MM-DD") +
      "'";
    dispatch(getLstBusnSpend(ParaBusnSpend));
  }, [newItem.RFRNDCMN]);

  return (
    <>
      <Dialog
        title={"Phiếu đề nghị thanh toán"}
        onClose={onCancelEdit}
        minWidth={320}
        width={widthResize}
      >
        {/* Nghiep vu lien quan & Ma Chi phi */}
        <div className="flex md:flex-row flex-col content-center-ems gap-4">
          {/* Nhóm tùy chọn detail 2 - Mã nhóm: 32 */}
          {/* Nghiep vu lien quan */}
          <div className="lg:w-1/3 w-full">
            {DcmnView.find((x) => x.DATACODE === "32").DATAVIEW > 0 && (
              <FieldEditCombobox
                name={"RFRNDCMN"}
                id="RFRNDCMN"
                title={getLabelValue(223, "Nghiệp vụ liên quan")}
                data={lstAcctDcmn}
                textField="ItemName"
                dataItemKey="ItemCode"
                value={
                  lstAcctDcmn
                    ? newItem.RFRNDCMN !== "" &&
                      newItem.RFRNDCMN !== undefined &&
                      newItem.RFRNDCMN !== null
                      ? lstAcctDcmn.find(
                          (i) => i.ItemCode === newItem?.RFRNDCMN
                        )
                      : {}
                    : {}
                }
                defaultValue={
                  lstAcctDcmn
                    ? newItem.RFRNDCMN !== "" &&
                      newItem.RFRNDCMN !== undefined &&
                      newItem.RFRNDCMN !== null
                      ? lstAcctDcmn.find(
                          (i) => i.ItemCode === newItem?.RFRNDCMN
                        )
                      : {}
                    : {}
                }
                filterable={true}
                onChange={(e) => {
                  setNewItem({ ...newItem, RFRNDCMN: e.value.ItemCode });
                }}
              />
            )}
          </div>

          {/* Nhóm tùy chọn detail 2 - Mã nhóm: 32 */}
          {/* Ma Chi phi */}
          <div className="lg:w-1/3 w-full">
            {DcmnView.find((x) => x.DATACODE === "32").DATAVIEW > 0 && (
              <div>
                {/* Ma chi phi */}
                <FieldEditCombobox
                  name={"SPNDCODE"}
                  id="SPNDCODE"
                  title={getLabelValue(222, "Mã chi phí")}
                  data={lstBusnSpend}
                  textField={"ItemName"}
                  dataItemKey={"ItemCode"}
                  filterable={true}
                  onChange={(e) => {
                    setNewItem({ ...newItem, SPNDCODE: e.value.ItemCode });
                  }}
                  defaultValue={
                    newItem && lstBusnSpend && lstBusnSpend.length > 0
                      ? lstBusnSpend.find(
                          (item) => item.ItemCode === newItem?.SPNDCODE
                        )
                      : {}
                  }
                  value={
                    newItem && lstBusnSpend && lstBusnSpend.length > 0
                      ? lstBusnSpend.find(
                          (item) => item.ItemCode === newItem?.SPNDCODE
                        )
                      : {}
                  }
                />
              </div>
            )}
          </div>

          <div className="lg:w-1/3 w-full"></div>
        </div>

        <div className="flex md:flex-row flex-col content-center-ems gap-4">
          {/* Số CT/ Hóa đơn */}
          <div className="lg:w-1/3 w-full">
            <FieldEditInput
              name={"RFRNCODE"}
              id="RFRNCODE"
              title={getLabelValue(221, "Số CT/ Hóa đơn")}
              defaultValue={newItem?.RFRNCODE}
              value={newItem?.RFRNCODE}
              onChange={(e) => setNewItem({ ...newItem, RFRNCODE: e.value })}
            />
          </div>

          {/* Ngày CT/Hóa đơn */}
          <div className="lg:w-1/3 w-full">
            <FieldEditDatePicker
              name="RFRNDATE"
              id="RFRNDATE"
              title={getLabelValue(220, "Ngày CT/Hóa đơn")}
              format="dd/MM/yyyy"
              defaultValue={
                newItem?.RFRNDATE ? new Date(newItem?.RFRNDATE) : new Date()
              }
              value={
                newItem?.RFRNDATE ? new Date(newItem?.RFRNDATE) : new Date()
              }
              onChange={(e) => {
                setNewItem({
                  ...newItem,
                  RFRNDATE: moment(e.value).format("YYYY-MM-DD"),
                });
              }}
            />
          </div>

          {/* So tien */}
          <div className="lg:w-1/3 w-full">
            <FieldEditNumberic
              name="MNEYCRAM"
              id="MNEYCRAM"
              title={getLabelValue(174, "Số tiền")}
              defaultValue={newItem.MNEYCRAM}
              value={newItem.MNEYCRAM}
              onChange={(e) => {
                setNewItem({ ...newItem, MNEYCRAM: e.value });
              }}
            />
          </div>
        </div>

        {/* Noi dung thanh toan */}
        <div className="flex md:flex-row flex-col content-center-ems gap-4">
          <div className="w-full">
            <FieldEditTextArea
              name="MEXLNNTE_D"
              id="MEXLNNTE_D"
              defaultValuevalue={newItem?.MEXLNNTE_D}
              value={newItem?.MEXLNNTE_D}
              title={getLabelValue(219, "Nội dung thanh toán")}
              onChange={(e) => {
                setNewItem({ ...newItem, MEXLNNTE_D: e.value });
              }}
            />
          </div>
        </div>

        {/* Nhóm tùy chọn detail 6 - Mã nhóm: 36 */}
        {/* CostType va CostCode */}
        <div className="flex md:flex-row flex-col content-center-ems gap-4">
          {/* CostType */}
          <div className="lg:w-1/3 w-full">
            {DcmnView.find((x) => x.DATACODE === "36").DATAVIEW > 0 && (
              <FieldEditDropdown
                id="COSTTYPE"
                name="COSTTYPE"
                title={getLabelValue(225, "Đối tượng chi phí 1")}
                data={lstCostTypeACC}
                textField={"ITEMNAME"}
                dataItemKey={"ITEMCODE"}
                onChange={CostTypeChgeHanlder}
                defaultValue={
                  newItem && lstCostTypeACC && lstCostTypeACC.length > 0
                    ? lstCostTypeACC.find(
                        (item) => parseInt(item.ITEMCODE) === newItem?.COSTTYPE
                      )
                    : {}
                }
                value={
                  newItem && lstCostTypeACC && lstCostTypeACC.length > 0
                    ? lstCostTypeACC.find(
                        (item) => parseInt(item.ITEMCODE) === newItem?.COSTTYPE
                      )
                    : {}
                }
              />
            )}
          </div>

          {/* CostCode  */}
          <div className="lg:w-1/3 w-full">
            {DcmnView.find((x) => x.DATACODE === "36").DATAVIEW > 0 && (
              <FieldEditCombobox
                id="COSTCODE"
                name="COSTCODE"
                title={getLabelValue(226, "Tên đối tượng chi phí 1")}
                data={lstCostCode}
                textField={"ITEMNAME"}
                dataItemKey={"ITEMCODE"}
                onChange={(e) =>
                  setNewItem({ ...newItem, COSTCODE: e.value.ITEMCODE })
                }
                defaultValue={
                  newItem && lstCostCode && lstCostCode.length > 0
                    ? lstCostCode.find(
                        (item) => item.ITEMCODE === newItem?.COSTCODE
                      )
                    : {}
                }
                value={
                  newItem && lstCostCode && lstCostCode.length > 0
                    ? lstCostCode.find(
                        (item) => item.ITEMCODE === newItem?.COSTCODE
                      )
                    : {}
                }
              />
            )}
          </div>

          <div className="lg:w-1/3 w-full"></div>
        </div>

        {/* Button */}
        <div className="flex items-center justify-end">
          <Button
            className="m-1"
            type={"submit"}
            themeColor={"primary"}
            onClick={handleSubmit}
            icon="save"
            svgIcon={saveIcon}
          >
            LƯU
          </Button>
          <Button
            className="m-1"
            onClick={onCancelEdit}
            icon="cancel"
            svgIcon={cancelIcon}
          >
            HỦY
          </Button>
        </div>
      </Dialog>

      {/* Dialog hien thông bao */}
      {openNotify && (
        <DialogNotify item={contentNotify} cancelNotify={CancelNotifyHandler} />
      )}
    </>
  );
};

export default EditForm;
