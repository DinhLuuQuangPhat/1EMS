import {Draggable} from "react-beautiful-dnd";

export default function DragItem (props) {
  return (
    <Draggable key={props.id} draggableId={props.draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div
          onClick={props.onClick}
          className={"drag-item"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  )
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});