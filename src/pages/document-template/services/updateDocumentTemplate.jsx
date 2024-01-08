import {useState} from "react";
import api from "../../../api";
import {DocumentTemplateAPI} from "./api";
import {getTemplateProps} from "../../../comps/texteditor/datatype";


export default function updateDocumentTemplate(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const updateItem = (data, callBack)  => {
    const props = getTemplateProps(data.content);

    const request = {
      "DCMNCODE":"DTADCMNDESN",

      "HEADER":[
        {
          "DCMNCODE": data.DCMNCODE,
          "DCMNNAME": data.DCMNNAME,

          "HTMLTEXT": data.content,

          "LOGO_COL": props.hasLogo ? "X" : "",
          "CODE_COL": props.hasCode ? "X": "",
          "DATE_COL": props.hasDate ? "X" : "",
          "VLUE_COL": props.hasValue ? "X" : "",
          "CNTN_COL": props.hasCNTN ? "X" : "",
          "NOTE_COL": props.hasNote ? "X" : "",
          "EMPL_COL": props.hasEmployees ? "X" : "",
          "FILE_COL": props.hasAttachFiles ? "X" : "",

          "KKKK0000": data.COMPCODE + data.DCMNCODE //"<Mã chứng từ"           //== Gồm CompCode + DcmnCode
        }
      ]
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentTemplateAPI.update, request)
      .then((res) => {
        setData(res.data);

        if(callBack){
          callBack(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    updateItem: updateItem,
    data: data,
    error:error,
  }
}

const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T00:26:40.0485866+07:00",
  "RETNMSSG": "Cập nhật dữ liệu thành công.",
  "RETNDATA": [
    {
      "COMPCODE": "PMC",
      "DCMNCODE": "PMC_024",
      "DCMNNAME": "PMC_024",
      "CODE_COL": "X",
      "DATE_COL": "X",
      "LOGO_COL": "X",
      "CNTN_COL": "X",
      "NOTE_COL": "",
      "VLUE_COL": "X",
      "EMPL_COL": "X",
      "FILE_COL": "X",
      "DDDD": "",
      "ACCERGHT": 79,
      "STTESIGN": 0,
      "STTENAME": "",
      "KKKK0000": "PMCPMC_024",
      "CRT_USER": "000005",
      "CRT_DATE": "2023-09-29T23:17:22",
      "CHGEUSER": "000005",
      "CHGEDATE": "2023-09-30T00:26:40.0173471+07:00",
      "USEDSTTE": 1,
      "PPPP0000": "",
      "CCCC0000": ""
    }
  ]
}