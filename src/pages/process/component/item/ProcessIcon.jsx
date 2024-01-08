import {ButtonIcons} from "../../../../comps/button/ButtonIcons";
import React from "react";
import styled from "styled-components";

export default function  ProcessIcon (props) {
  return (
    <ProcessIconStyle className={'process-step-icon'}>
      {props.group === 'staff' ? ButtonIcons.staff : ButtonIcons.manage}
      <div className={'process-step-order'}>({props.index + 1})</div>
      <div className={'process-title-display'}>{props.name}</div>
    </ProcessIconStyle>
  )
}

const ProcessIconStyle = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 80px;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  svg {
    min-width: 24px;
    height: auto;
  }
  
  .process-step-order{
    font-size: 12px;
  }
  
  .process-title-display {
    font-size: 10px;
  }

`;
