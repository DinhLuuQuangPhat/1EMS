import React from "react";
import FieldEditDatePicker from "../FieldEditDatePicker";

const cellDatePicker = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? 0 : dataItem[field];

  const permission = dataItem.permission ? dataItem.permission : false;

  return (
    <td>
      <FieldEditDatePicker
        value={dataValue ? new Date(dataValue) : new Date()}
        onChange={(e) => {
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          });
        }}
        format={"dd/MM/yyyy"}
        disabled={!permission}
      />
    </td>
  );
};

export default cellDatePicker;
