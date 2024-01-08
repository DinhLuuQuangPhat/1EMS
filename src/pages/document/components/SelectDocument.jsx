import React, {useEffect, useState} from "react";

import Select from "../../../comps/input/Select";
import {useStateContext} from "../../../context/ContextProvider";
import loadDocument from "../services/loadDocument";
import {Action} from "../../../comps/workspace/actions";

export default function SelectDocument({action, templateCode, value, onChange, onOptionChange}) {
  const {appColors} = useStateContext();
  const {getItems, data} = loadDocument();

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if(templateCode || action.action === Action.refresh){
      getItems(templateCode);
    }
  }, [templateCode, action]);

  useEffect(() => {
    onOptionChange(documents.length);
  }, [documents.length]);

  useEffect(() => {
    if (data && data.RETNDATA != null) {
      const options = data.RETNDATA.map((dt) => {
        return {id: dt.KKKK0000, text: dt.KKKK0000 + '-' + dt.MAINCODE}
      });
      setDocuments(options);
    }
  }, [data]);

  const handleOnChange = (KKKK0000) => {
    onChange(KKKK0000);
  }

  return (
    <Select
      placeholder={"Chọn số chứng từ"}
      className={appColors.inputColor}
      options={documents}
      value={value}
      onChange={handleOnChange}
    />
  )
}