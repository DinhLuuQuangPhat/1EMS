import React, { useState } from "react";
import { TextArea } from "@progress/kendo-react-inputs";
const cellTextArea = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const [dataValue, setDataValue] = useState(
    dataItem[field] === null ? 0 : dataItem[field]
  );

  const permission = dataItem.permission ? dataItem.permission : false;
  return (
    <td>
      <TextArea
        value={dataValue ? dataValue : ""}
        onChange={(e) => {
          setDataValue(e.value);
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          });
        }}
        rows={2}
        size="small"
        autoSize={false}
        readOnly={!permission}
      />
    </td>
  );
};

export default cellTextArea;
