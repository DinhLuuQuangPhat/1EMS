import {useState} from "react";
import api from "../../../api";
import {DocumentAPI} from "./api";

export default function viewDocumentDetail(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const viewDetail = (data, callBackFunc)  => {
    const request = {
      "DCMNCODE":"inpDcmnVrch",
      "KEY_CODE": data.KKKK0000 // Giá trị này sẽ thay đổi
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentAPI.viewDetail, request)
      .then((res) => {
        setData(res.data);

        if(callBackFunc){
          callBackFunc(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    viewDetail: viewDetail,
    data: data,
    error:error,
  }
}