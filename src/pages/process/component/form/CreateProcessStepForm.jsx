import {FormikProvider, useFormik} from "formik";
import TextArea from "../../../../comps/input/TextArea";
import InputGroup from "../../../../comps/input/InputGroup";
import InputNumber from "../../../../comps/input/InputNumber";
import ButtonPrimary from "../../../../comps/button/ButtonPrimary";
import ButtonDanger from "../../../../comps/button/ButtonDanger";
import {ButtonIcons} from "../../../../comps/button/ButtonIcons";
import ButtonGroup from "../../../../comps/button/ButtonGroup";
import styled from "styled-components";
import SelectPRCSCODE, {
  SelectDLAYTYPE, SelectEMPLOYEES, SelectPOSITIONS,
  SelectPRCSLIST, SelectPSJBCODE, SelectPSJBCODE_DMC, SelectPSJBTYPE,
  SelectROLEAPRV, SelectSENDMAIL
} from "./input/SelectProcessRole";
import Input from "../../../../comps/input/Input";
import {ProcessStepCategoryProvider} from "../../context/ProcessStepProvider";
import React, {useEffect} from "react";

const fieldSize = 170;

export function convertSendMail (value){
  const values = [];
  for(let i = 0; i < 10; i++ ){
    values.push(Math.pow(2, i))
  }
  let remain = value;
  const result = [];
  values.reverse().forEach((num) => {
    if(remain >= num){
      remain -= num;
      result.push(num);
    }
  });
  return result.join(",")
}
export default function CreateProcessStepForm({step, onSubmit, onCancel}) {

  const formik = useFormik({
    initialValues: {
      "PRCSODER": step.PRCSODER, //	-- Tự nhập số bước vào

      "WORKNAME": "", //"Nhân viên trình ký",	-- Tự nhập vào: tên bước

      "PSJBTYPE": "", //	-- Chức danh/ Chức vụ/ Chỉ định	Enum_apvObjcType	### Phân nhóm xét duyệt
      "PSJBCODE": "", //"000006,000007,000008",	-- Danh sách c.Danh/c.Vụ	lstJob/lstPosition	###ComboChecklist
                      // nếu PSJBTYPE=1 => lstJob
                      // nếu PSJBTYPE=2 => lstPosition

      "ROLEAPRV": "", //1,	-- Loại ký duyệt	Enum_apvRoleAprv	###Trách nhiệm xét duyệt

      "SENDMAIL": "",	// -- Đối tượng nhận thông báo	Enum_apvSendMail	###Thông báo đến

      "DLAYTIME": 0,	// -- Nhập số thời gian vào
      "DLAYTYPE": "",	// -- Đơn vị thời gian	Enum_apvTimeType	###Duyệt tự động sau

      "PRCSLIST": "", //	-- lstDcmnPrcs	###Loại phê duyệt dc chọn

      "PRCSCODE": "", // "001",	-- Loại ký duyệt	lstDcmnPrcs	###Phê duyệt mặc định

      "NOTETEXT": ""	// 	###Ghi chú
    },

    onSubmit: values => {
      const SENDMAIL = values.SENDMAIL.split(",").map((nb) => {
        return Number(nb);
      }).reduce((tol, curr) => {
        return tol += curr
      }, 0);

      onSubmit({...values, SENDMAIL: SENDMAIL});
    },
  });

  useEffect(() => {
    if(step){
      formik.setFieldValue("WORKNAME", step.WORKNAME);
      formik.setFieldValue("PSJBTYPE", step.PSJBTYPE ? step.PSJBTYPE + "" : "");
      formik.setFieldValue("PSJBCODE", step.PSJBCODE ? step.PSJBCODE + "" : "");
      formik.setFieldValue("ROLEAPRV", step.ROLEAPRV ? step.ROLEAPRV + "" : "");
      formik.setFieldValue("SENDMAIL", step.SENDMAIL ? convertSendMail(step.SENDMAIL) : "");
      formik.setFieldValue("DLAYTIME", step.DLAYTIME);
      formik.setFieldValue("DLAYTYPE", step.DLAYTYPE ? step.DLAYTYPE + "" : "");
      formik.setFieldValue("PRCSLIST", step.PRCSLIST ? step.PRCSLIST + "" : "");
      formik.setFieldValue("PRCSCODE", step.PRCSCODE ? step.PRCSCODE + "" : "");
      formik.setFieldValue("NOTETEXT", step.NOTETEXT);
    }
  }, [step]);


  const handlePSJBTYPEChange = (val) => {
    formik.setFieldValue("PSJBTYPE", val);
    formik.setFieldValue("PSJBCODE", "");
  }

  return (
    <ProcessStepCategoryProvider>
      <FormikProvider value={formik}>
        <FormStyle className={"create-process-step-form"} style={{maxWidth: 600}}>
          <div className="k-form">
            <div >
              <InputGroup label={"Tên bước xét duyệt"} minWidth={fieldSize}>
                <Input value={formik.values.WORKNAME} onChange={(val) => formik.setFieldValue("WORKNAME", val)}/>
              </InputGroup>

              <InputGroup label={"Phân nhóm xét duyệt"} minWidth={fieldSize} align={"start"}>
                <SelectPSJBTYPE name={"PSJBTYPE"} value={formik.values.PSJBTYPE}
                                onChange={handlePSJBTYPEChange}/>
              </InputGroup>

              {(formik.values.PSJBTYPE === "1") && (
                <InputGroup label={"Loại ký duyệt"} minWidth={fieldSize} align={"start"}>
                  <SelectPSJBCODE multiple={true} value={formik.values.PSJBCODE}
                                  onChange={(val) => formik.setFieldValue("PSJBCODE", val)}/>
                </InputGroup>
              )}

              {(formik.values.PSJBTYPE === "2") && (
                <InputGroup label={"Loại ký duyệt"} minWidth={fieldSize} align={"start"}>
                  <SelectPOSITIONS multiple={true} value={formik.values.PSJBCODE}
                                   onChange={(val) => formik.setFieldValue("PSJBCODE", val)}/>
                </InputGroup>
              )}

              <InputGroup label={"Trách nhiệm xét duyệt"} minWidth={fieldSize}>
                <SelectROLEAPRV name={"ROLEAPRV"} value={formik.values.ROLEAPRV}
                                onChange={(val) => formik.setFieldValue("ROLEAPRV", val)}/>
              </InputGroup>

              <InputGroup label={"Thông báo đến"} minWidth={fieldSize} align={"start"}>
                <SelectSENDMAIL name={"SENDMAIL"} multiple={true} value={formik.values.SENDMAIL} onChange={(val) => formik.setFieldValue("SENDMAIL", val)}/>
              </InputGroup>

              <InputGroup label={"Duyệt tự động sau"} minWidth={fieldSize}>
                <div className={'flex flex-1'}>
                  <div className="col-span-full xl:col-span-6">
                    <InputNumber min={0} value={formik.values.DLAYTIME}
                                 onChange={(val) => formik.setFieldValue("DLAYTIME", val)}/>
                  </div>

                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                  <div className="col-span-full xl:col-span-6">
                    <SelectDLAYTYPE name={"DLAYTYPE"} value={formik.values.DLAYTYPE} onChange={(val) => formik.setFieldValue("DLAYTYPE", val)}/>
                  </div>
                </div>
              </InputGroup>

              <InputGroup label={"Loại phê duyệt được chọn"} minWidth={fieldSize} align={"start"}>
                <SelectPRCSLIST name={"PRCSLIST"} multiple={true} value={formik.values.PRCSLIST} onChange={(val) => formik.setFieldValue("PRCSLIST", val)}/>
              </InputGroup>

              <InputGroup label={"Phê duyệt mặc định"} minWidth={fieldSize}>
                <SelectPRCSCODE name={"PRCSCODE"} value={formik.values.PRCSCODE} onChange={(val) => formik.setFieldValue("PRCSCODE", val)}/>
              </InputGroup>

              <InputGroup label={"Ghi chú"} minWidth={fieldSize}>
                <TextArea value={formik.values.NOTETEXT} onChange={(val) => formik.setFieldValue("NOTETEXT", val)}/>
              </InputGroup>
            </div>
          </div>

          <ButtonGroup className={"mt-10"} align={"right"}>
            <ButtonPrimary icon={ButtonIcons.save} onClick={formik.handleSubmit} disabled={! formik.values.ROLEAPRV}>
              Đồng ý
            </ButtonPrimary>

            <ButtonDanger onClick={onCancel}>
              Hủy
            </ButtonDanger>
          </ButtonGroup>
        </FormStyle>
      </FormikProvider>

    </ProcessStepCategoryProvider>
  )
}

const FormStyle = styled.div`
  .group-form {
    display: flex;

    .k-input {
      &:last-child {
        margin-left: 24px;
        width: 60%;
        min-width: 60%;
      }
    }
  }

  .field-option{
    font-weight: bold;
    color: red;
    display: none;
  }
  
  .col-span-full{
    flex-grow: 1;
  }
`;