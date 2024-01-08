import styled from "styled-components";
import {NumericTextBox} from "@progress/kendo-react-inputs";
import React, {useMemo} from "react";
import {useTextEditorContext} from "../context/TextEditorProvider";
import {useStateContext} from "../../../context/ContextProvider";

export default function EditorNumber(props) {
  const {values} = useTextEditorContext();

  const value = useMemo(() => {
    const _value = values[props.name];
    return _value ? _value.replace(/\d(?=(?:\d{3})+$)/g, '$&,') : "";
  }, [values, props.name]);

  return (
    <EditorNumberStyle className={'editor-review-comp input-number'}>
      {value} -- 10000000
    </EditorNumberStyle>
  )
}
export function EditorNumberCompose(props) {
  const {appColors} = useStateContext();
  const {values, onChange} = useTextEditorContext();

  return (
    <ComposeStyle>
      <NumericTextBox
        placeholder={props.placeholder}
        name={props.name}
        value={values[props.name]}
        onChange={(e) => onChange(props.name, e.target.value)}

        style={{borderColor: "grey", textAlign: "right"}}
        type="number"
        className={`border-[#808080] border-[1px] numberic-right ${appColors.inputColor}`}
      />
    </ComposeStyle>
  )
}

const ComposeStyle = styled.div`
 display: inline-flex;
`;


const EditorNumberStyle = styled.span`
 
`;
