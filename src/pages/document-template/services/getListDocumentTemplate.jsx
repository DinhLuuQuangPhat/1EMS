import {useState} from "react";
import api from "../../../api";
import {DocumentTemplateAPI} from "./api";

export default function getListDocumentTemplate() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getListItem = () => {
    const request = {
      "LISTCODE": "app_DcmnList",
      "CONDFLTR": "(DcmnType & 1) = 1",
      "LISTOPTN": 4
    }

    api(
      localStorage.getItem("usertoken")
    )
      .post(DocumentTemplateAPI.list, request)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    getListItem: getListItem,
    data: data,
    error: error,
  }
}

const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T00:22:30.6735453+07:00",
  "RETNMSSG": "Đọc dữ liệu thành công",
  "RETNDATA": [
    {
      "KEY_CODE": "app_DcmnListPMC_010",
      "LISTCODE": "app_DcmnList",
      "ITEM_KEY": "PMC_010",
      "ITEMCODE": "PMC_010",
      "ITEMNAME": "ABC_DEF",
      "ITEMSRCH": "PMC_010 - ABC_DEF",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "ABC_DEF"
    }
  ]
}