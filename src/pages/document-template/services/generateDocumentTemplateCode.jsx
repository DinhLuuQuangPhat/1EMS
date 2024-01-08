import {useState} from "react";
import api from "../../../api";
import {DocumentTemplateAPI} from "./api";

export default function generateDocumentTemplateCode() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const generateCode = (callBack) => {
    const request = {
      "DTBSNAME": "AppSystem",
      "FUNCNAME": "spAPI_get_DcmnCode"
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentTemplateAPI.generateCode, request)
      .then((res) => {
        setData(res.data);
        if (callBack) {
          callBack(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    generateCode: generateCode,
    data: data,
    error: error,
  }
}

const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T00:21:47.375838+07:00",
  "RETNMSSG": "Đọc dữ liệu thành công",
  "RETNDATA": [
    {
      "DcmnCode": "PMC_027"
    }
  ]
}