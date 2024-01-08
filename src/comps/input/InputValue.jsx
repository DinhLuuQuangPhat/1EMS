import React, {useState} from "react";
import InputGroup from "./InputGroup";
import styled from "styled-components";
import Button from "../button/Button";

export default function InputValue({label, children, copyable, addons}) {
  const [copySuccess, setCopySuccess] = useState('Copy');

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopySuccess('Copied!');
      setTimeout(() => {
        setCopySuccess('Copy');
      }, 1000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <InputGroup label={label} addons={addons}>
      <InputValueStyle className={"k-input k-input-md k-rounded-md k-input-solid"}>
        <div className={'message-content'}>{children}</div>

        {copyable && (
          <Button className={'copy-message'} onClick={copyToClipBoard}>{copySuccess}</Button>
        )}
      </InputValueStyle>
    </InputGroup>
  )
}

const InputValueStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #FAFAFA;
  padding: 4px 8px;
  
  .message-content{
    z-index: 1;
    flex-grow: 1;
  }

  .copy-message {
    display: inline-flex;
    cursor: pointer;
    font-size: 80%;
  }
`;

