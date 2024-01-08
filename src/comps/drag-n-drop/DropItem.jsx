import {Droppable} from "react-beautiful-dnd";

export default function DropItem (props) {
  return (
    <Droppable droppableId={props.droppableId} direction="horizontal">
      {(provided, snapshot) => (
        <div
          className={'drop-item'}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          {props.children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}


const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  overflow: 'auto',
});