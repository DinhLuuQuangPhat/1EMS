import {MdAdd, MdDeleteOutline, MdDownload, MdEdit, MdRefresh, MdSave} from "react-icons/md";
import React from "react";
import styled from "styled-components";
import {FcLeft} from "react-icons/fc";



const Button = (props) => {
  return (
    <ButtonStyle
      onClick={props.onClick}
      disabled={props.disabled}
      className={`relative inline-flex items-center justify-center outline outline-1 rounded-sm hover:bg-primary hover:text-white ${props.className ?? ''}`}
    >
      <span
        className={`flex items-center relative px-2 py-1 transition-all ease-in duration-75 group-hover:bg-opacity-0 text-xs`}
      >
        {props.icon && (
          <span className="pr-1">{props.icon}</span>
        )}

        {props.children}
      </span>
    </ButtonStyle>
  )
}

export default Button;

const ButtonStyle = styled.button`
  &[disabled]{
    opacity: 0.5;
    background: #ccc;
    color: #999 !important;
    
    &:hover{
      opacity: 0.5 !important;
      background: #ccc !important;
      color: #999 !important;
    }
  }
`;
