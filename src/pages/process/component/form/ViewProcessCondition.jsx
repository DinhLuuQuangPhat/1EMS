import InputGroup from "../../../../comps/input/InputGroup";
import React from "react";
import {ViewProcessValue} from "./input/ViewProcessCondition";
import {ProcessConditionType} from "../../context/ProcessStepProvider";
import {convertSendMail} from "./CreateProcessStepForm";

export default function ViewProcessCondition({index, process}){
  return (
    <div className={'process-step-condition p-3'}>
      <InputGroup label={<div className={'text-right'}><b>Bước {index}: </b></div>} align={"baseline"} minWidth={80}>
        <InputGroup className={'view-process'} label={"Tên bước xét duyệt"} minWidth={200} align={"baseline"}>
          <ViewProcessValue value={process.WORKNAME} type={ProcessConditionType.WORKNAME} />
        </InputGroup>

        <InputGroup className={'view-process'} label={"Loại xét duyệt"} minWidth={200} align={"baseline"}>
          <ViewProcessValue value={process.ROLEAPRV} type={ProcessConditionType.ROLEAPRV} />
        </InputGroup>

        {process.PSJBTYPE != null && process.PSJBTYPE !== 0 && (
          <InputGroup className={'view-psjb-type'} label={"Chức danh, chức vụ"} minWidth={200} align={"baseline"}>
            <ViewProcessValue value={process.PSJBTYPE} type={ProcessConditionType.PSJBTYPE} />
          </InputGroup>
        )}

        {process.PSJBCODE != null && process.PSJBCODE !== "" && (
          <InputGroup className={'view-psjb-code'} label={"Chức vụ"} minWidth={200} align={"baseline"}>
            <ViewProcessValue value={process.PSJBCODE} PSJBTYPE={process.PSJBTYPE} type={ProcessConditionType.PSJBCODE} />
          </InputGroup>
        )}

        {process.ROLEAPRV != null && (
          <InputGroup className={'view-role-aprv'} label={"Trách nhiệm duyệt"} minWidth={200} align={"baseline"}>
            <ViewProcessValue value={process.ROLEAPRV} type={ProcessConditionType.ROLEAPRV} />
          </InputGroup>
        )}

        {process.SENDMAIL != null && process.SENDMAIL !== 0 && (
          <InputGroup label={"Thông báo đến"} minWidth={200} align={"baseline"}>
            <ViewProcessValue multiple={true} value={convertSendMail(process.SENDMAIL)} type={ProcessConditionType.SENDMAIL} />
          </InputGroup>
        )}

        {process.DLAYTYPE  != null && process.DLAYTYPE !== "" && (
          <InputGroup label={"Duyệt tự động sau"} minWidth={200} align={"baseline"}>
            {process.DLAYTIME}&nbsp;
            <ViewProcessValue value={process.DLAYTYPE} type={ProcessConditionType.DLAYTYPE} />
          </InputGroup>
        )}
      </InputGroup>
    </div>
  )
}