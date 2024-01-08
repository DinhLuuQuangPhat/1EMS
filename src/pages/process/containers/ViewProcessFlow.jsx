import React, {useEffect, useMemo} from "react";
import styled from "styled-components";
import ViewProcessCondition from "../component/form/ViewProcessCondition";
import ProcessIcon from "../component/item/ProcessIcon";
import ProcessHeader from "../component/item/ProcessHeader";
import viewProcessDetail from "../services/viewProcessDetail";
import {ProcessStepCategoryProvider} from "../context/ProcessStepProvider";

export default function ViewProcessFlow({templateCode, processCode}) {
  const {viewProcess, data} = viewProcessDetail();

  const hasData = useMemo(() => {
    return data && data.DETAIL != null && data.DETAIL.length > 0 && data.DETAIL[0].ROLEAPRV;
  }, [data]);

  useEffect(() => {
    viewProcess(templateCode, processCode)
  }, [templateCode, processCode]);

  return (
    <ProcessStepCategoryProvider>
      <ViewProcessFlowStyle
        className={"view-process-flow border-solid border-1 border-blue-700 bg-gray-50 mt-5 view-mode"}>
        {data && (
          <>
            {hasData ? (
              <>
                <ProcessHeader process={data}/>

                <div className={'view-process-step flex mt-5 p-3'}>
                  {data.DETAIL != null && data.DETAIL.length > 0 && data.DETAIL.map((process, index) => {
                    return (
                      <React.Fragment key={process.PRCSODER}>
                        {index > 0 && (
                          <div className={'view-process-arrow'}>→</div>
                        )}
                        <ProcessIcon index={index} group={process.ROLEAPRV} name={process.WORKNAME}/>
                      </React.Fragment>
                    )
                  })}
                </div>

                <div className={'view-process-content'}>
                  {data.DETAIL != null && data.DETAIL.length > 0 && data.DETAIL.map((process, index) => {
                    return (
                      <React.Fragment key={process.PRCSODER}>
                        <ViewProcessCondition index={index + 1} process={process}/>
                      </React.Fragment>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className={'view-process-content empty-data'}>No data....</div>
            )}
          </>
        )}
      </ViewProcessFlowStyle>
    </ProcessStepCategoryProvider>
  )
}

const ViewProcessFlowStyle = styled.div`
  .view-process-step {
    border-bottom: 1px solid #000;
  }

  .process-step-condition {
  }
  
  .view-process-content.empty-data{
    padding: 2em 5em;
    text-align: center;
  }

`;

