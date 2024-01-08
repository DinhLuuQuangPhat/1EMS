import styled from "styled-components";
import {useTextEditorContext} from "../context/TextEditorProvider";
import {Input} from "@progress/kendo-react-inputs";
import React from "react";
import {useStateContext} from "../../../context/ContextProvider";

export default function EditorText(props) {
  const {values} = useTextEditorContext();

  return (
    <EditorTextStyle className={'editor-review-comp input-text'}>
      {values[props.name]}
    </EditorTextStyle>
  )
}

export function EditorTextCompose(props) {
  const {appColors} = useStateContext();
  const {values, onChange} = useTextEditorContext();

  return (
    <ComposeStyle>
      <Input
        placeholder={props.placeholder}
        name={props.name}
        value={values[props.name]}
        onChange={(val) => onChange(props.name, val)}

        style={{borderColor: "grey"}}
        type="text"
        disabled={true}
        className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
      />
    </ComposeStyle>
  )
}

const ComposeStyle = styled.div`
 display: inline-flex;
`;


const EditorTextStyle = styled.div`
display: inline-flex;
`;
