import {useState} from "react";

export const setting = {
  token: "CmzFIKFr7UvPe6zBPBtn3nkrWOY3UYSLLnTfii/H9QG56Ur6b9XtFty3M9tBEKV1l3d+0mGEXmfQyuGFjrNHYGSODDy+ihkBm sHYUNPgD44=",
  body: {
    "COMPCODE": "PMC",
    "APP_CODE": "AER",
    "SYSTCODE": 4
  }
}

import api from "../../../api";
import { apiUrl } from "../../../constants";

export default function useGetCompanyToken(){
  const [companyToken, setCompanyToken] = useState(null);
  const [error, setError] = useState(null);

  const getCompanyToken = ()  => {
    api(
      setting.token
    )
      .post(apiUrl.config.value, setting.body)
      .then((res) => {
        setCompanyToken(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    getCompanyToken: getCompanyToken,
    data: companyToken,
    error:error,
  }
}