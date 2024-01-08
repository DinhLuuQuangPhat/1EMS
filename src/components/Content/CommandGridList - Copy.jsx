import React, { useEffect, useState } from "react";
import { FcFullTrash, FcUnlock, FcGenealogy, FcTodoList } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";
import { useStateContext } from "../../context/ContextProvider";
import { PopupEMS, ApprovalProcedureHeader, ApprovalProgressHeader } from "../";

const CommandGridList = (props) => {
  const { dataItem } = props;
  const isLock = dataItem.STTESIGN === 0;
  const isDelete = dataItem.STTESIGN === 0;

  const { getLabelValue } = useStateContext();
  const dispatch = useDispatch();

  // Chi tiết quá trình phê duyệt
  const [dataReviewProcess, setDataReviewProcess] = useState();
  const closeReviewProcess = () => {
    setDataReviewProcess();
  };

  // Quy trình xét duyệt chứng từ
  const [dataApprovalProcess, setDataApprovalProcess] = useState();
  const [showApprovalProcess, setShowApprovalProcess] = useState(false);
  const actionApprovalProcess = (dataItem) => {
    let body = {
      DCMNCODE: dataItem.DCMNCODE,
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(getApprovalProcess(body));
  };
  const approvalProcess = useSelector(
    (state) => state.document.approvalProcess
  );
  useEffect(() => {
    setDataApprovalProcess(approvalProcess);
    setShowApprovalProcess(!showApprovalProcess);
  }, [approvalProcess]);
  const openApprovalProcess = () => {
    setShowApprovalProcess(!showApprovalProcess);
  };
  const closeApprovalProcess = () => {
    setDataApprovalProcess();
    setShowApprovalProcess(false);
  };

  return (
    <>
      <td className="flex justify-end gap-1 func-col">
        {isLock && (
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command hover:bg-[#61c1ff] "
            onClick={() => props.lockClick(dataItem)}
          >
            <FcUnlock />
          </button>
        )}

        {isDelete && (
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-delete-command hover:bg-[#61c1ff] ml-1"
            onClick={() => props.deleteClick(dataItem)}
            disabled={!isDelete}
          >
            <FcFullTrash />
          </button>
        )}

        {/* Quy trinh phe duyet */}
        <>
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-progress-command hover:bg-[#61c1ff] ml-1"
            onClick={() => {
              actionApprovalProcess(dataItem);
              // openApprovalProcess();
            }}
          >
            <span className="rotate-90">
              <FcGenealogy />
            </span>

            {showApprovalProcess &&
              dataApprovalProcess &&
              dataApprovalProcess.hasOwnProperty("data") &&
              dataApprovalProcess !== null &&
              dataApprovalProcess.data.length > 0 && (
                <div className="relative viewDcmnGridList">
                  <div className="absolute right-0 left-auto top-4 bottom-auto">
                    <PopupEMS onOutsideClick={closeApprovalProcess}>
                      <div className="actionApprovalProcess2">
                        <div className="p-3 bg-[#fff8f0] content text-left">
                          <span className="text-md font-semibold text-secondary w-full text-center block">
                            {getLabelValue(85, "Quy trình phê duyệt")}
                          </span>
                          <ApprovalProcedureHeader
                            dataApprovalProcedure={dataApprovalProcess}
                          />
                        </div>
                      </div>
                    </PopupEMS>
                  </div>
                </div>
              )}
          </button>
        </>
      </td>
    </>
  );
};

export default CommandGridList;
