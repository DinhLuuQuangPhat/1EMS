import {useState} from "react";
import api from "../../../api";
import {DocumentTemplateAPI, getDocumentTemplateCode} from "./api";

export default function viewDocumentTemplate(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /*
  * @Params: KEY_CODE "<Mã khóa chứng từ> "
  * */
  const viewItem = (KEY_CODE, callBack)  => {
    const keyCode = getDocumentTemplateCode(KEY_CODE);

    const request = {
      "DCMNCODE": "dtaDcmnDesn",
      "KEY_CODE": keyCode
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentTemplateAPI.view, request)
      .then((res) => {
        setData(res.data);

        if(callBack){
          callBack(res.data);
        }
      })
      .catch((err) => {
        setError(err);
        console.log("setError", err);
      });
  };

  return {
    viewItem: viewItem,
    data: data,
    error:error,
  }
}

const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T00:23:54.8965688+07:00",
  "RETNMSSG": "Đọc dữ liệu thành công",
  "RETNDATA": [
    {
      "COMPCODE": "PMC",
      "DCMNCODE": "PMC_012",
      "DCMNNAME": "D001_D002",
      "CODE_COL": "",
      "DATE_COL": "",
      "LOGO_COL": "",
      "CNTN_COL": "",
      "NOTE_COL": "",
      "VLUE_COL": "",
      "EMPL_COL": "",
      "FILE_COL": "",
      "HTMLTEXT": "",
      "DDDD": "DTADCMNDESN",
      "ACCERGHT": 79,
      "STTESIGN": 0,
      "STTENAME": "",
      "KKKK0000": "PMCPMC_012"
    }
  ]
}