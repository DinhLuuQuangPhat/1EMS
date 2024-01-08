import React from "react";
import { v4 } from "uuid";
import moment from "moment";

const ApprovalProgressHeader = (props) => {
  return (
    <>
      {props.dataApprovalProgress.data[0].DETAIL.map((item) => (
        <div key={v4()} className="text-pretty">
          {/* <div> */}
          <div className="text-black font-semibold">
            <p>
              {item.PRCSAPRV} {". "} {item.EMPCNAME}
            </p>
          </div>
          <div className="ml-3 text-pretty">
            <p className="text-black">
              Ngày: {moment(item.PRCSDATE).format("DD-MM-YYYY HH-MM-SS")}
            </p>
            <p className="text-black">{item.PRCSNAME}</p>
            <p className="text-black">{item.PRCSNOTE}</p>
          </div>
          {/* </div> */}
        </div>
      ))}
    </>
  );
};

export default ApprovalProgressHeader;
