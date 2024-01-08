import {useState} from "react";
import api from "../../../api";
import {DocumentAPI} from "./api";

export default function loadDocument(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getItems = (ITEMCODE)  => {
    const request = {
      "DCMNCODE":"inpDcmnVrch",
      "STTESIGN":7,
      "BEG_DATE":"1990-01-01",
      "END_DATE":"3000-12-31",
      "ADD_COND": `DcmnCode = '${ITEMCODE}' AND UsedStte > 0`
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentAPI.loadTemplate, request)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    getItems: getItems,
    data: data,
    error:error,
  }
}

const success = {


}