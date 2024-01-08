import {useState} from "react";
import api from "../../../api";
import {DocumentAPI} from "./api";
import {STORAGE} from "../../../comps/utils/storage";

export default function updateDocument(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // "LOGO_COL": props.hasLogo ? "X" : "",
  //   "CODE_COL": props.hasCode ? "X": "",

  //   "DATE_COL": props.hasDate ? "X" : "",
  //   "VLUE_COL": props.hasValue ? "X" : "",
  //   "CNTN_COL": props.hasCNTN ? "X" : "",
  //   "NOTE_COL": props.hasNote ? "X" : "",
  //   "EMPL_COL": props.hasEmployees ? "X" : "",

  const getCreateReq = (template, value) => {
    const company = STORAGE.getCompany();

    return {
      "DCMNCODE": "inpDcmnVrch",
      "ACTNCODE": 1, //== 1:Tạo mới, 2:Sửa chứng từ.
      "HEADER": [
        {
          "COMPCODE": template.COMPCODE,
          "LCTNCODE": company.LCTNLIST[0].LCTNCODE,
          "DCMNCODE": template.DCMNCODE, // "<Mã số mẫu chưng từ>"

          "MAINDATE": value.DATE_COL, // "<Ngày chứng từ>"
          "VLUENUMB": value.VLUE_COL, // "<Giá trị>"
          "CNTNTEXT": value.CNTN_COL,
          "NOTETEXT": value.NOTE_COL, // "<Diễn giải>"
          "EMPLCODE": value.EMPL_COL, // "<Mã nhân viên nhận>"
        }
      ]
    }
  }

  const getUpdateReq = (data, value) => {
    const template = data.template;
    const document = data.document;
    const company = STORAGE.getCompany();

    return {
      "DCMNCODE": "inpDcmnVrch",
      "ACTNCODE": 2,
      "HEADER": [
        {
          "COMPCODE": template.COMPCODE,
          "LCTNCODE": company.LCTNLIST[0].LCTNCODE,
          "DCMNCODE": template.DCMNCODE, // "<Mã số mẫu chưng từ>"

          //== Nếu ACTNCODE = 2 (UPDATE) thì phải có 2 field: KKKK0000 và MAINCODE
          "MAINCODE": document.MAINCODE, //== = Số chứng từ cần sửa
          "KKKK0000": document.KKKK0000, //== COMPCODE + DCMNCODE + MAINCODE

          "MAINDATE": value.DATE_COL, // "<Ngày chứng từ>"
          "VLUENUMB": value.VLUE_COL, // "<Giá trị>"
          "CNTNTEXT": value.CNTN_COL, // "<Noi dung>"
          "NOTETEXT": value.NOTE_COL, // "<Diễn giải>"
          "EMPLCODE": value.EMPL_COL, // "<Mã nhân viên nhận>"
        }
      ]
    }
  }
  const updateItem = (isAddNew, data, value, onSuccessFunc, onErrorFunc)  => {
    const request = isAddNew ? getCreateReq(data, value) : getUpdateReq(data, value);

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentAPI.update, request)
      .then((res) => {
        setData(res.data);

        if(onSuccessFunc){
          onSuccessFunc(res.data);
        }
      })
      .catch((err) => {
        setError(err);
        if(onErrorFunc){
          onErrorFunc()
        }
      });
  };

  return {
    updateItem: updateItem,
    data: data,
    error:error,
  }
}

export const createSuccess = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T10:39:14.9694534+07:00",
  "RETNMSSG": "Cập nhật dữ liệu thành công.",
  "RETNDATA": [
    {
      "COMPCODE": "PMC",
      "LCTNCODE": "001",
      "DCMNCODE": "PMC_028",
      "MAINCODE": "PMC230930009",
      "MAINDATE": "2023-09-30T03:38:47",
      "VLUENUMB": 10000000.00,
      "CNTNTEXT": "Noi dung thanh toan",
      "NOTETEXT": "",
      "EMPLCODE": "000005",
      "DDDD": "INPDCMNVRCH",
      "ACCERGHT": 65,
      "STTESIGN": 100,
      "STTENAME": "Dữ liệu đã được xác nhận",
      "KKKK0000": "PMCPMC_028PMC230930009",
      "CRT_USER": "000005",
      "CRT_DATE": "2023-09-30T10:39:14",
      "CHGEUSER": "000005",
      "CHGEDATE": "2023-09-30T10:39:14",
      "USEDSTTE": 1,
      "PPPP0000": "",
      "CCCC0000": "PMCPMC_028PMC230930009",
      "LINKFILE": [
        {}
      ]
    }
  ]
}

export const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T09:33:10.3162236+07:00",
  "RETNMSSG": "Cập nhật dữ liệu thành công.",
  "RETNDATA": [
    {
      "COMPCODE": "PMC",
      "LCTNCODE": "001",
      "DCMNCODE": "PMC_027",

      "MAINCODE": "PMC230930003",
      "MAINDATE": "2023-09-30T00:00:00",

      "VLUENUMB": 0.00,
      "CNTNTEXT": "PMC_027_KTRAN",
      "NOTETEXT": "",
      "EMPLCODE": "000005",
      "DDDD": "INPDCMNVRCH",
      "ACCERGHT": 65,
      "STTESIGN": 100,
      "STTENAME": "Dữ liệu đã được xác nhận",
      "KKKK0000": "PMCPMC_027PMC230930003",
      "CRT_USER": "000005",
      "CRT_DATE": "2023-09-30T09:33:10",
      "CHGEUSER": "000005",
      "CHGEDATE": "2023-09-30T09:33:10",
      "USEDSTTE": 1,
      "PPPP0000": "",
      "CCCC0000": "PMCPMC_027PMC230930003",
      "LINKFILE": [
        {}
      ]
    }
  ]
}