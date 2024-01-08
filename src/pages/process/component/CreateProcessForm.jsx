import InputGroup from "../../../comps/input/InputGroup";
import Input from "../../../comps/input/Input";
import ButtonGroup from "../../../comps/button/ButtonGroup";
import {ButtonIcons} from "../../../comps/button/ButtonIcons";
import ButtonPrimary from "../../../comps/button/ButtonPrimary";
import ButtonDanger from "../../../comps/button/ButtonDanger";
import Radio from "../../../comps/input/Radio";
import InputNumber from "../../../comps/input/InputNumber";
import {useFormik} from "formik";
import SelectDocumentTemplate from "../../document-template/components/SelectDocumentTemplate";
import SelectProcessCondition from "./form/SelectProcessCondition";
import InputValue from "../../../comps/input/InputValue";
import React, {useEffect, useState} from "react";
import genProcessCode from "../services/genProcessCode";
import styled from "styled-components";

export default function CreateProcessForm({templateCode, onSuccess, onCancel}) {
  const {generateCode, data} = genProcessCode(true);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      DCMNCODE: "", //"<Tên loại chứng từ>",
      DCMNNAME: "", //"<Tên loại chứng từ>",

      SCTNCODE: "",
      SCTNNAME: "",

      HAS_COND: 0,

      CMPROPRT: "",
      VLUENUMB: 0,
      NOTETEXT: "",
    },

    onSubmit: (values) => {
      if(values.SCTNNAME){
        const newSteps = [
          {
            PRCSODER: 0,
            WORKNAME: "Trình ký",
            ROLEAPRV: 1,
            PRCSCODE: "001",
            PRCSLIST: "",
            PSJBTYPE: 2,
            PSJBCODE: "%",
            DLAYTYPE: "",
            DLAYTIME: 0,
            SENDMAIL: 4,
            NOTETEXT: ""
          }
        ]
        onSuccess(values, newSteps);
      } else {
        setErrorMsg("Vui lòng nhập tên quy trình.");
      }
    },
  });

  const handleOnSelectTemplate = (item) => {
    formik.setFieldValue("DCMNCODE", item.ITEMCODE);
    formik.setFieldValue("DCMNNAME", item.ITEMNAME);
    formik.setFieldValue("SCTNCODE", "");
    generateCode(item.ITEMCODE);
  }

  useEffect(() => {
    if (data && data.RETNDATA.length > 0) {
      formik.setFieldValue("SCTNCODE", data.RETNDATA[0].SctnCode);
    }
  }, [data]);

  const handleOnSCTNNAMEChange = (value) => {
    formik.setFieldValue("SCTNNAME", value);
    setErrorMsg("");
  }

  return (
    <FormStyle className="k-form">
      <div style={{width: 560, minHeight: 120}}>
        <InputGroup label={"Loại chứng từ"} className={"mb-0"}>
          <SelectDocumentTemplate defaultValue={templateCode} value={formik.values.DCMNCODE} onChange={handleOnSelectTemplate}/>
        </InputGroup>

        {formik.values.SCTNCODE && (
          <>
            <InputValue layout={"horizontal"} label={"Mã quy trình"}>{formik.values.SCTNCODE}</InputValue>
          </>
        )}

        <InputGroup label={"Tên Quy Trình"}>
          <Input value={formik.values.SCTNNAME} onChange={handleOnSCTNNAMEChange}/>
          {errorMsg && (
            <ErrorMessageStyle>{errorMsg}</ErrorMessageStyle>
          )}
        </InputGroup>

        <InputGroup layout={"horizontal"} label={"Điều kiện"} align={"start"}>
          <div>
            <Radio layout={"horizontal"} value={formik.values.HAS_COND}
                   options={[{label: 'Có', value: 1}, {label: 'Không', value: 0}]}
                   onChange={(val) => formik.setFieldValue("HAS_COND", Number(val))}/>
          </div>
        </InputGroup>

        {formik.values.HAS_COND === 1 && (
          <InputGroup layout={"horizontal"} label={"  "} align={"start"}>
            <InputGroup layout={"horizontal"} label={"Trị giá"} minWidth={80}>
              <div className={'flex flex-1'}>
                <div className="col-span-full xl:col-span-6">
                  <SelectProcessCondition value={formik.values.CMPROPRT}
                                          onChange={(val) => formik.setFieldValue("CMPROPRT", val)}/>
                </div>

                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                <div className="col-span-full xl:col-span-6">
                  <InputNumber value={formik.values.VLUENUMB}
                               onChange={(val) => formik.setFieldValue("VLUENUMB", val)}/>
                </div>
              </div>
            </InputGroup>
          </InputGroup>
        )}
      </div>

      <ButtonGroup className={"mt-10"} align={"right"}>
        <ButtonPrimary icon={ButtonIcons.save} onClick={formik.handleSubmit} disabled={! (formik.values.DCMNCODE) || ! (formik.values.SCTNNAME)}>
          Đồng ý
        </ButtonPrimary>

        <ButtonDanger onClick={onCancel}>
          Hủy
        </ButtonDanger>
      </ButtonGroup>
    </FormStyle>
  )
}

const FormStyle = styled.div``;

const ErrorMessageStyle = styled.div`
color: red;
`;