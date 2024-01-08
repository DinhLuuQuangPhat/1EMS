import {
  MdAdd,
  MdDeleteOutline,
  MdEdit,
  MdInfoOutline, MdOutlineClose,
  MdOutlineDone, MdOutlinePersonPin, MdPerson,
  MdPrint,
  MdRefresh,
  MdSave, MdUploadFile
} from "react-icons/md";
import {FcLeft} from "react-icons/fc";
import React from "react";

export const ButtonIcons = {
  add : <MdAdd/>,
  edit: <MdEdit />,
  delete: <MdDeleteOutline />,
  save: <MdSave />,
  revert: <MdRefresh />,
  load: <MdOutlineDone />,
  back: <FcLeft />,
  print: <MdPrint />,

  info: <MdInfoOutline />,
  close: <MdOutlineClose />,


  staff: <MdPerson />,
  manage: <MdOutlinePersonPin />,

  select: <MdUploadFile />
}