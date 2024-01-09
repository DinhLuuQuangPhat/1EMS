import React from "react";
import { Grid, GridColumn, GridNoRecords } from "@progress/kendo-react-grid";
import { useStateContext } from "../../context/ContextProvider";
import { useSelector } from "react-redux";

import {
  cellTimeKeepingType,
  cellDatePicker,
  cellEmployee,
  CellDelButton,
  cellInput,
} from "../../components";

const SwitchShiftEditGrid = ({
  itemChangeField,
  items,
  enterRemove,
  permissions,
}) => {
  const { getLabelValue } = useStateContext();

  const MyEditCommandCell = (props) => (
    <CellDelButton {...props} enterRemove={enterRemove} />
  );

  return (
    <Grid data={items} onItemChange={itemChangeField}>
      {/* Cột nhân viên đi làm  */}
      <GridNoRecords>{getLabelValue(71, "Không có dữ liệu")}</GridNoRecords>
      <GridColumn
        field="EMPLCODE"
        cell={cellEmployee}
        title={getLabelValue(null, "Nhân viên đi làm")}
        width="300"
      />

      {/* Cột nhân viên được chấm công  */}
      <GridColumn
        field="EMPLRLTN"
        cell={cellEmployee}
        title={getLabelValue(null, "Nhân viên được chấm công")}
        width="300"
      />

      {/* Cột từ ngày  */}
      <GridColumn
        field="FRLVDATE"
        title={getLabelValue(239, "Từ ngày")}
        width="140"
        cell={cellDatePicker}
      />

      {/* Cột đến ngày  */}
      <GridColumn
        className="flex items-center justify-center"
        field="TOLVDATE"
        title={getLabelValue(240, "Đến ngày")}
        width="140"
        cell={cellDatePicker}
      />

      {/* Cột sáng */}
      <GridColumn
        field="TIMEMORN"
        title={getLabelValue(190, "Sáng")}
        format="{0:n}"
        width="160"
        cell={cellTimeKeepingType}
      />

      {/* Cột chiều  */}
      <GridColumn
        field="TIMEAFTR"
        title={getLabelValue(191, "Chiều")}
        width="160"
        cell={cellTimeKeepingType}
      />

      {/* Cột tối  */}
      <GridColumn
        field="TIMEEVEN"
        title={getLabelValue(192, "Tối")}
        width="160"
        format="{0:n}"
        cell={cellTimeKeepingType}
      // footerCell={FooterTotalDcPr}
      />

      {/* Cột ghi chú  */}
      <GridColumn
        field="MCONTENT"
        title={getLabelValue(null, "Ghi chú")}
        width="150"
        cell={cellInput}
      />

      {/* Cột chức năng */}
      {permissions && (
        <GridColumn
          cell={MyEditCommandCell}
          title={getLabelValue(70, "Chức năng")}
          width="100"
        />
      )}
    </Grid>
  );
};

export default SwitchShiftEditGrid;
