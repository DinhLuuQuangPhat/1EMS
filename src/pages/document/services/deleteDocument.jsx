import {useState} from "react";
import api from "../../../api";
import {DocumentAPI} from "./api";

export default function useDeleteDocument(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const deleteItem = (KEY_CODE, onSuccessFunc, onErrorFunc)  => {
    const request = {
      "DCMNCODE": "inpDcmnVrch",
      "KEY_CODE": KEY_CODE // "PMCPMC_075PMC231101002"  // Key Code này thay đôi
    }
    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentAPI.delete, request)
      .then((res) => {
        setData(res.data);

        if(onSuccessFunc){
          onSuccessFunc(res.data);
        }
      })
      .catch((err) => {
        setError(err);
        if(onErrorFunc){
          onErrorFunc()
        }
      });
  };

  return {
    deleteItem: deleteItem,
    data: data,
    error:error,
  }
}
