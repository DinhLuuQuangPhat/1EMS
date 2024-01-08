import styled from "styled-components";
import React, {useEffect, useMemo, useState} from "react";
import {useStateContext} from "../../../context/ContextProvider";
import {useTextEditorContext} from "../context/TextEditorProvider";
import Select from "../../input/Select";
import getListEmployee from "../../../pages/document/services/getListEmployee";

export default function EditorUser(props) {
  const {data} = getListEmployee(true);
  const {values} = useTextEditorContext();

  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");

  const userCode = useMemo(() => {
    return values[props.name];
  }, [values, props.name]);

  useEffect(() => {
    if (data && userCode) {
      const exits = data.RETNDATA.filter((dt) => {
        return dt.ItemCode === userCode;
      });

      if(exits.length > 0){
        setCustomerName(exits[0].ItemName);
      } else {
        setCustomerName("");
      }
      setCustomers(customers);
    }
  }, [data, userCode]);

  return (
    <EditorUserStyle className={'editor-review-comp input-user'}>
      {customerName}
    </EditorUserStyle>
  )
}

export function EditorUserCompose(props) {
  const {appColors} = useStateContext();
  const {data} = getListEmployee(true);
  const {values, onChange} = useTextEditorContext();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (data) {
      const customers = data.RETNDATA.map((dt) => {
        return {id: dt.ItemCode, text: dt.ItemName}
      });
      setCustomers(customers);
    }
  }, [data]);
  const handleOnChange = (value) => {
    if(props.onChange){
      props.onChange(props.name, value);
    } else {
      onChange(props.name, value);
    }
  }

  return (
    <ComposeStyle>
      <Select
        placeholder={"Chọn nhân viên"}
        className={appColors.inputColor}
        options={customers}
        value={values[props.name]}
        onChange={handleOnChange}
      />
    </ComposeStyle>
  )
}

const ComposeStyle = styled.div`
 display: inline-flex;
`;

const EditorUserStyle = styled.span`
  
`;
