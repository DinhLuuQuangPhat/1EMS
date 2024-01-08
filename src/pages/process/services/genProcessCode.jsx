import {useState} from "react";
import api from "../../../api";
import {ProcessAPI} from "./api";

export default function genProcessCode() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const generateCode = (DocumentCode) => {
    if(DocumentCode){
      const request = {
        "DTBSNAME": "AppSystem",
        "FUNCNAME": "spAPI_get_SctnCode",
        "PARA_001": DocumentCode
      }

      api(localStorage.getItem("usertoken"))
        .post(ProcessAPI.generateCode, request)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  return {
    generateCode: generateCode, data: data, error: error,
  }
}

export const exampleRes = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T00:09:43.9504732+07:00",
  "RETNMSSG": "Đọc dữ liệu thành công",
  "RETNDATA": [
    {
      "SctnCode": "002"
    }
  ]
}

export function generateStepData() {
  return {
    "PRCSODER": 0,
    "WORKNAME": "<Tên bước Trình ký>",
    "ROLEAPRV": "<Vai trò xét duyệt>", //== 1:Trình ký, 2:Phê duyệt, 3:Thực hiện
    "PRCSCODE": "001",
    "PRCSLIST": "%",
    "PSJBTYPE": 2,
    "PSJBCODE": "000006,000007,000008",
    "DLAYTYPE": "",
    "DLAYTIME": 0,

    "SENDMAIL": 1,
    "NOTETEXT": ""
  }
}