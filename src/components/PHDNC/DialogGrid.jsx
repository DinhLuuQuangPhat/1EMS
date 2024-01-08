import React, { useEffect } from "react";
import {
  Grid,
  GridColumn as Column,
  getSelectedState,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";
const DATA_ITEM_KEY = "KKKK0000";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);
import { useStateContext } from "../../context/ContextProvider";
import { cellViewDate, cellNumberic } from "../";

const DialogGrid = (props) => {
  const { getLabelValue } = useStateContext();

  const { dataItem, onSelectedItem } = props;
  const [dataState, setDataState] = React.useState(
    dataItem.map((item) =>
      Object.assign(
        {
          selected: false,
        },
        item
      )
    )
  );
  const [selectedState, setSelectedState] = React.useState({});
  const onSelectionChange = React.useCallback(
    (event) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState]
  );

  const RowClickHandler = (event) => {
    onSelectedItem(event.dataItem);
  };

  return (
    <Grid
      data={dataState?.map((item) => ({
        ...item,
        [SELECTED_FIELD]: selectedState[idGetter(item)],
      }))}
      style={{
        height: "400px",
      }}
      dataItemKey={DATA_ITEM_KEY}
      selectedField={SELECTED_FIELD}
      selectable={{
        enabled: true,
        drag: false,
        cell: false,
        mode: "single",
      }}
      onSelectionChange={onSelectionChange}
      onRowClick={RowClickHandler}
    >
      <GridNoRecords>{getLabelValue(71, "Không có dữ liệu")}</GridNoRecords>
      <Column
        field={SELECTED_FIELD}
        width="50px"
        headerSelectionValue={
          dataState.findIndex((item) => !selectedState[idGetter(item)]) === -1
        }
      />
      <Column
        field="MainDate"
        title={getLabelValue(227, "Ngày ct")}
        width="120px"
        cell={cellViewDate}
      />
      <Column
        field="MainCode"
        title={getLabelValue(228, "Số ct")}
        width="150px"
      />
      <Column
        field="Sum_CrAm"
        title={getLabelValue(146, "Tiền tạm ứng")}
        width="180px"
        cell={cellNumberic}
      />
      <Column
        field="Pay_CrAm"
        title={getLabelValue(231, "Số tiền đã tt")}
        width="180px"
        cell={cellNumberic}
      />
      <Column
        field="RemnCrAm"
        title={getLabelValue(230, "Số tiền còn lại")}
        width="180px"
        cell={cellNumberic}
      />
      <Column
        field="ObjcCode"
        title={getLabelValue(229, "Mã đối tượng")}
        width="120px"
      />
      <Column
        field="ObRfName"
        title={getLabelValue(145, "Tên đối tượng")}
        width="450px"
      />
    </Grid>
  );
};

export default DialogGrid;
