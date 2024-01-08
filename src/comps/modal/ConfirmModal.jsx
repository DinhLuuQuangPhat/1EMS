import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import styled from "styled-components";
import Button from "../button/Button";
import ButtonGroup from "../button/ButtonGroup";
import ButtonPrimary from "../button/ButtonPrimary";
import {ButtonIcons} from "../button/ButtonIcons";
import ButtonDanger from "../button/ButtonDanger";
export default function ConfirmModal(props) {
  return (
    <Dialog title={props.title} onClose={props.onClose}>
      <div className={'dialog-message-content'}>
        {props.children}
      </div>

      <ButtonGroup className={"mt-10"} align={"right"}>
        {props.ok && (
          <ButtonPrimary onClick={() => props.onClose(true)}>
            {props.ok ?? "OK"}
          </ButtonPrimary>
        )}

        {props.cancel && (
          <ButtonDanger onClick={() => props.onClose(false)}>
            {props.cancel ?? "Cancel"}
          </ButtonDanger>
        )}
      </ButtonGroup>
    </Dialog>
  )
}
