import React from "react";

import { useStateContext } from "../../context/ContextProvider";
import {
  DatePicker,
  MultiViewCalendar,
} from "@progress/kendo-react-dateinputs";

export const CustomCalendar = (props) => {
  return <MultiViewCalendar {...props} views={1} />;
};

const FilterHeader = (props) => {
  const {
    getLabelValue,
    beginDateList,
    setBeginDateList,
    endDateList,
    setEndDateList,
  } = useStateContext();

  return (
    <div className="w-full lg:flex bg-blue-200 p-3">
      <div className="flex">
        <div className="flex items-center">
          <div className="w-fit text-xs">{getLabelValue(15, "Từ ngày:")}</div>
          <div className="lg:ml-3">
            <DatePicker
              format="dd/MM/yyyy"
              value={beginDateList}
              onChange={(e) => setBeginDateList(e.value)}
              calendar={CustomCalendar}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-fit text-xs lg:ml-3">
            {getLabelValue(16, "đến ngày:")}
          </div>
          <div className="lg:ml-3">
            <DatePicker
              format="dd/MM/yyyy"
              value={endDateList}
              onChange={(e) => setEndDateList(e.value)}
              calendar={CustomCalendar}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="rounded-md bg-green-500 text-white pl-5 pr-5 ml-5 items-center w-32 m-3 p-[0.15rem] text-sm"
        onClick={props.onClick}
      >
        {getLabelValue(17, "Lọc")}
      </button>
      <div className="flex items-center ml-10">
        <div className="w-fit text-xs">
          {getLabelValue(18, "Tổng số chứng từ:")}
        </div>
        <div className="ml-3 text-red-700 text-xs font-semibold">
          {/* {CountChungTu} */}
          {props.CountChungTu ? props.CountChungTu : 0}
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;
