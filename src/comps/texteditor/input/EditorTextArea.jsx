import styled from "styled-components";
import {useTextEditorContext} from "../context/TextEditorProvider";
import React from "react";
import TextArea from "../../input/TextArea";

export default function EditorTextArea(props) {
  const {values} = useTextEditorContext();

  return (
    <EditorTextAreaStyle className={'editor-review-comp input-text-area'}>
      {values[props.name]}
    </EditorTextAreaStyle>
  )
}

export function EditorTextAreaCompose(props) {
  const {values, onChange} = useTextEditorContext();

  const handleOnChange = (val) => {
    onChange(props.name, val)
  }

  return (
    <ComposeStyle>
      <TextArea placeholder={props.placeholder}
                name={props.name}
                value={values[props.name]}
                onChange={handleOnChange}
      />
    </ComposeStyle>
  )
}

const ComposeStyle = styled.div`
  display: flex;
`;

const EditorTextAreaStyle = styled.div`
`;
