import {useState} from "react";
import api from "../../../api";
import {ProcessAPI} from "./api";

export default function updateProcess() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const updateItem = (data, DCMNNAME, steps, callBackFunc) => {
    const request = {
      "DCMNCODE": "apvSctnDesn",

      "HEADER": [{
        "COMPCODE": data.COMPCODE,

        "DCMNCODE": data.DCMNCODE,
        "DCMNNAME": DCMNNAME,

        "SCTNCODE": data.SCTNCODE,
        "SCTNNAME": data.SCTNNAME,
        "HAS_COND": data.HAS_COND,
        "CMPROPRT": data.CMPROPRT ? data.CMPROPRT :  0,
        "VLUENUMB": data.VLUENUMB,
        "NOTETEXT": data.NOTETEXT,

        "DETAIL": steps,
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
    updateItem: updateItem, data: data, error: error,
  }
}
