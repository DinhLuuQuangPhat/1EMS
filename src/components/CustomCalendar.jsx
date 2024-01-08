import React from "react";
import { MultiViewCalendar } from "@progress/kendo-react-dateinputs";

const CustomCalendar = (props) => {
  return <MultiViewCalendar {...props} views={1} />;
};

export default CustomCalendar;
