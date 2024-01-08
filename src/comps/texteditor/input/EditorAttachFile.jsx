import styled from "styled-components";
import FileInput from "../../input/FileInput";
import {useTextEditorContext} from "../context/TextEditorProvider";
import {doPostDeleteFiles, postFileService} from "../../../components/PDKCT/Service";
import {FileInputItemReview} from "../../input/FileInputItem";
import React from "react";
import {useComposeDocumentContext} from "../../../pages/document/context/ComposeDocumentContextProvider";

export default function EditorAttachFile(){
  const {values} = useTextEditorContext();

  return (
    <EditorAttachFileStyle className={"editor-review-comp input-attach-file"}>
      {values.DCMNFILE &&
        values.DCMNFILE.length > 0 &&
        values.DCMNFILE.map((file) => {
          return (
            Object.keys(file).length > 0 && (
              <FileInputItemReview key={file.FILECODE} fileItem={file} />
            )
          );
        })}
    </EditorAttachFileStyle>
  )
}

export function EditorAttachFileCompose(props){
  const {onFileChanges} = useComposeDocumentContext();

  const {values} = useTextEditorContext();

  const handleOnChange = (files) => {
    if(values.DDDD && values.KKKK0000){
      postFileService(values.DDDD, values.KKKK0000, files);
    } else {
      onFileChanges(files);
    }
  }
  const handleOnRemove = (file, callBackFunc) => {
    if(values.DDDD && values.KKKK0000){
      doPostDeleteFiles (values.DDDD, values.KKKK0000, file.id, () => {
        callBackFunc();
      })
    } else {
      callBackFunc();
    }
  }

  return (
    <EditorAttachFileStyle>
      <FileInput singleUpload={values.DDDD && values.KKKK0000} currentFiles={values.DCMNFILE} name={props.name} onChange={handleOnChange} onRemove={handleOnRemove} />
    </EditorAttachFileStyle>
  )
}


const EditorAttachFileStyle = styled.div`
  
`;
