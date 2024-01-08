import React, { useEffect, useState } from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";

const cellNumberic = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? 0 : dataItem[field];
  const permission = dataItem.permission ? dataItem.permission : false;

  const [formatNumb, setFormatNumb] = useState("");
  useEffect(() => {
    if (!permission) {
      // Khong cho chinh sua
      const ChckDigit = dataValue.toString().split(".");

      let DigitLength = 0;
      if (ChckDigit[1] !== undefined) {
        DigitLength = ChckDigit[1].length;
      } else {
        DigitLength = 0;
      }

      let formatType = "n" + DigitLength.toString();
      setFormatNumb(formatType);
    }
    if (permission) {
      // Cho phep chinh sua
      setFormatNumb("n4");
    }
  }, [permission]);

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
        format={formatNumb}
        min={0}
        className={`numberic-right numb-${
          permission == true ? "edit" : "view"
        }`}
        readOnly={!permission}
      />
    </td>
  );
};

export default cellNumberic;
