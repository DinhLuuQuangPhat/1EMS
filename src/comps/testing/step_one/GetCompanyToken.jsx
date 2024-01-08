import {useEffect, useState} from "react";
import useGetCompanyToken, {setting as CompSetting} from "../../../pages/entry/services/useGetCompanyToken";
import ButtonGroup from "../../button/ButtonGroup";
import Button from "../../button/Button";
import InputValue from "../../input/InputValue";
import styled from "styled-components";
import useGetLoginToken, {setting as LoginSetting} from "../../../pages/entry/services/useGetLoginToken";
import useGetLoginCompanyToken from "../../../pages/entry/services/useGetLoginCompanyToken";

import { Stepper } from "@progress/kendo-react-layout";
import {EditorTemplateDemo} from "../../../pages/document/components/design/template";

const items = [
  {
    label: "Comp Token",
    icon: "k-i-marker-pin-target",
  },
  {
    label: "Login Token",
    icon: "k-i-marker-pin-target",
  },
  {
    label: "Login Comp Token",
    icon: "k-i-marker-pin-target",
  },
  {
    label: "Login",
    icon: "k-i-preview",
  }
];

const LoginStep = {
  getComToken: 0,
  getLoginToken: 1,
  getComLoginToken: 2,
  login: 3,
}
export default function GetCompanyToken(props) {
  const [step, setStep] = useState(LoginStep.getComToken);

  const {getCompanyToken, data : companyData} = useGetCompanyToken();
  const {getLoginToken, data: loginData} = useGetLoginToken();
  const {getLoginCompanyToken, data: loginComData} = useGetLoginCompanyToken();

  useEffect(() => {
    if (companyData != null) {
      setStep(LoginStep.getLoginToken)
    }
  }, [companyData]);

  useEffect(() => {
    if (loginData != null) {
      setStep(LoginStep.getComLoginToken)
    }
  }, [loginData]);

  useEffect(() => {
    if (loginComData != null) {
      setStep(LoginStep.login)
    }
  }, [loginComData]);


  const loadCompanyToken = () => {
    getCompanyToken();
  }

  const loadLoginToken = () => {
    getLoginToken(companyData);
  }

  const loadLoginCompToken = (token) => {
    getLoginCompanyToken(token);
  }

  return (
    <div className={'get-company-token'}>
      <EditorTemplateDemo />

      <Stepper value={step} items={items} />

      {step === LoginStep.getComToken && (
        <LoadLoginCompanyForm onClick={loadCompanyToken} />
      )}

      {step === LoginStep.getLoginToken && (
        <LoadLoginTokenForm data={companyData} onClick={loadLoginToken} />
      )}

      {step === LoginStep.getComLoginToken && (
        <LoadLoginCompanyTokenForm data={loginData} onClick={loadLoginCompToken} />
      )}

      {step === LoginStep.login && (
        <ShowLoginCompanyTokenInfo data={loginComData} />
      )}

      {props.children}
    </div>
  )
}

const ShowLoginCompanyTokenInfo = (props) => {
  const [detail, showDetail] = useState(false);

  const toggleDetail = () => {
    showDetail(!detail);
  }

  return (
    <FormLayout>
      <h1>Login with Provided data</h1>

      <InputValue label={"TOKEN"}>
        {JSON.stringify(props.data.RETNDATA.TOKEN)}
      </InputValue>

      <ButtonGroup align={"center"}>
        <Button onClick={toggleDetail}>{detail ? 'Close': 'Show Detail' }</Button>
      </ButtonGroup>

      {detail && (
        <>
          <hr className={'mt-5 mb-5'}/>

          <InputValue label={"Payload"}>
            {JSON.stringify(props.data)}
          </InputValue>
        </>
      )}
    </FormLayout>
  )
}

const LoadLoginCompanyTokenForm = (props) => {
  return (
    <FormLayout>
      <h1>Load Login Company Token</h1>

      <InputValue label={"Payload"}>
        {JSON.stringify(props.data.RETNDATA.TOKEN)}
      </InputValue>

      <ButtonGroup align={"center"}>
        <Button onClick={() => props.onClick(props.data.RETNDATA.TOKEN)}>Load Login Token</Button>
      </ButtonGroup>
    </FormLayout>
  )
}
const LoadLoginTokenForm = (props) => {
  return (
    <FormLayout>
      <h1>Load Login Token</h1>

      <InputValue label={"Login Token"}>
        {props.data.RETNDATA.TOKEN}
      </InputValue>

      <InputValue label={"Payload"}>
        {JSON.stringify(LoginSetting)}
      </InputValue>

      <ButtonGroup align={"center"}>
        <Button onClick={props.onClick}>Load Login Token</Button>
      </ButtonGroup>
    </FormLayout>
  )
}
const LoadLoginCompanyForm= (props) => {
  return (
    <FormLayout>
      <h1>Load Company Token</h1>

      <InputValue label={"token"}>
        {CompSetting.token}
      </InputValue>

      <InputValue label={"COMPCODE"}>
        {CompSetting.body.COMPCODE}
      </InputValue>

      <InputValue label={"APP_CODE"}>
        {CompSetting.body.APP_CODE}
      </InputValue>

      <InputValue label={"SYSTCODE"}>
        {CompSetting.body.SYSTCODE}
      </InputValue>

      <ButtonGroup align={"center"}>
        <Button onClick={props.onClick}>Load company data</Button>
      </ButtonGroup>
    </FormLayout>
  )
}

const FormLayout = styled.div`
  margin: 30px;
  padding: 15px;
  background: #FFF;
  border: 1px solid #000;
`;