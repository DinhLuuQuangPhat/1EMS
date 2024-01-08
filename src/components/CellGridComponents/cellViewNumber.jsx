import React from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";

const cellViewNumber = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? 0 : dataItem[field];

  const ChckDigit = dataValue.toString().split(".");
  let DigitLength = 0;
  if (ChckDigit[1]) {
    DigitLength = ChckDigit[1].length;
  }

  let formatType = "n" + DigitLength;

  return (
    <td>
      <NumericTextBox
        defaultValue={dataValue}
        value={dataValue}
        format={formatType}
        min={0}
        step={1}
        className="numberic-right"
        readOnly={true}
      />
    </td>
  );
};

export default cellViewNumber;
