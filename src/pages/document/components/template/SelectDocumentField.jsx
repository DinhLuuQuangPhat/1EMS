import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getTemplateProps} from "../../../../comps/texteditor/datatype";

export default function SelectDocumentField({content}) {
  const [contentProps, setContentProps ] = useState({});

  useEffect(() => {
    const contentPropsData = getTemplateProps(content);
    setContentProps(contentPropsData);
  }, [content]);

  return (
    <SelectDocumentFieldStyle className={"select-document-field"}>
      <div id={"toolbar"}>
        <div className={"ql-formats field-toolbar"}>
          <button className={`ql-insert_LOGO ${contentProps.hasLogo ? 'bg-primary': ''}`}>
            <span className={"text-xs"}>Logo</span>
          </button>

          <button className={`ql-insert_soCT ${contentProps.hasCode ? 'bg-primary': ''}`}>
            <span className={"text-xs"}>Số CT</span>
          </button>

          <button className={`ql-insert_ngayCT ${contentProps.hasDate ? 'bg-primary': ''}`}>
            <span className={"text-xs"}>Ngày CT</span>
          </button>

          <button className={`ql-insert_triGia ${contentProps.hasValue ? 'bg-primary': ''}`}>
            <span className={"text-xs"}>Trị giá</span>
          </button>

          <button className={`ql-insert_noiDung ${contentProps.hasCNTN ? 'bg-primary': ''}`}>
            <span className={"text-xs"}>Nội dung</span>
          </button>

          <button className={`ql-insert_dienGiai ${contentProps.hasNote ? 'bg-primary': ''}`}>
            <span className={"text-xs"}>Diễn giải</span>
          </button>

          <button className={`ql-insert_nguoiNhan ${contentProps.hasEmployees ? 'bg-primary': ''}`}>
            <span className={"text-xs"}>Người nhận</span>
          </button>

          <button className={`ql-insert_fileDinhKem ${contentProps.hasAttachFiles ? 'bg-primary': ''}`}>
            <span className={"text-xs"}>File đính kèm</span>
          </button>
        </div>

        <div className={"editor-toolbar"}>
          {/*<span className="ql-formats">*/}
          {/*  <select className="ql-font"></select>*/}
          {/*</span>*/}

          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
          </span>

          <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
          </span>

          <span className="ql-formats">
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-header" value="1"></button>
            <button className="ql-header" value="2"></button>
            <button className="ql-header" value="3"></button>
            <button className="ql-header" value="4"></button>
            <button className="ql-header" value=""></button>
          </span>

          <span className="ql-formats">
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-direction" value="rtl"></button>
            <button className="ql-align" value=""></button>
            <button className="ql-align" value="center"></button>
            <button className="ql-align" value="right"></button>
            <button className="ql-align" value="justify"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-image"></button>
          </span>
        </div>
      </div>
    </SelectDocumentFieldStyle>
  )
}

const SelectDocumentFieldStyle = styled.div`
  max-width: 100%;

  #toolbar {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    gap: 5px;
    border: none;
    padding: 0;
    
    .ql-formats{
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 2px 4px;
    }
    
    button.bg-primary {
      background-color: rgb(1 150 118 / var(--tw-bg-opacity)) !important;
    }

    .field-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      > button {
        width: auto;
        height: auto;
        float: none;
        padding: 4px 8px;

        border-color: rgba(0, 0, 0, 0.08);
        color: #424242;
        background-color: #f5f5f5;
        background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.02));

        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
      }
    }

    .editor-toolbar {
      margin-top: 16px;
    }
  }

`;
