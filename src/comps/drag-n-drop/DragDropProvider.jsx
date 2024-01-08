import { DragDropContext } from 'react-beautiful-dnd';

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const DragNDropUtils = {
  reorder: (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }
}

export default function DragDropProvider(props){
  const handleDragEnd = (result) => {
    console.log("DragDropProvider", result);

    if (!result.destination) {
      if(result.source.droppableId !== "object-banks"){
        props.onRemove({
          target: result.draggableId,
          from: result.source.droppableId,
        })
      }
      return;
    }

    console.log("Drag object " + result.draggableId + " from ", result.source.droppableId + " to " + result.destination.droppableId);

    props.onDragEnd({
      target: result.draggableId,

      from: result.source.droppableId,
      fromIndex:result.source.index,

      to: result.destination.droppableId,
      toIndex: result.destination.index,
    })
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {props.children}
    </DragDropContext>
  )
}
