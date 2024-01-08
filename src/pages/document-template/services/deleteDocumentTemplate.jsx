import {useState} from "react";
import api from "../../../api";
import {DocumentTemplateAPI, getDocumentTemplateCode} from "./api";

export default function deleteDocumentTemplate(){

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /*
  * @Params: KEY_CODE "<Khóa của mã số mẫu chứng từ>"
  * */
  const deleteItem = (KEY_CODE, callBack)  => {
    const keyCode = getDocumentTemplateCode(KEY_CODE);

    const request = {
      "DCMNCODE":"DTADCMNDESN",
      "KEY_CODE": keyCode
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentTemplateAPI.delete, request)
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

// ???
const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T00:24:20.0498632+07:00",
  "RETNMSSG": "Xóa dữ liệu thành công.",
  "RETNDATA": null
}