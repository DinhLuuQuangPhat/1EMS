import React from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";

const cellQtty = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? 0 : dataItem[field];

  return (
    <td>
      <NumericTextBox
        defaultValue={dataValue}
        value={dataValue}
        onChange={(e) =>
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          })
        }
        format='n4'
        min={0}
        className='numberic-right'
      />
    </td>
  );
};

export default cellQtty;
