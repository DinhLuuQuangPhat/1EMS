import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import React from "react";
import ButtonText from "../button/ButtonText";
import {ButtonIcons} from "../button/ButtonIcons";
import routers from "../../pages/entry/routers/routers";
export default function PageLayout(props) {
  const navigate = useNavigate();
  const handlePrevious = function () {
    navigate(routers.index);
  }

  return (
    <PageLayoutStyle className={`page-layout p-2 ${props.className ?? ''}`}>
      <div className={"p-3 flex justify-between items-center"}>
        <div className="order-first flex items-center">
          <ButtonText icon={ButtonIcons.back} onClick={handlePrevious}/>

          <div>
            <h2 className="text-lg font-semibold">{props.title}</h2>
          </div>
        </div>
      </div>

      <div className={"page-layout-content"}>{props.children}</div>
    </PageLayoutStyle>
  )
}

const PageLayoutStyle = styled.div`
  h1 {
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 125%;
    line-height: 2;
  }
`;