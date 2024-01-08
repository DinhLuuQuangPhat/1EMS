import React, {useEffect, useState} from "react";
import getProcessByDocumentTemplate from "../services/getProcessByDocumentTemplate";
import Select from "../../../comps/input/Select";
import {Action} from "../../../comps/workspace/actions";

export default function SelectProcess({action, templateCode, value, onChange, onLoaded}) {
  const {getProcesses, data} = getProcessByDocumentTemplate();
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    if (templateCode != null && templateCode !== "") {
      getProcesses(templateCode);
    } else {
      setProcesses([]);
    }
  }, [templateCode]);

  useEffect(() => {
    if(action.action === Action.refresh && templateCode != null && templateCode !== ""){
      getProcesses(templateCode);
      onChange("");
      onLoaded(0);
    } else if(action.action === Action.reload && templateCode != null && templateCode !== ""){
      getProcesses(templateCode);
    }
  }, [action.action]);

  useEffect(() => {
    if (data != null) {
      const process = [];
      data.forEach((it) => {
        process.push( {id: it.ITEMCODE, text: it.ITEMNAME})
      });
      setProcesses(process);
      onLoaded(data.length);
    } else {
      setProcesses([]);
      onLoaded(0);
    }
  }, [data]);

  const handleOnChange = (id, text) => {
    onChange(id, text)
  }

  return (
    <Select placeholder="Chọn quy trình"
            value={value ?? ""}
            options={processes}
            onChange={handleOnChange}/>
  )
}