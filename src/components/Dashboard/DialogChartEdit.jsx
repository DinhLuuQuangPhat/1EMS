import React, { useState, useEffect, useLayoutEffect } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
  FieldEditCombobox,
  FieldEditDropdown,
  FieldEditDatePicker,
  FieldEditNumberic,
  FieldEditMultiSelect,
} from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getLstDataObjc,
  getLstDetlObjc,
  getLstTimeCode,
  getLstSameTime,
} from "../../actions/chart";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { Label } from "@progress/kendo-react-labels";
import { ListBox } from "@progress/kendo-react-listbox";
import { Button } from "@progress/kendo-react-buttons";
import DialogSrchObjc from "./DialogSrchObjc";

function useWindowSize() {
  const [size, setSize] = useState(1024);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1023) {
        setSize(1024);
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
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const DialogChartEdit = ({ jsonChart, setJsonChart, onCancel, onSubmit }) => {
  const { getLabelValue } = useStateContext();
  const widthResize = useWindowSize();

  const dispatch = useDispatch();
  const lstLocation = useSelector((state) => state.common.lstLocation);
  const lstBaseIndc = useSelector((state) => state.Chart.lstBaseIndc);
  const lstTimeDsbr = useSelector((state) => state.Chart.lstTimeDsbr);
  const lstDsbrType = useSelector((state) => state.Chart.lstDsbrType);
  const lstDispIndc = useSelector((state) => state.Chart.lstDispIndc);
  const lstDispTime = useSelector((state) => state.Chart.lstDispTime);
  const lstTop_Type = useSelector((state) => state.Chart.lstTop_Type);
  const lstCol_Ctgr = useSelector((state) => state.Chart.lstCol_Ctgr);
  const lstChartType = useSelector((state) => state.Chart.lstChartType);
  const lstAdd_Data = useSelector((state) => state.Chart.lstAdd_Data);

  const lstDataObjc = useSelector((state) => state.Chart.lstDataObjc);
  const [listDataObjc, setListDataObjc] = useState([]);
  useEffect(() => {
    setListDataObjc(lstDataObjc);
  }, [lstDataObjc]);

  const [editDate, setEditDate] = useState(false);
  useEffect(() => {
    if (jsonChart.TIMEDSBR == 1) {
      setEditDate(true);
    } else {
      setEditDate(false);
    }
  }, [jsonChart.TIMEDSBR]);

  const [listIndcData, setListIndcData] = useState([]);
  const [listObjcData, setListObjcData] = useState([]);

  const [openSrchObjc, setOpenSrchObjc] = useState(false);
  const [haveListCode, setHaveListCode] = useState(false);
  const ObjcDataSelectedHandler = (data) => {
    setOpenSrchObjc(true);
    if (data.dataItem.ITEMATTR !== "") {
      dispatch(getLstDetlObjc(data.dataItem.ITEMATTR));
      setHaveListCode(true);
    } else {
      setHaveListCode(false);
    }
  };
  const CancelSrchObjcHandler = () => {
    setOpenSrchObjc(false);
  };
  const SubmitSrchObjcHandler = () => {
    setOpenSrchObjc(false);
  };

  const lstDetlObjc = useSelector((state) => state.Chart.lstDetlObjc);
  const lstTimeCode = useSelector((state) => state.Chart.lstTimeCode);

  const ObjcListChgeHandler = (e) => {
    var OBJCLISTArrayList = [];
    for (let item of e.value) {
      OBJCLISTArrayList.push({ [item["ITEMTREE"]]: item["ITEMATTR"] });
    }

    var listItem = [];
    e.value.map((item) => listItem.push(item.ITEMCODE));
    setJsonChart({
      ...jsonChart,
      OBJCLISTArrayList: OBJCLISTArrayList,
      OBJCLISTArray: e.value,
      OBJCLISTStringList: listItem.join(),
    });
  };

  return (
    <>
      <Dialog
        title={getLabelValue(244, "Thông tin lấy dữ liệu")}
        onClose={onCancel}
        minWidth={320}
        width={widthResize}
      >
        <div className="Chart-info md:h-auto h-80 overflow-y-scroll">
          <div className="grid grid-rows-1">
            {/* Chi nhanh & Thoi gian */}
            <div className="grid grid-cols-12 gap-3 mb-3">
              {/* Chi nhanh */}
              <div className="col-span-full col-start-1 sm:col-span-full sm:col-start-1 md:col-span-5 md:col-start-1">
                <FieldEditDropdown
                  id="LCTNCODE"
                  name="LCTNCODE"
                  title={getLabelValue(173, "Chi nhánh")}
                  data={lstLocation}
                  textField="ITEMNAME"
                  dataItemKey="ITEMCODE"
                  value={
                    lstLocation
                      ? lstLocation.find(
                          (item) => item.ITEMCODE === jsonChart?.LCTNCODE
                        )
                      : {}
                  }
                  defaultValue={
                    lstLocation
                      ? lstLocation.find(
                          (item) => item.ITEMCODE === jsonChart?.LCTNCODE
                        )
                      : {}
                  }
                  onChange={(e) =>
                    setJsonChart({ ...jsonChart, LCTNCODE: e.value.ITEMCODE })
                  }
                />
              </div>

              {/* Thoi gian */}
              <div className="col-span-full col-start-1 sm:col-span-6 sm:col-start-1 md:col-span-3 md:col-start-6">
                <FieldEditDropdown
                  id="TIMEDSBR"
                  name="TIMEDSBR"
                  title={getLabelValue(245, "Thời gian")}
                  data={lstTimeDsbr}
                  textField="ITEMNAME"
                  dataItemKey="ITEMCODE"
                  value={
                    lstTimeDsbr
                      ? lstTimeDsbr.find(
                          (item) =>
                            item.ITEMCODE == jsonChart?.TIMEDSBR.toString()
                        )
                      : {}
                  }
                  defaultValue={
                    lstTimeDsbr
                      ? lstTimeDsbr.find(
                          (item) =>
                            item.ITEMCODE == jsonChart?.TIMEDSBR.toString()
                        )
                      : {}
                  }
                  onChange={(e) =>
                    setJsonChart({
                      ...jsonChart,
                      TIMEDSBR: parseInt(e.value.ITEMCODE),
                    })
                  }
                />
              </div>
              {/* Tu ngay & Den ngay*/}
              <div className="col-span-full col-start-1 sm:col-span-6 sm:col-start-7 md:col-span-4 md:col-start-9">
                <div className="grid grid-cols-2 gap-2">
                  {/* Tu ngay */}
                  <FieldEditDatePicker
                    id="BEG_DATE"
                    name="BEG_DATE"
                    title={getLabelValue(239, "Từ ngày")}
                    format={"dd/MM/yyyy"}
                    value={new Date(jsonChart?.BEG_DATE)}
                    defaultValue={new Date(jsonChart?.BEG_DATE)}
                    onChange={(e) =>
                      setJsonChart({
                        ...jsonChart,
                        BEG_DATE: moment(e.value).format("YYYY/MM/DD"),
                      })
                    }
                    disabled={!editDate}
                  />

                  {/* Den ngay */}
                  <FieldEditDatePicker
                    id="END_DATE"
                    name="END_DATE"
                    title={getLabelValue(239, "Từ ngày")}
                    format={"dd/MM/yyyy"}
                    value={new Date(jsonChart?.END_DATE)}
                    defaultValue={new Date(jsonChart?.END_DATE)}
                    onChange={(e) =>
                      setJsonChart({
                        ...jsonChart,
                        END_DATE: moment(e.value).format("YYYY/MM/DD"),
                      })
                    }
                    disabled={!editDate}
                  />
                </div>
              </div>
            </div>

            {/* Chi tieu & Loai Doi tuong & Doi tuong & Chu ky */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 mb-3">
              {/* Chi tieu */}
              <div className="w-full">
                <Label>{getLabelValue(246, "Chỉ tiêu")}</Label>
                <div className="mb-1">
                  <MultiSelect
                    className="nonewrap"
                    id="INDCLIST"
                    name="INDCLIST"
                    data={lstBaseIndc}
                    textField="ITEMNAME"
                    dataItemKey="ITEMCODE"
                    autoClose={false}
                    defaultValue={
                      lstBaseIndc
                        ? lstBaseIndc.filter((item) =>
                            jsonChart?.INDCLIST?.split(",").includes(
                              item.ITEMCODE
                            )
                          )
                        : []
                    }
                    onChange={(e) => {
                      var listItem = [];
                      if (e.value.length > 0) {
                        e.value.map((item) => listItem.push(item.ITEMCODE));

                        const IndcList = e.value
                          .map((item) => item.ITEMCODE)
                          .join(", ");

                        if (IndcList !== "") {
                          dispatch(getLstDataObjc(IndcList));
                          dispatch(getLstTimeCode(IndcList));
                          setJsonChart({
                            ...jsonChart,
                            OBJCLIST: "",
                            INDCLIST: listItem.join(),
                          });
                        }

                        setListIndcData(e.value);
                      } else {
                        setJsonChart({
                          ...jsonChart,
                          OBJCLIST: "",
                          INDCLIST: "",
                          OBJCLISTArrayList: [],
                          OBJCLISTArray: [],
                          OBJCLISTArrayObjc: [],
                        });

                        setListIndcData([]);
                        setListObjcData([]);
                      }
                    }}
                  />
                </div>
                <ListBox
                  className="w-full"
                  data={listIndcData}
                  textField="ITEMNAME"
                  dataItemKey="ITEMCODE"
                />
              </div>

              {/* Loai doi tuong */}
              <div className="w-full">
                <Label>{getLabelValue(144, "Loại đối tượng")}</Label>

                <div id="ObjcList">
                  <div className="mb-1">
                    <MultiSelect
                      className="nonewrap"
                      id="OBJCLIST"
                      name="OBJCLIST"
                      data={jsonChart?.INDCLIST ? listDataObjc : []}
                      textField="ITEMNAME"
                      dataItemKey="ITEMCODE"
                      autoClose={false}
                      defaultValue={
                        listDataObjc
                          ? listDataObjc.filter((item) =>
                              jsonChart?.OBJCLISTStringList?.split(
                                ","
                              ).includes(item.ITEMCODE)
                            )
                          : null
                      }
                      value={
                        listDataObjc
                          ? listDataObjc.filter((item) =>
                              jsonChart?.OBJCLISTStringList?.split(
                                ","
                              ).includes(item.ITEMCODE)
                            )
                          : null
                      }
                      onChange={ObjcListChgeHandler}
                    />
                  </div>
                  <ListBox
                    className="w-full"
                    data={jsonChart?.OBJCLISTArray}
                    textField="ITEMNAME"
                    dataItemKey="ITEMCODE"
                    onItemClick={ObjcDataSelectedHandler}
                  />
                </div>
              </div>

              {/* Doi tuong duoc chon */}
              <div className="w-full">
                <Label>{getLabelValue(247, "Đối tượng đã chọn")}</Label>
                <ListBox
                  className="w-full"
                  data={jsonChart?.OBJCFLTRArray}
                  textField="ITEMNAME"
                  dataItemKey="ITEMCODE"
                />
              </div>

              {/* Chu ky */}
              <div className="w-full">
                <Label>{getLabelValue(253, "Chu kỳ")}</Label>
                <ListBox
                  className="w-full"
                  data={lstTimeCode}
                  textField="ITEMNAME"
                  dataItemKey="ITEMCODE"
                />
                <div className="grid grid-cols-2">
                  <div>
                    <span>{getLabelValue(254, "So sánh cùng kỳ")}</span>
                    <FieldEditDropdown />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-full col-start-1 bg-red-300 sm:col-span-full sm:col-start-1 md:col-span-3 md:col-start-1">
                1
              </div>
              <div className="col-span-full col-start-1 bg-cyan-300 sm:col-span-6 sm:col-start-1 md:col-span-4 md:col-start-4">
                2
              </div>
              <div className="col-span-full col-start-1 bg-gray-300 sm:col-span-6 sm:col-start-7 md:col-span-3 md:col-start-8">
                3
              </div>
              <div className="col-span-full col-start-1 bg-green-300 sm:col-span-6 sm:col-start-7 md:col-span-2 md:col-start-11">
                4
              </div>
            </div>
          </div>
        </div>
        <DialogActionsBar layout="center">
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={onSubmit}
          >
            {getLabelValue(243, "Tạo báo biểu")}
          </button>

          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={onCancel}
          >
            {getLabelValue(84, "Đóng")}
          </button>
        </DialogActionsBar>
      </Dialog>

      {openSrchObjc && haveListCode && (
        <DialogSrchObjc
          jsonChart={jsonChart}
          setJsonChart={setJsonChart}
          onCancelSrchObjc={CancelSrchObjcHandler}
          onSubmitSrchObjc={SubmitSrchObjcHandler}
        />
      )}
    </>
  );
};

export default DialogChartEdit;
