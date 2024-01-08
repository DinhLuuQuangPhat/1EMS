import styled from "styled-components";
import {Input} from "@progress/kendo-react-inputs";
import React from "react";
import {useTextEditorContext} from "../context/TextEditorProvider";
import {useStateContext} from "../../../context/ContextProvider";

export default function EditorParagraph(props) {
  const {values} = useTextEditorContext();

  return (
    <EditorParagraphStyle className={'editor-review-comp input-paragraph'}>
      {values[props.name]}
    </EditorParagraphStyle>
  )
}

export function EditorParagraphCompose(props) {
  const {appColors} = useStateContext();
  const {values, onChange} = useTextEditorContext();

  return (
    <ComposeStyle>
      <Input
        placeholder={props.placeholder}
        name={props.name}
        value={values[props.name]}
        onChange={(e) => onChange(props.name, e.target.value)}

        style={{borderColor: "grey"}}
        className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
        type="text"
      />
    </ComposeStyle>
  )
}

const ComposeStyle = styled.div`
 display: flex;
`;


const EditorParagraphStyle = styled.div`
  
`;
