import styled from "styled-components";
import {Label} from "@progress/kendo-react-labels";
import React from "react";

export default function InputGroup({className, label, layout, addons, align, minWidth, children}) {
  return (
    <InputGroupStyle className={`input-group-fields ${className ?? ''} ${layout ?? 'horizontal'}`} style={{alignItems: align ?? "center"}}>
      {label && (
        <Label className="text-sm text-gray-500" style={{minWidth: minWidth ?? 120}}>
          {label}
        </Label>
      )}

      <div className={'input-group-field'}>{children}</div>

      {addons && (
        <div className={'input-group-addons'}>{addons}</div>
      )}
    </InputGroupStyle>
  )
}

const InputGroupStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;

  &:not(:last-child){
    margin-bottom: 12px;
  }
  
  &.vertical{
    flex-direction: column;
    align-items: flex-start;
    
    &:not(:last-child){
      margin-bottom: 8px;
    }
    
    label,
    .input-group-field{
      width: 100%;
    }
  }

  .input-group-field {
    flex-grow: 1;
    align-items: center;

    select {
      width: 100%;
    }
  }
  
  .input-group-addons{
    display: flex;
    align-items: center;
  }
`;