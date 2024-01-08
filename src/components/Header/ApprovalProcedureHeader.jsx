import React from "react";
import { v4 } from "uuid";

const ApprovalProcedureHeader = (props) => {
  return (
    <>
      {props.dataApprovalProcedure.data.map((item) => (
        <div key={v4()}>
          <div className="ml-3">
            <div className="text-black">
              {item.PRCSODER}. {item.EMPLNAME} {" - "}
              <span className="text-primary">{item.FLOWNAME}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApprovalProcedureHeader;
