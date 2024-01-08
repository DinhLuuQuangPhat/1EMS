import React from "react";

import { HiTrash, HiPencil } from "react-icons/hi2";

const CellButton = (props) => {
  return (
    <td>
      <div className="flex justify-center items-center gap-1">
        {props.enterEdit && (
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary edit-detail"
            onClick={() => props.enterEdit(props.dataItem)}
          >
            <HiPencil />
          </button>
        )}

        {props.enterRemove && (
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary delete-detail"
            onClick={() => props.enterRemove(props.dataItem)}
          >
            <HiTrash />
          </button>
        )}
      </div>
    </td>
  );
};

export default CellButton;
