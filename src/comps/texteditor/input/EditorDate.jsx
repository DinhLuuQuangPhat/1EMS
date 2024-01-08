import styled from "styled-components";
import {
  DatePicker,
  MultiViewCalendar,
} from "@progress/kendo-react-dateinputs";
import React, { useEffect, useMemo, useState } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import moment from "moment";
import { useTextEditorContext } from "../context/TextEditorProvider";

export const CustomCalendar = (props) => {
  return <MultiViewCalendar {...props} views={1} />;
};

export default function EditorDate(props) {
  const { values } = useTextEditorContext();

  const labelDisplay = useMemo(() => {
    const _value = values[props.name];
    return _value ? moment(_value).format("DD-MM-YYYY") : "";
  }, [values, props.name]);

  return (
    <EditorAttachFileStyle className={"editor-review-comp input-date"}>
      {labelDisplay}
    </EditorAttachFileStyle>
  );
}

const EditorAttachFileStyle = styled.span``;

export function EditorDateCompose(props) {
  const { appColors } = useStateContext();
  const { values, onChange } = useTextEditorContext();

  const [date, setDate] = useState(undefined);

  useEffect(() => {
    const val = values[props.name];
    if (val) {
      setDate(val);
    }
  }, [values, props.name]);

  return (
    <ComposeStyle>
      <DatePicker
        placeholder={props.placeholder}
        name={props.name}
        value={date ? new Date(date) : new Date()}
        onChange={(e) => onChange(props.name, e.target.value)}
        format="dd/MM/yyyy"
        className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
        calendar={CustomCalendar}
      />
    </ComposeStyle>
  );
}

const ComposeStyle = styled.div`
  display: inline-flex;
`;
