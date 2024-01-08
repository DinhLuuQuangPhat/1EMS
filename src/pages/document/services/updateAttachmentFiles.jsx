import {useState} from "react";
import api from "../../../api";
import {DocumentAPI} from "./api";

export default function updateAttachmentFiles(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const updateAttachments = (DCMNCODE, KEY_CODE, files)  => {
    const request = {
      "DCMNCODE":"inpDcmnVrch",
      "STTESIGN":7,
      "FILES": files,
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentAPI.updateAttachment, request)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    updateAttachments: updateAttachments,
    data: data,
    error:error,
  }
}