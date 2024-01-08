import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {STORAGE} from "../../utils/storage";
import getCompanyLogo from "../../../pages/document/services/getCompanyLogo";

export default function EditorLogo() {
  const config = STORAGE.getConfig();
  const {getLogo, data, error} = getCompanyLogo();

  useEffect(() => {
    if(config && config.COMPLOGO){
      getLogo(config.COMPLOGO);
    }
  }, [config ? config.COMPLOGO : ""]);

  useEffect(() => {
    if(error){
      console.log("..................................", error);
    }
  }, [error]);

  return (
    <EditorAttachFileStyle className={'editor-review-comp input-logo'}>
      <img src={data ? data : ""} alt={""}/>
    </EditorAttachFileStyle>
  )
}

const EditorAttachFileStyle = styled.span`
 display: inline-block;
`;

