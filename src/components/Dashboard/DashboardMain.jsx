import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "@progress/kendo-react-buttons";
import { chartLineStackedMarkersIcon } from "@progress/kendo-svg-icons";
import { useStateContext } from "../../context/ContextProvider";
import DialogChartEdit from "./DialogChartEdit";
import {
  FieldEditCombobox,
  FieldEditDropdown,
  FieldEditDatePicker,
  FieldEditNumberic,
  FieldEditMultiSelect,
} from "../";
import { useSelector, useDispatch } from "react-redux";
import { getLstDataObjc, getLstTimeCode } from "../../actions/chart";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { Label } from "@progress/kendo-react-labels";

const DashboardMain = () => {
  const { getLabelValue } = useStateContext();

  const initChart = {
    LCTNCODE: "001",
    DSBRTYPE: "1", // Loai bao bieu
    TIMEDSBR: 1, // Thio gian lay du lieu
    BEG_DATE: moment(new Date()).format("YYYY/MM/DD"),
    END_DATE: moment(new Date()).format("YYYY/MM/DD"),
    INDCLIST: "", // Chi tieu
    OBJCLIST: "", // Doi tuong
    TIMECODE: 128, // Chu kỳ
    ADD_DATA: 0, // Tuy chon bo sung
    DISPINDC: 1, // Sap xep Chi tieu
    DISPTIME: 1, // Sap xem Chu ky
    CMPRNUMB: 0, // So voi cung ky
    OBJCFLTR: "", // Doi tuong can loc du lieu
    TOP_NUMB: 0, // So luong Top
    TOP_TYPE: 1, // Loại Top
    RATEEXCH: 1000, // Ty le quy doi
    UOM_NAME: "VND", // Don vi tinh
    DCMKNUMB: 0, // Lam tron so le

    // Field Tam dung cho Xu ly Doi tuong chi tiet
    OBJCLISTArrayList: [], //Array of Object cua List Code [{"WrhsCode": "lstWarehouse"}, {"EmplCode": "listEmployee"}, ...]
    OBJCLISTArray: [], // Array of object cua OBJCLIST dung cho ListBox [{"itemcode":"001", "itemname":"name1", "listcode"}, {"itemcode":"002", "itemname":"name2"}]
    OBJCLISTArrayObjc: [], // Array of Object co thong tin STT dua vao OBJCLISTArrayList de sau nay xu ly day vao OBJCFLTR [{"WrhsCode": []}, {"EmplCode": []}]
    OBJCLISTStringList: "", // String ItemCode tam thoi truoc khi sap xep lai va update vao OBJCLIST

    OBJCFLTRArray: [], // Array Doi tuong can loc du lieu tam
  };
  const [jsonChart, setJsonChart] = useState(initChart);

  const [openChartInfo, setOpenChartInfo] = useState(false);
  const AddChartHandler = () => {
    setOpenChartInfo(true);
  };
  const CancelChartEditHandler = () => {
    setOpenChartInfo(false);
  };
  const SubmitChartEditHandler = () => {
    setOpenChartInfo(false);
  };

  const dispatch = useDispatch();
  const lstLocation = useSelector((state) => state.common.lstLocation);
  const lstBaseIndc = useSelector((state) => state.Chart.lstBaseIndc);
  const lstDataObjc = useSelector((state) => state.Chart.lstDataObjc);
  const lstTimeDsbr = useSelector((state) => state.Chart.lstTimeDsbr);
  const lstDsbrType = useSelector((state) => state.Chart.lstDsbrType);
  const lstDispIndc = useSelector((state) => state.Chart.lstDispIndc);
  const lstDispTime = useSelector((state) => state.Chart.lstDispTime);
  const lstTop_Type = useSelector((state) => state.Chart.lstTop_Type);
  const lstCol_Ctgr = useSelector((state) => state.Chart.lstCol_Ctgr);
  const lstChartType = useSelector((state) => state.Chart.lstChartType);
  const lstAdd_Data = useSelector((state) => state.Chart.lstAdd_Data);

  const [editDate, setEditDate] = useState(false);
  useEffect(() => {
    if (jsonChart.TIMEDSBR == 1) {
      setEditDate(true);
    } else {
      setEditDate(false);
    }
  }, [jsonChart.TIMEDSBR]);

  const [listDataObjc, setListDataObjc] = useState([]);
  useEffect(() => {
    setListDataObjc(lstDataObjc);
  }, [lstDataObjc]);

  return (
    <>
      <div className="w-full">
        <Button
          className="buttons-container-button"
          svgIcon={chartLineStackedMarkersIcon}
          onClick={AddChartHandler}
          size="small"
        >
          {getLabelValue(14, "Thêm mới")}
        </Button>
      </div>

      {openChartInfo && (
        <DialogChartEdit
          jsonChart={jsonChart}
          setJsonChart={setJsonChart}
          onCancel={CancelChartEditHandler}
          onSubmit={SubmitChartEditHandler}
        />
      )}
    </>
  );
};

export default DashboardMain;
