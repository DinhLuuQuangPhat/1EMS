import React, { useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const CustomDateFilterCell = (props) => {
  return (
    <div>
      <DatePicker
        value={props.value}
        onChange={(e) => props.onChange({ value: e.value })}
        format="dd/MM/yyyy"
      />
    </div>
  );
};

const Test = () => {
  const [data, setData] = useState([
    { id: 1, date: new Date("2023-10-01") },
    { id: 2, date: new Date("2023-11-01") },
    { id: 3, date: new Date(2023, 2, 5) },
  ]);

  const handleDataStateChange = (event) => {
    if (event.dataState.filter) {
      const filteredData = data.filter(
        (item) => item.date >= event.dataState.filter.filters[0].value
      );
      setData(filteredData);
    }
  };

  const dateFormatter = (field, format) => {
    return (props) => {
      const date = props.dataItem[field];
      return date
        ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date)
        : "";
    };
  };

  return (
    <Grid data={data} filterable onDataStateChange={handleDataStateChange}>
      <GridColumn field="id" title="ID" />
      <GridColumn
        field="date"
        title="Date"
        filter="date"
        filterCell={CustomDateFilterCell}
        cell={dateFormatter("date")}
      />
    </Grid>
  );
};

export default Test;
