import {Dialog} from "@progress/kendo-react-dialogs";

export default function Modal(props) {
  return (
    <Dialog title={props.title} onClose={props.onClose} initialHeight={props.minHeight} initialWidth={600}>
      {props.children}
    </Dialog>
  )
}