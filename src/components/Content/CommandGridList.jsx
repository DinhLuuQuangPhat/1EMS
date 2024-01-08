import React, { useEffect, useState } from "react";
import { FcFullTrash, FcUnlock, FcGenealogy, FcTodoList } from "react-icons/fc";

import api from "../../api";
import { apiUrl } from "../../constants";
import { useStateContext } from "../../context/ContextProvider";
import { PopupEMS, ApprovalProcedureHeader, ApprovalProgressHeader } from "../";
import { Button } from "@progress/kendo-react-buttons";

const CommandGridList = (props) => {
  const { dataItem, DcmnCode, disableLock, disableDel } = props;
  const isLock = dataItem.STTESIGN === 0;
  const isDelete = dataItem.STTESIGN === 0;

  const { getLabelValue } = useStateContext();

  const [showApproval, setShowApproval] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [prmsButtonApproval, setPrmsButtonApproval] = useState(false);
  const [prmsButtonReview, setPrmsButtonReview] = useState(false);

  const [approvalProcess, setApprovalProcess] = useState();
  const actionApprovalProcess = (dataItem) => {
    setShowApproval(true);
    setShowReview(false);

    api(localStorage.getItem("usertoken"))
      .post(apiUrl.progessStep.value, {
        DCMNCODE: DcmnCode,
        KEY_CODE: dataItem.KKKK0000,
      })
      .then((res) => {
        var data = res.data;
        if (data.RETNCODE) {
          setApprovalProcess(
            data.RETNDATA != undefined ? { data: data.RETNDATA } : { data: [] }
          );
          setPrmsButtonApproval(true);
        } else {
          setPrmsButtonApproval(false);
          console.log(JSON.stringify(res.data));
        }
      })
      .catch((err) => console.log(err));
  };
  const closeApprovalProcess = () => {
    setShowApproval(false);
    setPrmsButtonApproval(false);
    setApprovalProcess();
  };

  const [reviewProcess, setReviewProcess] = useState();
  const actionReviewProcess = (dataItem) => {
    setShowReview(true);
    setShowApproval(false);

    api(localStorage.getItem("usertoken"))
      .post(apiUrl.reviewStep.value, {
        DCMNCODE: "dmsAprvVchr",
        PARA_001: DcmnCode,
        PARA_002: dataItem.KKKK0000,
        PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
      })
      .then((res) => {
        var data = res.data;

        if (data.RETNCODE) {
          if (data.RETNDATA.length > 0) {
            setReviewProcess(
              data.RETNDATA[0] != undefined
                ? { data: data.RETNDATA }
                : { data: [] }
            );
            setPrmsButtonReview(true);
          } else {
            setReviewProcess([]);
            setPrmsButtonReview(false);
          }
        } else {
          setPrmsButtonReview(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const closeReviewProcess = () => {
    setShowReview(false);
    setPrmsButtonReview(false);
    setReviewProcess();
  };

  return (
    <>
      <td className="flex justify-end gap-1 func-col">
        {isLock && (
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command hover:bg-[#61c1ff] "
            onClick={() => props.lockClick(dataItem)}
            disabled={disableLock}
          >
            <FcUnlock />
          </button>
        )}

        {isDelete && (
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-delete-command hover:bg-[#61c1ff] ml-1"
            onClick={() => props.deleteClick(dataItem)}
            disabled={!isDelete || disableDel}
          >
            <FcFullTrash />
          </button>
        )}

        {/* Quy trinh phe duyet */}
        <>
          <Button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-progress-command hover:bg-[#61c1ff] ml-1"
            onClick={() => {
              actionApprovalProcess(dataItem);
            }}
            disabled={prmsButtonApproval}
          >
            <span className="rotate-90">
              <FcGenealogy />
            </span>
          </Button>
          {showApproval &&
            approvalProcess &&
            approvalProcess.hasOwnProperty("data") &&
            approvalProcess !== null &&
            approvalProcess.data.length > 0 && (
              <div className="relative viewDcmnGridList">
                <div className="absolute right-0 left-auto top-4 bottom-auto">
                  <PopupEMS onOutsideClick={closeApprovalProcess}>
                    <div className="actionApprovalProcess2">
                      <div className="p-3 bg-[#fff8f0] content text-left">
                        <span className="text-md font-semibold text-secondary w-full text-center block">
                          {getLabelValue(85, "Quy trình phê duyệt")}
                        </span>
                        <ApprovalProcedureHeader
                          dataApprovalProcedure={approvalProcess}
                        />
                      </div>
                    </div>
                  </PopupEMS>
                </div>
              </div>
            )}
        </>

        {/* Qua trinh phe duyet */}
        <>
          <Button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-progress-command hover:bg-[#61c1ff] ml-1"
            onClick={() => {
              actionReviewProcess(dataItem);
            }}
            disabled={prmsButtonReview}
          >
            <FcTodoList />
          </Button>
          {showReview &&
            reviewProcess &&
            reviewProcess.hasOwnProperty("data") &&
            reviewProcess.data != null &&
            reviewProcess.data.length > 0 &&
            reviewProcess.data[0] != null &&
            reviewProcess.data[0].DETAIL &&
            reviewProcess.data[0].DETAIL.length > 0 && (
              <div className="relative viewDcmnGridList">
                <div className="absolute right-0 left-auto top-4 bottom-auto">
                  <PopupEMS onOutsideClick={closeReviewProcess}>
                    <div className="actionReviewProcess2">
                      <div className="p-3 bg-[#fff8f0] content text-left h-60 max-h-60 min-h-56 overflow-y-scroll w-64">
                        <span className="text-md font-semibold text-secondary w-full text-center block">
                          {getLabelValue(86, "Quá trình phê duyệt")}
                        </span>
                        <ApprovalProgressHeader
                          dataApprovalProgress={reviewProcess}
                        />
                      </div>
                    </div>
                  </PopupEMS>
                </div>
              </div>
            )}
        </>
      </td>
    </>
  );
};

export default CommandGridList;
