import styled from "styled-components";
import {useMemo} from "react";

export default function ButtonGroup(props) {
  const align = useMemo(() => {
    return props.align === "center"
      ? "justify-center"
      : props.align === "start" ? "justify-start": "justify-end"
  }, [props.align]);

  return (
    <ButtonGroupStyle className={`button-group flex items-center ${props.className} ${align}`}>
      {props.children}
    </ButtonGroupStyle>
  )
}

const ButtonGroupStyle = styled.div`
  gap: 8px;
  
  button{
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
  }
`;