import {useState} from "react";
import api from "../../../api";
import {apiUrl} from "../../../constants";

export const setting = {
  "COMPCODE": "PMC",
  "LCTNCODE": "001"
}
export default function useGetLoginCompanyToken() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getLoginCompanyToken = (token) => {
    api(token)
      .post(apiUrl.locationLogin.value, {
        ...setting
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return {
    getLoginCompanyToken: getLoginCompanyToken,
    data: data,
    error: error,
  }
}