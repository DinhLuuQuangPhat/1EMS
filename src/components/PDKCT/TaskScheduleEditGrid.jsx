import React from "react";
import { Grid, GridColumn, GridNoRecords } from "@progress/kendo-react-grid";
import { useStateContext } from "../../context/ContextProvider";
import { cellDatePicker, CellButton } from "..";
import { CellBussinessPlace, CellBussinessType } from "./CustomCell";

const TaskScheduleEditGrid = ({
  items,
  onRemoveItem,
  onEditItem,
  permissions,
}) => {
  const { getLabelValue } = useStateContext();

  const enterEdit = (item) => {
    onEditItem(item);
  };
  const enterRemove = (item) => {
    onRemoveItem(item);
  };
  const MyEditCommandCell = (props) => (
    <CellButton {...props} enterEdit={enterEdit} enterRemove={enterRemove} />
  );

  return (
    <Grid data={items} dataItemKey={"KKKK0001"} style={{ height: "100%" }}>
      <GridNoRecords>
        <p className="text-red-700 italic">
          {getLabelValue(71, "Không có dữ liệu")}
        </p>
      </GridNoRecords>
      <GridColumn
        field="FRLVDATE"
        title={"Từ ngày"}
        width="180px"
        cell={cellDatePicker}
      />
      <GridColumn
        field="TOLVDATE"
        title={"Đến ngày"}
        width="180px"
        cell={cellDatePicker}
      />
      <GridColumn
        title={"Nơi công tác"}
        field="WORKPLAC"
        cell={CellBussinessPlace}
      />
      <GridColumn
        title={"Loại chấm công sáng"}
        field="TIMEMORN"
        cell={CellBussinessType}
      />
      <GridColumn
        title={"Loại chấm công chiều"}
        field="TIMEAFTR"
        cell={CellBussinessType}
      />
      <GridColumn
        title={"Loại chấm công tối"}
        field="TIMEEVEN"
        cell={CellBussinessType}
      />
      <GridColumn title={"Số ngày"} field="SUMLVDT" width="150px" />

      {permissions && (
        <GridColumn
          cell={MyEditCommandCell}
          width="120px"
          title={"Chức năng"}
        />
      )}
    </Grid>
  );
};

export default TaskScheduleEditGrid;
