import {useState} from "react";
import {ProcessAPI} from "./api";
import api from "../../../api";
import {STORAGE} from "../../../comps/utils/storage";

export default function deleteProcess(){

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const deleteItem = (data, callBack)  => {
    const company = STORAGE.getCompany();
    const KEY_CODE = company.COMPCODE + data.templateCode + data.processCode;

    const request = {
      "DCMNCODE":"apvSctnDesn",
      "KEY_CODE": KEY_CODE,
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(ProcessAPI.delete, request)
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
    deleteItem: deleteItem,
    data: data,
    error:error,
  }
}

export function generateProcessKey (COMPCODE, DOC_CODE, PROCESS_CODE) {
  return `${COMPCODE}${DOC_CODE}${PROCESS_CODE}`
}