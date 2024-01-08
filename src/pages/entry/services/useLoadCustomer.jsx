import api from "../../../api";
import {apiUrl} from "../../../constants";
import {useEffect, useState} from "react";

export default function useLoadCustomer(autoLoad) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(autoLoad){
      loadCustomer();
    }
  }, [autoLoad]);

  const loadCustomer = () => {
    if(localStorage.getItem("userData")){
      api(localStorage.getItem("usertoken"))
        .post(apiUrl.listCustomer.value, {
          DCMNCODE: "appCustList",
          EMPLCODE: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
          PARACODE: "001",
          KEY_WORD: "%",
        })
        .then((res) => {

          var data = res.data;
          var returnCode = data.RETNCODE;
          var returnData = data.RETNDATA;
          if (returnCode) {
            returnData.map((item) => {
              item.Display = item.CUSTNAME + " (#" + item.CUSTCODE + ")";
            });
            setData(returnData);
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  }

  return {
    loadCustomer, data, error
  }
}