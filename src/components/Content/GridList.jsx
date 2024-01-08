import React, { useEffect, useState } from "react";
import { Grid, GridColumn, GridNoRecords } from "@progress/kendo-react-grid";
import { useStateContext } from "../../context/ContextProvider";
import { cellViewDate, CommandGridList } from "../";
import { NavLink } from "react-router-dom";
import { process } from "@progress/kendo-data-query";

const GridList = (props) => {
  const { getLabelValue } = useStateContext();
  const {
    datalist,
    DcmnCode,
    lockClick,
    deleteClick,
    disableLock,
    disableDel,
    datalistLength,
  } = props;

  // let initialDataState = {
  //   sort: [
  //     {
  //       field: "MAINDATE",
  //       dir: "desc",
  //     },
  //   ],
  //   take: datalistLength,
  //   skip: 0,
  // };

  // const [dataState, setDataState] = React.useState(initialDataState);
  const [dataState, setDataState] = React.useState({
    sort: [
      {
        field: "MAINDATE",
        dir: "desc",
      },
    ],
  });
  useEffect(() => {
    setDataState({ ...dataState, take: datalistLength, skip: 0 });
  }, [datalistLength]);

  const [dataResult, setDataResult] = React.useState(
    process(datalist, dataState)
  );

  const cellMainCode = (cell) => {
    return (
      <td>
        <NavLink
          className="MainCode"
          to={props.UrlLink + cell.dataItem.KKKK0000}
        >
          {cell.dataItem.MAINCODE}
        </NavLink>
      </td>
    );
  };
  const CommandCell = (props) => (
    <CommandGridList
      {...props}
      DcmnCode={DcmnCode}
      lockClick={lockClick}
      deleteClick={deleteClick}
      disableLock={disableLock}
      disableDel={disableDel}
    />
  );

  const [pageSizeValue, setPageSizeValue] = React.useState("All");
  // const [pageSizeValue, setPageSizeValue] = React.useState(datalistLength);
  const pageChange = (event) => {
    const targetEvent = event.targetEvent;
    const take =
      // targetEvent.value === "All" ? datalist.length : event.page.take;
      targetEvent.value === "All" ? datalistLength : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    } else {
      setPageSizeValue("All");
    }

    setDataState({ ...dataState, take: take, skip: event.page.skip });
  };

  const onDataStateChange = (e) => {
    setDataState({ ...e.dataState });
  };

  useEffect(() => {
    setDataResult(process(datalist, dataState));
  }, [dataState, datalist]);

  return (
    <Grid
      style={{
        height: "700px",
      }}
      sortable={true}
      filterable={true}
      data={dataResult}
      {...dataState}
      onDataStateChange={onDataStateChange}
      pageable={{
        buttonCount: 4,
        pageSizes: [50, 100, 200, "All"],
        pageSizeValue: pageSizeValue,
      }}
      skip={dataState.skip}
      take={dataState.take}
      // total={datalist.length}
      total={datalistLength}
      onPageChange={pageChange}
      className="gridlist-master"
    >
      <GridNoRecords>{getLabelValue(71, "Không có dữ liệu")}</GridNoRecords>
      <GridColumn
        field="MAINCODE"
        title={getLabelValue(117, "Số chứng từ")}
        width="150px"
        cell={cellMainCode}
        filter="text"
      />
      <GridColumn
        field="MAINDATE"
        title={getLabelValue(118, "Ngày chứng từ")}
        width="200px"
        // filter="date"
        filterable={false}
        cell={cellViewDate}
      />
      <GridColumn
        field="NOTETEXT"
        title={getLabelValue(21, "Nội dung")}
        width="400px"
        filter="text"
      />
      <GridColumn
        field="STTENAME"
        title={getLabelValue(22, "Trạng thái")}
        width="200px"
        filter="text"
      />
      <GridColumn
        cell={CommandCell}
        width="175px"
        filterable={false}
        title={getLabelValue(23, "Tác vụ")}
      />
    </Grid>
  );
};

export default GridList;
