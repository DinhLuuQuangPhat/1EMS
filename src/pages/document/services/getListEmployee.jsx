import {useEffect, useState} from "react";
import api from "../../../api";
import {DocumentAPI} from "./api";

export default function getListEmployee(autoLoad){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if(autoLoad){
      getEmployees();
    }
  }, [autoLoad]);

  const getEmployees = ()  => {
    const request = {
      "LISTCODE":"lstEmployee"
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentAPI.getEmployee, request)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    getEmployees: getEmployees,
    data: data,
    error:error,
  }
}