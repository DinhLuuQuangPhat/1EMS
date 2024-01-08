import {ProcessConditionType, useProcessStepCategory} from "../../../context/ProcessStepProvider";
import React, {useMemo} from "react";
import {SelectPOSITIONS, SelectPSJBCODE_DMC} from "./SelectProcessRole";

export function ViewProcessValue({multiple, type, PSJBTYPE, value}) {
  const data = useProcessStepCategory();

  const valueType = useMemo(() => {
    if(value != null){
      return value + "";
    } else {
      return null;
    }
  }, [value]);

  const showWorkName = () => {
    return <span>{value}</span>
  }

  const getROLEAPRV = () => {
    const filter = data.ROLEAPRV.filter((rl) => {
      return rl.id + "" === valueType;
    });
    return filter.length > 0 ? filter[0].text : value;
  }

  const getPSJBTYPE = () => {
    const filter = data.PSJBTYPE.filter((rl) => {
      return rl.id + "" === valueType;
    });
    return filter.length > 0 ? filter[0].text : "";
  }

  const getPSJBCODE = () => {
    const ids = valueType ? valueType.split(",") : "";
    const options = (PSJBTYPE === 2 || PSJBTYPE === "2")
      ? data.POSITIONS :
      (PSJBTYPE === 3 || PSJBTYPE === "3") ? data.EMPLOYEES :
        data.PSJBCODE;

    const filter = options.filter((rl) => {
      return ids.includes(rl.id + "");
    });

    if (filter.length > 0) {
      const content = filter.map((val) => {
        return val.text
      }).join("<br />");
      return <span dangerouslySetInnerHTML={{__html: content}}/>
    } else {
      return <span dangerouslySetInnerHTML={{__html: valueType}}/>
    }
  }

  const getPRCSCODE = () => {
    const filter = data.PRCSCODE.filter((rl) => {
      return rl.id === valueType;
    });
    return filter.length > 0 ? filter[0].text : "";
  }

  const getPRCSLIST = () => {
    const filter = data.PRCSLIST.filter((rl) => {
      return rl.id + "" === valueType;
    });
    return filter.length > 0 ? filter[0].text : valueType;
  }

  const getSENDMAIL = () => {
    const values = valueType.split(",");

    const filter = data.SENDMAIL.filter((rl) => {
      return values.includes(rl.id);
    });

    if (filter.length > 0) {
      const content = filter.map((val) => {
        return val.text
      }).join("<br />");
      return <span dangerouslySetInnerHTML={{__html: content}}/>
    } else {
      return <span dangerouslySetInnerHTML={{__html: valueType}}/>
    }
  }

  const getDLAYTYPE = () => {
    const filter = data.DLAYTYPE.filter((rl) => {
      return rl.id + "" === valueType;
    });
    return filter.length > 0 ? filter[0].text : "";
  }

  switch (type) {
    case ProcessConditionType.WORKNAME:
      return showWorkName()
    case ProcessConditionType.ROLEAPRV:
      return getROLEAPRV();
    case ProcessConditionType.PSJBTYPE:
      return getPSJBTYPE();
    case ProcessConditionType.PSJBCODE:
      return getPSJBCODE();
    case ProcessConditionType.PRCSCODE:
      return getPRCSCODE();
    case ProcessConditionType.PRCSLIST:
      return getPRCSLIST();
    case ProcessConditionType.SENDMAIL:
      return getSENDMAIL();
    case ProcessConditionType.DLAYTYPE:
      return getDLAYTYPE();
    default:
      return <>....</>
  }


}

