import React from "react";
import { Input } from "@progress/kendo-react-inputs";

const cellInput = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  const permission = dataItem.permission ? dataItem.permission : false;

  return (
    <td>
      <Input
        type="text"
        value={dataValue}
        defaultValue={dataValue}
        onChange={(e) =>
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          })
        }
        size="small"
        disabled={!permission}
      />
    </td>
  );
};

export default cellInput;
