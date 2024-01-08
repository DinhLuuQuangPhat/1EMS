import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import moment from "moment";
import { useStateContext } from "../../context/ContextProvider";

const cellMainDate = (cell) => {
  const { dataItem } = cell;
  const MainDateNew = moment(dataItem.PRCSDATE).format("DD-MM-YYYY HH:mm:ss");

  return <td>{MainDateNew}</td>;
};

const AprvDcmnProcedureGrid = (props) => {
  const { getLabelValue } = useStateContext();
  const { dataitems } = props;

  return (
    <Grid data={dataitems}>
      <GridColumn
        field="EMPCNAME"
        title={getLabelValue(177, "Đối tượng thực hiện")}
        width="350px"
      />
      <GridColumn
        field="PRCSNAME"
        title={getLabelValue(176, "Loại xét duyệt")}
        width="250px"
      />
      <GridColumn
        field="PRCSDATE"
        cell={cellMainDate}
        title={getLabelValue(179, "Thực hiện lúc")}
        width="200px"
      />
      <GridColumn field="PRCSNOTE" title={getLabelValue(128, "Ghi chú")} />
    </Grid>
  );
};

export default AprvDcmnProcedureGrid;
