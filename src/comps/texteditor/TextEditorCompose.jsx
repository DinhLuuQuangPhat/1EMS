import TextEditorProvider from "./context/TextEditorProvider.jsx";
import React from "react";

export default function TextEditorCompose({values, content, disabled, onChange}) {
  const handleOnChange = (values) => {
    onChange(values);
  }

  return (
    <TextEditorProvider content={content} values={values} onChange={handleOnChange} disabled={disabled}>
    </TextEditorProvider>
  )
}

