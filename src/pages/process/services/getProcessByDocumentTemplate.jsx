import {useState} from "react";
import api from "../../../api";
import {ProcessAPI} from "./api";

export default function getProcessByDocumentTemplate() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getProcesses = (DcmnCode) => {
    const request = {
      "LISTCODE": "lstDcmnSctn",
      "CONDFLTR": ` DcmnCode = '${DcmnCode}'`,
      "LISTOPTN": 4
    }

    api(localStorage.getItem("usertoken"))
      .post(ProcessAPI.list, request)
      .then((res) => {
        if(res.data.RETNCODE && res.data.RETNDATA && res.data.RETNDATA.length > 0){
          setData(res.data.RETNDATA);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    getProcesses: getProcesses, data: data, error: error,
  }
}

export const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-10-06T10:18:25.6864206+07:00",
  "RETNMSSG": "Đọc dữ liệu thành công",
  "RETNDATA": [
    {
      "KEY_CODE": "lstDcmnSctn002",
      "LISTCODE": "lstDcmnSctn",
      "ITEM_KEY": "002",
      "ITEMCODE": "002",
      "ITEMNAME": "To trinh nhan su Process 02",
      "ITEMSRCH": "002 - To trinh nhan su Process 02",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "002"
    }
  ]
}