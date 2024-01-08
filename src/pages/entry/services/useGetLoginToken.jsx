import api from "../../../api";
import {apiUrl} from "../../../constants";
import {useState} from "react";

export const setting = {
  "LGGECODE": "v",
  "PASSWORD": "11111111",
  "PHONNAME": "",
  "SYSTCODE": 4,
  "COMPCODE": "PMC",
  "USERLGIN": "000005",
  "TKENDEVC": "",
  "APP_CODE": "AER"
}
export default function useGetLoginToken(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getLoginToken = (res) => {
    const bodyComp = {...setting};

    api(res.RETNDATA.TOKEN)
      .post(apiUrl.sysLogin.value, JSON.stringify(bodyComp))
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
      setError(err);
    });
  }

  return {
    getLoginToken: getLoginToken,
    data: data,
    error: error,
  }
}