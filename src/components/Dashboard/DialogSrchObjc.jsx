import React, { useState, useEffect, useLayoutEffect } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Grid, GridColumn, getSelectedState } from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";
const DATA_ITEM_KEY = "ITEMCODE";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);
import { useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";

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

function getKeyByValue(object, value) {
  return Object.keys(object).filter((key) => object[key] === value);
}

const DialogSrchObjc = ({
  jsonChart,
  setJsonChart,
  onCancelSrchObjc,
  onSubmitSrchObjc,
}) => {
  const widthResize = useWindowSize();
  const { getLabelValue } = useStateContext();

  const lstDetlObjc = useSelector((state) => state.Chart.lstDetlObjc);
  useEffect(() => {
    setListDetlObjc(
      lstDetlObjc.map((dataItem) =>
        Object.assign(
          {
            selected: false,
          },
          dataItem
        )
      )
    );
  }, [lstDetlObjc]);
  const [listDetlObjc, setListDetlObjc] = useState([]);

  const [selectedState, setSelectedState] = useState({});
  const onSelectionChange = (event) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);

    const ListDataObjc = getKeyByValue(newSelectedState, true);
    const stringDataObjc = ListDataObjc.map((i) => i).join(",");

    //Lay mã ListCode đang chọn ra
    var ListCodeCurrent = "";
    if (lstDetlObjc !== "" && Array.isArray(lstDetlObjc)) {
      ListCodeCurrent = lstDetlObjc[0].LISTCODE;
    }

    //Remove item theo ListCode current đang có trong jsonChart OBJCFLTRArray
    const newOBJCFLTRArray = jsonChart.OBJCFLTRArray.filter(
      (detail) => detail.LISTCODE !== ListCodeCurrent
    );

    // Insert lại item moi
    const newData = lstDetlObjc.filter((item) =>
      stringDataObjc.split(",").includes(item.ITEMCODE)
    );

    // Hợp dữ liệu OBJCFLTRArray và newData
    const newnewOBJCFLTRArray = [...newOBJCFLTRArray, ...newData];

    setJsonChart({ ...jsonChart, OBJCFLTRArray: newnewOBJCFLTRArray });
  };

  return (
    <Dialog
      title={getLabelValue(244, "Thông tin lấy dữ liệu")}
      onClose={onCancelSrchObjc}
      minWidth={320}
      height={450}
      width={widthResize}
    >
      <div className="search-detl-objc">
        <Grid
          data={
            listDetlObjc
              ? listDetlObjc.map((item) => ({
                  ...item,
                  [SELECTED_FIELD]: selectedState[idGetter(item)],
                }))
              : []
          }
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          selectable={{
            enabled: true,
          }}
          onSelectionChange={onSelectionChange}
        >
          <GridColumn field="ITEMCODE" title="ITEMCODE" />
          <GridColumn field="ITEMNAME" title="ITEMNAME" />
        </Grid>
      </div>

      <DialogActionsBar layout="center">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={onSubmitSrchObjc}
        >
          {getLabelValue(168, "Chọn")}
        </button>

        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={onCancelSrchObjc}
        >
          {getLabelValue(84, "Đóng")}
        </button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default DialogSrchObjc;
