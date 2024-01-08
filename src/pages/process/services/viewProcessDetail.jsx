import {useState} from "react";
import api from "../../../api";
import {ProcessAPI} from "./api";
import {STORAGE} from "../../../comps/utils/storage";

export default function viewProcessDetail() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const viewProcess = (templateCode, processCode) => {
    const company = STORAGE.getCompany();
    const KEY_CODE = company.COMPCODE + templateCode + processCode;

    const request = {
      "DCMNCODE":"apvSctnDesn",
      "KEY_CODE": KEY_CODE // //== <Mã khoá Quy trình> = <Mã công ty> + <Mã loại chứng từ> + <Mã quy trình>
    }

    api(localStorage.getItem("usertoken"))
      .post(ProcessAPI.view_detail, request)
      .then((res) => {
        if(res.data.RETNCODE && res.data.RETNDATA && res.data.RETNDATA.length > 0){
          const record = res.data.RETNDATA[0];
          setData(record);
        } else {
          const record = success.RETNDATA[0];
          setData(record);

          throw new Error("Cannot get process");
        }
      })
      .catch((err) => {
        setError(err);
        const record = success.RETNDATA[0];
        setData(record);
      });
  };

  return {
    viewProcess: viewProcess, data: data, error: error,
  }
}

export const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-10-06T10:39:57.8266429+07:00",
  "RETNMSSG": "Đọc dữ liệu thành công",
  "RETNDATA": [
    {
      "COMPCODE": "PMC",
      "DCMNCODE": "PMC_035",
      "SCTNCODE": "001",
      "SCTNNAME": "Tuyển nhân sự",
      "HAS_COND": 0,
      "CMPROPRT": 0,
      "VLUENUMB": 0,
      "DDDD": "APVSCTNDESN",
      "ACCERGHT": 79,
      "STTESIGN": 0,
      "STTENAME": "",
      "KKKK0000": "PMCPMC_035001",
      "DETAIL": [
        {
          "COMPCODE": "PMC",
          "DCMNCODE": "PMC_035",
          "SCTNCODE": "001",
          "PRCSODER": 0,
          "WORKNAME": "Nhân viên trình ký",
          "ROLEAPRV": 1,
          "PRCSCODE": "001",
          "PRCSLIST": "%",
          "PSJBTYPE": 2,
          "PSJBCODE": "000004",
          "CONDFLTR": "",
          "LOCKSIGN": 1,
          "UNLKSIGN": 0,
          "DLAYTYPE": "",
          "DLAYTIME": 0,
          "SENDOPTN": 0,
          "SENDMAIL": 4,
          "NOTETEXT": "",
          "KKKK0001": "PMCPMC_035001                0.00"
        },
        {
          "COMPCODE": "PMC",
          "DCMNCODE": "PMC_035",
          "SCTNCODE": "001",
          "PRCSODER": 1,
          "WORKNAME": "Trưởng bộ phận duyệt",
          "ROLEAPRV": 2,
          "PRCSCODE": "002",
          "PRCSLIST": "%",
          "PSJBTYPE": 2,
          "PSJBCODE": "000002",
          "CONDFLTR": "",
          "LOCKSIGN": 100,
          "UNLKSIGN": 1,
          "DLAYTYPE": "",
          "DLAYTIME": 0,
          "SENDOPTN": 0,
          "SENDMAIL": 5,
          "NOTETEXT": ".",
          "KKKK0001": "PMCPMC_035001                1.00"
        },
        {
          "COMPCODE": "PMC",
          "DCMNCODE": "PMC_035",
          "SCTNCODE": "001",
          "PRCSODER": 2,
          "WORKNAME": "Người thực hiện",
          "ROLEAPRV": 3,
          "PRCSCODE": "006",
          "PRCSLIST": "%",
          "PSJBTYPE": 1,
          "PSJBCODE": "000010",
          "CONDFLTR": "",
          "LOCKSIGN": 110,
          "UNLKSIGN": 100,
          "DLAYTYPE": "",
          "DLAYTIME": 0,
          "SENDOPTN": 0,
          "SENDMAIL": 9,
          "NOTETEXT": "",
          "KKKK0001": "PMCPMC_035001                2.00"
        }
      ]
    }
  ]
}

