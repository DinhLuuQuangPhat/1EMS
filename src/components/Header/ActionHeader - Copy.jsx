import React, { useState, useEffect, useRef } from "react";

import { useStateContext } from "../../context/ContextProvider";
import { FcLeft } from "react-icons/fc";
import {
  ButtonHeader,
  ApprovalProcedureHeader,
  ApprovalProgressHeader,
  PopupEMS,
} from "../";
import {
  MdAddCircleOutline,
  MdContentCopy,
  MdLockOutline,
  MdOutlineDelete,
  MdOutlineSave,
  MdSchema,
  MdLockOpen,
  MdReplay,
} from "react-icons/md";

import { Popup } from "@progress/kendo-react-popup";

const ActionList = {
  LIST: {
    add: true, // Thêm mới
  },
  ADD: {
    procedure: false, // Quy trình
    progress: false, // Quá trình
    add: false, // Thêm mới
    dup: false, // Nhân bản
    save: true, // Lưu
    cancel: false, // Hủy
    delete: false, // Xóa
    lock: true, // Khóa
    unlock: false, // Mở khóa
  },
  DUP:{
    procedure: false, // Quy trình
    progress: false, // Quá trình
    add: true, // Thêm mới
    dup: false, // Nhân bản
    save: true, // Lưu
    cancel: false, // Hủy
    delete: false, // Xóa
    lock: true, // Khóa
    unlock: false, // Mở khóa
  },
  EDIT: {
    procedure: true, // Quy trình
    progress: true, // Quá trình
    add: true, // Thêm mới
    dup: true, // Nhân bản
    save: true, // Lưu
    cancel: false, // Hủy
    delete: true, // Xóa
    lock: true, // Khóa
    unlock: false, // Mở khóa
  },
};

const ChckBit = (parAccRght, parNumbAccs) => {
  if (parAccRght&parNumbAccs>0) {
    return true;
  } else {
    return false;
  }
};

const ActionHeader = (props) => {
  const mode = props.mode.toUpperCase();
  const AcceRght = props.AcceRght;
  const StteSign = props.StteSign;

  const { getLabelValue } = useStateContext();

  const anchorProcedure = useRef(null);
  const anchorProgress = useRef(null);

  return (
    <div className="p-3 flex justify-between items-center">
      <div className="flex items-center">
        <button className="text-base mr-2" onClick={props.onClickBack}>
          <FcLeft />
        </button>

        {/* Tieu de page */}
        {props.mode.toLowerCase() === "list" && (
          <div id="title">
            <h2 className="text-lg font-semibold">{props.TitlePage}</h2>
          </div>
        )}

        {/* Nút quy trình xét duyệt, quá trình xét duyệt */}
        {props.mode.toLowerCase() === "edit" && (
          <div id="view-button" className="flex">
            {/* Nút quy trình */}
            <div ref={anchorProcedure} id="procedure" className="relative">
              {ActionList[mode].procedure && (
                <ButtonHeader
                  title={getLabelValue(85, "Quy trình phê duyệt")}
                  icon={<MdSchema />}
                  onClick={props.actionApprovalProcess}
                />
              )}

              {props.showApprovalProcess && (
                <PopupEMS onOutsideClick={props.closeApprovalProcess}>
                  <div className="absolute actionApprovalProcess top-0 left-0">
                    <div className="p-3 bg-[#fff8f0] content">
                      <span className="text-md font-semibold text-secondary w-full text-center">
                        {getLabelValue(85, "Quy trình phê duyệt")}
                      </span>
                      {/* {props.approvalProcess.data !== null &&
                      props.approvalProcess.data.length > 0 ? (
                        <ApprovalProcedureHeader
                          dataApprovalProcedure={props.approvalProcess}
                        />
                      ) : (
                        <div>
                          <span className="text-sm text-red-600 italic">
                            {getLabelValue(140, "Không có thông tin")}
                          </span>
                        </div>
                      )} */}

                      {props.approvalProcess.data !== null &&
                        props.approvalProcess.data.length > 0 && (
                          <ApprovalProcedureHeader
                            dataApprovalProcedure={props.approvalProcess}
                          />
                        )}
                    </div>
                  </div>
                </PopupEMS>
              )}

              {/* <Popup
                anchor={anchorProcedure.current}
                show={props.showPopupProcedure}
                popupClass={"popup-content"}
                animate={false}
              >
                <div className="p-3 bg-[#fff8f0]">
                  <span className="text-md font-semibold text-secondary w-full text-center">
                    {getLabelValue(85, "Quy trình phê duyệt")}
                  </span>
                  {props.approvalProcedure.data !== null &&
                  props.approvalProcedure.data.length > 0 ? (
                    <ApprovalProcedureHeader
                      dataApprovalProcedure={props.approvalProcedure}
                    />
                  ) : (
                    <div>
                      <span className="text-sm text-red-600 italic">
                        {getLabelValue(140, "Không có thông tin")}
                      </span>
                    </div>
                  )}
                </div>
              </Popup> */}
            </div>

            {/* Nút quá trình */}
            <div ref={anchorProgress} id="progress" className="relative">
              {ActionList[mode].progress && (
                <ButtonHeader
                  title={getLabelValue(86, "Quá trình phê duyệt")}
                  icon={<MdSchema />}
                  onClick={props.actionReviewProcess}
                />
              )}

              {props.showReviewProcess && (
                <PopupEMS onOutsideClick={props.closeReviewProcess}>
                  <div className="absolute actionReviewProcess top-0 left-0">
                    <div className="p-3 bg-[#fff8f0] content">
                      <span className="text-md font-semibold text-secondary w-full text-center">
                        {getLabelValue(86, "Quá trình phê duyệt")}
                      </span>
                      {/* {props.reviewProcess.data != null &&
                      props.reviewProcess.data.length > 0 &&
                      props.reviewProcess.data[0].DETAIL !== null &&
                      props.reviewProcess.data[0].DETAIL.length > 0 ? (
                        <ApprovalProgressHeader
                          dataApprovalProgress={props.reviewProcess}
                        />
                      ) : (
                        <div>
                          <span className="text-sm text-red-600 italic">
                            {getLabelValue(140, "Không có thông tin")}
                          </span>
                        </div>
                      )} */}

                      {props.reviewProcess.data != null &&
                        props.reviewProcess.data.length > 0 &&
                        props.reviewProcess.data[0].DETAIL !== null &&
                        props.reviewProcess.data[0].DETAIL.length > 0 && (
                          <ApprovalProgressHeader
                            dataApprovalProgress={props.reviewProcess}
                          />
                        )}
                    </div>
                  </div>
                </PopupEMS>
              )}
              {/* <Popup
                anchor={anchorProgress.current}
                show={props.showPopupProgress}
                popupClass={"popup-content"}
                animate={false}
              >

              </Popup> */}
            </div>
          </div>
        )}
      </div>

      {/* Nut function Them, Nhan doi, Luu, Trinh ky, Khoa*/}
      <div id="action-button" className="flex">
        {/* Thêm mới */}
        {ChckBit(AcceRght, 1) && ActionList[mode].add && (
          <ButtonHeader
            title={getLabelValue(14, "Thêm mới")}
            icon={<MdAddCircleOutline />}
            onClick={props.add}
            className="addButton"
          />
        )}

        {/* Nhân bản */}
        {ChckBit(AcceRght, 8388608) && ActionList[mode].dup && (
          <ButtonHeader
            title={getLabelValue(110, "Nhân bản")}
            icon={<MdContentCopy />}
            onClick={props.dup}
            className="dupButton"
          />
        )}

        {/* Lưu */}
        {ChckBit(AcceRght, 4) && StteSign <= 0 && ActionList[mode].save && (
          <ButtonHeader
            title={getLabelValue(78, "Lưu")}
            icon={<MdOutlineSave />}
            onClick={props.save}
            className="saveButton"
            active="hover:bg-lime-500"
          />
        )}

        {/* Hủy */}
        {ChckBit(AcceRght, 4) && StteSign <= 0 && ActionList[mode].cancel && (
          <ButtonHeader
            title={getLabelValue(77, "Hủy")}
            icon={<MdReplay />}
            onClick={props.cancel}
            active="hover:bg-orange-500"
          />
        )}

        {/* Xóa */}
        {ChckBit(AcceRght, 2) && StteSign <= 0 && ActionList[mode].delete && (
          <div className="w-[0.1rem] h-[28px] ml-[0.5rem] border-solid border border-black"></div>
        )}
        {ChckBit(AcceRght, 2) && StteSign <= 0 && ActionList[mode].delete && (
          <ButtonHeader
            title={getLabelValue(80, "Xóa")}
            icon={<MdOutlineDelete />}
            onClick={props.delete}
            active="hover:bg-red-500"
          />
        )}

        {/* Khóa */}
        {ChckBit(AcceRght, 8) && StteSign <= 0 && ActionList[mode].lock && (
          <ButtonHeader
            title={getLabelValue(112, "Khóa")}
            icon={<MdLockOutline />}
            onClick={props.lock}
            className="lockButton"
            active="hover:bg-amber-500"
          />
        )}

        {/* Mở khóa */}
        {ChckBit(AcceRght, 16) && StteSign >= 1 && ActionList[mode].unlock && (
          <ButtonHeader
            title={getLabelValue(113, "Mở khóa")}
            icon={<MdLockOpen />}
            onClick={props.unlock}
            className="unlockButton"
            active="hover:bg-yellow-500"
          />
        )}
      </div>
    </div>
  );
};

export default ActionHeader;
