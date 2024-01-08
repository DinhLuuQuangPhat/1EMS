import React, {useEffect, useState} from "react";

import Select from "../../../comps/input/Select";
import {useStateContext} from "../../../context/ContextProvider";
import getListDocumentTemplate from "../services/getListDocumentTemplate";
import {Action} from "../../../comps/workspace/actions";


export default function SelectDocumentTemplate({defaultValue, value, onChange, action}) {
  const {appColors} = useStateContext();
  const {getListItem, data} = getListDocumentTemplate();

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getListItem();
  }, []);

  useEffect(() => {
    if(action != null && action.action === Action.refresh){
      getListItem();
    }
  }, [action]);

  useEffect(() => {
    if (data && data.RETNDATA != null && data.RETNDATA.length > 0) {
      const options = data.RETNDATA.map((it) => {
        return {id: it.ITEMCODE, text: it.ITEMCODE + " - " + it.ITEMNAME}
      });
      setDocuments(options);
    }
  }, [data]);

  useEffect(() => {
    if(defaultValue && documents != null && documents.length > 0){
      handleOnChange(defaultValue);
    }
  },[defaultValue, documents])

  const handleOnChange = (ITEMCODE) => {
    if(ITEMCODE != null && ITEMCODE !== "" && data != null && data.RETNDATA != null && data.RETNDATA.length > 0){
      const filter = data.RETNDATA.filter((it) => {
        return it.ITEMCODE === ITEMCODE;
      });

      onChange(filter.length > 0 ? filter[0]: null);
    } else {
      onChange(null)
    }
  }

  return (
    <Select
      placeholder={"Chọn loại chứng từ"}
      className={appColors.inputColor}
      options={documents}
      value={value ?? ""}
      onChange={handleOnChange}
    />
  )
}