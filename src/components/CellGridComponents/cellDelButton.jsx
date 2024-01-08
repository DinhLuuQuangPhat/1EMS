import React from "react";
import { HiTrash } from "react-icons/hi2";

const CellDelButton = (props) => {
  return (
    <td>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary delete-detail m-auto block"
        onClick={() => props.enterRemove(props.dataItem)}
      >
        <HiTrash />
      </button>
    </td>
  );
};

export default CellDelButton;
