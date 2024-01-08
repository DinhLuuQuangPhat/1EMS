import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useStateContext } from "../../context/ContextProvider";
import { filterBy } from "@progress/kendo-data-query";
import { Button } from "@progress/kendo-react-buttons";
import { arrowRotateCcwIcon } from "@progress/kendo-svg-icons";
import { getLstAprvDcmn } from "../../actions/document";
import moment from "moment";

const AprvFilter = (props) => {
  const { getLabelValue, appColors, userData } = useStateContext();
  const lstEmployeeAll = useSelector((state) => state.common.lstEmployeeAll);
  const [data, setData] = React.useState();
  useEffect(() => {
    setData(lstEmployeeAll.slice());
  }, [lstEmployeeAll]);
  const filterData = (filter) => {
    const data = lstEmployeeAll.slice();
    return filterBy(data, filter);
  };
  const filterChange = (event) => {
    setData(filterData(event.filter));
  };

  const dispatch = useDispatch();
  const loadListData = () => {
    const body = {
      DCMNCODE: props.DcmnAprv,
      BEG_DATE: moment("1990-01-01").format("YYYY-MM-DD"),
      END_DATE: moment("1990-01-01").format("YYYY-MM-DD"),
      PARA_001: userData?.EMPLCODE,
      PARA_002: "%",
    };

    dispatch(getLstAprvDcmn(body));
  };

  return (
    <div className="w-full lg:flex bg-blue-200 p-3">
      <div className="flex">
        <div className="flex items-center">
          <div className="w-fit text-xs">
            {getLabelValue(182, "Tên NV trình ký")}
          </div>
          <div className="lg:ml-3 w-80">
            <DropDownList
              id="EMPLCODE"
              name="EMPLCODE"
              style={{ borderColor: "grey" }}
              textField="ITEMNAME"
              dataItemKey="ITEMCODE"
              //   data={lstEmployeeAll}
              data={data}
              className={appColors.inputColor}
              size="small"
              onChange={(event) => {
                props.onClick(event.value.ITEMCODE);
              }}
              filterable={true}
              onFilterChange={filterChange}
            />
          </div>
          {/* <div className="ml-2">
            <Button
              svgIcon={arrowRotateCcwIcon}
              onClick={loadListData}
              size="small"
            >
              {getLabelValue(234, "Làm mới")}
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AprvFilter;
