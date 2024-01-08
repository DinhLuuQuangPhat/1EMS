import {useState} from "react";
import api from "../../../api";
import {DocumentTemplateAPI} from "./api";
import {comCodeCommon} from "../../../constants";

export default function createDocumentTemplate(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const createItem = (DCMNCODE, DCMNNAME, callBack)  => {
    const request = {
      "DCMNCODE":"DTADCMNDESN",

      "HEADER":[
        {
          "COMPCODE": comCodeCommon,
          "DCMNCODE": DCMNCODE,
          "DCMNNAME": DCMNNAME,

          "LOGO_COL": "", //"<(String) Field Logo>", //== Có chọn Logo_Col = "X", Không chọn Logo_Col = "",
          "CODE_COL": "", //"<(String) Field số chứng từ>", //== Có chọn Code_Col = "X", Không chọn Code_Col = ""
          "DATE_COL": "", //"<(String) Field ngày chứng từ>", //== Có chọn Date_Col = "X", Không chọn Date_Col = ""
          "VLUE_COL": "", //"<(String) Field giá trị>", //== Có chọn Vlue_Col = "X", Không chọn Vlue_Col = ""
          "CNTN_COL": "", //"<(String) Field nội dung>", //== Có chọn Cntn_Col = "X", Không chọn Cntn_Col = ""
          "NOTE_COL": "", //"<(String) Field ddiexn giải>", //== Có chọn Note_Col = "X", Không chọn Note_Col = ""
          "EMPL_COL": "", //"<(String) Field người nhận>", //== Có chọn Empl_Col = "X", Không chọn Empl_Col = ""
          "FILE_COL": "", //"<(String) Field đính kèm>" //== Có chọn File_Col = "X", Không chọn File_Col = ""
        }
      ]
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentTemplateAPI.create, request)
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
    createItem: createItem,
    data: data,
    error:error,
  }
}

const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T00:22:30.40793+07:00",
  "RETNMSSG": "Cập nhật dữ liệu thành công.",
  "RETNDATA": [
    {
      "COMPCODE": "PMC",
      "DCMNCODE": "PMC_027",
      "DCMNNAME": "PMC_027_KTRAN",
      "CODE_COL": "",
      "DATE_COL": "",
      "LOGO_COL": "",
      "CNTN_COL": "",
      "NOTE_COL": "",
      "VLUE_COL": "",
      "EMPL_COL": "",
      "FILE_COL": "",
      "DDDD": "",
      "ACCERGHT": 79,
      "STTESIGN": 0,
      "STTENAME": "",
      "KKKK0000": "PMCPMC_027",
      "CRT_USER": "000005",
      "CRT_DATE": "2023-09-30T00:22:30.3767219+07:00",
      "CHGEUSER": "000005",
      "CHGEDATE": "2023-09-30T00:22:30.3767219+07:00",
      "USEDSTTE": 1,
      "PPPP0000": "",
      "CCCC0000": ""
    }
  ]
}