import {useState} from "react";
import api from "../../../api";
import {ProcessAPI} from "./api";
import {STORAGE} from "../../../comps/utils/storage";

export default function createProcess() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const createItem = (data, steps, callBackFunc) => {
    const company = STORAGE.getCompany();

    const request = {
      "DCMNCODE": "apvSctnDesn", "HEADER": [{
        "COMPCODE": company.COMPCODE, //"<Mã công ty>",

        "DCMNCODE": data.DCMNCODE, //"<Tên loại chứng từ>",
        "DCMNNAME": data.DCMNNAME, //"<Tên loại chứng từ>",

        "SCTNCODE": data.SCTNCODE, //"<Mã quy trình>",
        "SCTNNAME": data.SCTNNAME, //"<Tên quy trình>",
        "HAS_COND": data.HAS_COND, //"<Quy trình có điều kiện hay không?>",
        "CMPROPRT": data.HAS_COND ? data.CMPROPRT : 0, //"<Mã số phép toán so sánh>",
        "VLUENUMB": data.HAS_COND ? data.VLUENUMB : 0, //"<Giá trị so sánh>",
        "NOTETEXT": data.NOTETEXT ?? "", //"<Ghi chú>",

        "DETAIL": steps

      }]
    }

    api(localStorage.getItem("usertoken"))
      .post(ProcessAPI.create, request)
      .then((res) => {
        if(res.data.RETNCODE){
          const result = res.data.RETNDATA[0];
          setData(result);

          if (callBackFunc) {
            callBackFunc(result);
          }
        } else {
          throw new Error('Cannot create process');
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    createItem: createItem, data: data, error: error,
  }
}

export const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-10-06T09:19:34.6174079+07:00",
  "RETNMSSG": "Cập nhật dữ liệu thành công.",
  "RETNDATA": [
    {
      "COMPCODE": "PMC",
      "DCMNCODE": "PMC_036",
      "SCTNCODE": "002",
      "SCTNNAME": "Quy trinh 01",
      "HAS_COND": 0,
      "CMPROPRT": 0,
      "VLUENUMB": 0,
      "DDDD": "APVSCTNDESN",
      "ACCERGHT": 79,
      "STTESIGN": 0,
      "STTENAME": "",
      "KKKK0000": "PMCPMC_036002",
      "CRT_USER": "000005",
      "CRT_DATE": "2023-10-06T09:19:34",
      "CHGEUSER": "000005",
      "CHGEDATE": "2023-10-06T09:19:34",
      "USEDSTTE": 1,
      "PPPP0000": "",
      "CCCC0000": "PMCPMC_036002",
      "DETAIL": [
        {}
      ]
    }
  ]
}
export function generateStepData(step, WORKNAME, ROLEAPRV, PRCSCODE, PRCSLIST, PSJBTYPE, PSJBCODE, DLAYTYPE, DLAYTIME, SENDMAIL, NOTETEXT) {
  return {
    "PRCSODER": step,
    "WORKNAME": WORKNAME, //"<Tên bước Trình ký>",
    "ROLEAPRV": ROLEAPRV, //"<Vai tró xét duyệt>", //== 1:Trình ký, 2:Phê duyệt, 3:Thực hiện
    "PRCSCODE": PRCSCODE, //"001",
    "PRCSLIST": PRCSLIST, //"%",
    "PSJBTYPE": PSJBTYPE, //2,
    "PSJBCODE": PSJBCODE, //"000006,000007,000008",
    "DLAYTYPE": DLAYTYPE, //"",
    "DLAYTIME": DLAYTIME, //0,
    "SENDMAIL": SENDMAIL, //1,
    "NOTETEXT": NOTETEXT, // ""
  }
}