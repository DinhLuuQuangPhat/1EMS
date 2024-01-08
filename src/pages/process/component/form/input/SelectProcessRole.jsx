import Select from "../../../../../comps/input/Select";
import {useProcessStepCategory} from "../../../context/ProcessStepProvider";
import {FIELD_DATA} from "../../../services/getProcessCategories";

export function SelectROLEAPRV({name, value, onChange}) {
  const {ROLEAPRV} = useProcessStepCategory();
  return (
    <>
      <Select placeholder="Loại ký duyệt"
              value={value}
              options={ROLEAPRV}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.ROLEAPRV}</div>
    </>
  )
}

export default function SelectPRCSCODE({name, value, onChange}) {
  const {PRCSCODE} = useProcessStepCategory(); //lstDcmnPrcs

  return (
    <>
      <Select placeholder="Chức danh/ Chức vụ/ Chỉ định"
              value={value}
              options={PRCSCODE}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.PRCSCODE}</div>
    </>
  )
}

export function SelectPSJBTYPE({name, value, onChange}) {
  const {PSJBTYPE} = useProcessStepCategory(); //lstDcmnPrcs

  return (
    <>
      <Select placeholder="Chức danh/ Chức vụ/ Chỉ định"
              value={value}
              options={PSJBTYPE}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.PSJBTYPE}</div>
    </>
  )
}
export function SelectPSJBCODE({multiple, name, value, onChange}) {
  const {PSJBCODE} = useProcessStepCategory(); // lstPosition
  return (
    <>
      <Select placeholder="Loại ký duyệt"
              multiple={multiple}
              value={value}
              options={PSJBCODE}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.PSJBCODE}</div>
    </>
  )
}
export function SelectPOSITIONS({multiple, name, value, onChange}) {
  const {POSITIONS} = useProcessStepCategory(); // lstPosition
  return (
    <>
      <Select placeholder="Loại ký duyệt"
              multiple={multiple}
              value={value}
              options={POSITIONS}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.POSITIONS}</div>
    </>
  )
}

export function SelectEMPLOYEES({name, value, onChange}) {
  const {EMPLOYEES} = useProcessStepCategory(); // lstPosition
  return (
    <>
      <Select placeholder="Loại ký duyệt"
              value={value}
              options={EMPLOYEES}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.EMPLOYEES}</div>
    </>
  )
}



export function SelectPSJBCODE_DMC({name, value, onChange}) {
  const data = useProcessStepCategory();
  return (
    <>
      <Select placeholder="Loại ký duyệt"
              value={value}
              options={data.PSJBCODE_DMC}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.PSJBCODE_DMC}</div>
    </>
  )
}

export function SelectPRCSLIST({name, multiple, value, onChange}) {
  const {PRCSLIST} = useProcessStepCategory();

  return (
    <>
      <Select placeholder="Loại ký duyệt"
              value={value}
              multiple={multiple}
              options={PRCSLIST}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.PRCSLIST}</div>
    </>
  )
}
export function SelectSENDMAIL({name, multiple, value, onChange}) {
  const {SENDMAIL} = useProcessStepCategory();
  return (
    <>
      <Select placeholder="Đối tượng nhận thông báo"
              multiple={multiple}
              value={value + ""}
              options={SENDMAIL}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.SENDMAIL}</div>
    </>
  )
}

export function SelectDLAYTYPE({name, value, onChange}) {
  const {DLAYTYPE} = useProcessStepCategory();
  return (
    <>
      <Select placeholder="Đơn vị thời gian"
              value={value}
              options={DLAYTYPE}
              onChange={(val) => onChange(val)}/>
      <div className="field-option">{name}: {FIELD_DATA.DLAYTYPE}</div>
    </>
  )
}

