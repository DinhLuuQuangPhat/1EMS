import React from "react";
import styled from "styled-components";

export default function ButtonPrimary(props) {
  return (
    <ButtonPrimaryStyle
      className="bg-primary text-sm text-white rounded-md pr-3 pl-3 pt-1 pb-1"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon && (
        <span className="pr-1">{props.icon}</span>
      )}

      {props.children}
    </ButtonPrimaryStyle>
  )
}


const ButtonPrimaryStyle= styled.button`
  &[disabled]{
    opacity: 0.4;
  }
`;
