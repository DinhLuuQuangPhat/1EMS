import {ButtonIcons} from "../../../../comps/button/ButtonIcons";
import React from "react";
import styled from "styled-components";
import DropItem from "../../../../comps/drag-n-drop/DropItem";
import DragItem from "../../../../comps/drag-n-drop/DragItem";

export default function ProcessHeader({process}) {
  return (
    <ProcessHeaderStyle className={'view-process-header flex py-1 px-1'}>
      <span>{ButtonIcons.staff}</span>
      <span>{ButtonIcons.manage}</span>
      <h2 className={'text-center grow-1'}>
        {process.SCTNNAME}
      </h2>
    </ProcessHeaderStyle>
  )
}

export function ProcessHeaderDraggable ({process}){
  return (
    <ProcessHeaderStyle className={'view-process-header flex'}>
      <DropItem droppableId={"object-banks"}>
        <DragItem index={0} draggableId={"staff"}>
          <span>{ButtonIcons.staff}</span>
        </DragItem>

        <DragItem index={0} draggableId={"manage"}>
          <span>{ButtonIcons.manage}</span>
        </DragItem>
      </DropItem>

      <h2 className={'text-center grow-1'}>
        { process ? process.SCTNNAME : ""}
      </h2>
    </ProcessHeaderStyle>
  )
}

const ProcessHeaderStyle = styled.div`
  align-items: center;
  border-bottom: 1px solid #000;
  
  .drop-item{
    padding: 5px;

    .drag-item{
      padding: 5px;
      margin-right: 5px;
    }
  }

  h2 {
    flex-grow: 1;
    font-weight: bold;
  }

  svg {
    min-width: 24px;
    height: auto;
  }
`;
