import React from "react";
import { MaskedTextBox } from "@progress/kendo-react-inputs";

const cellViewMask = (props) => {
  const { dataItem } = props;
  const Field = props.field;
  const dataValue = dataItem[Field] === null ? 0 : dataItem[Field];

  return (
    <td>
      <MaskedTextBox
        mask="000,000,000,000.0000"
        defaultValue={dataValue}
        value={dataValue}
        readonly={true}
        className="numberic-right"
      />
    </td>
  );
};

export default cellViewMask;
