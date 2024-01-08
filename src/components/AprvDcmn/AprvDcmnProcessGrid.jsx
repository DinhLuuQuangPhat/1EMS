import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useStateContext } from "../../context/ContextProvider";

const AprvDcmnProcessGrid = (props) => {
  const { getLabelValue } = useStateContext();

  const { dataitems } = props;

  return (
    <Grid data={dataitems}>
      <GridColumn
        field="PRCSODER"
        title={getLabelValue(175, "Thứ tự")}
        width="120px"
      />
      <GridColumn
        field="FLOWNAME"
        title={getLabelValue(176, "Loại xét duyệt")}
        width="230px"
      />
      <GridColumn
        field="EMPLNAME"
        title={getLabelValue(177, "Đối tượng thực hiện")}
      />
      <GridColumn
        field="RULENAME"
        title={getLabelValue(178, "Thời gian chờ ")}
      />
    </Grid>
  );
};

export default AprvDcmnProcessGrid;
