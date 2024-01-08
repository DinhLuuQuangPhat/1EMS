import React, { useEffect, useState } from "react";
import { Grid, GridColumn, GridNoRecords } from "@progress/kendo-react-grid";
import { useStateContext } from "../../context/ContextProvider";
import { cellViewDate, CommandGridList } from "../";
import { NavLink } from "react-router-dom";
import { process } from "@progress/kendo-data-query";

const initialDataState = {
  sort: [
    {
      field: "MAINDATE",
      dir: "desc",
    },
  ],
  take: 10,
  skip: 0,
};

const GridList = (props) => {
  const { getLabelValue } = useStateContext();
  const { DcmnCode, lockClick, deleteClick, datalist } = props;

  useEffect(() => {
    setDataResult(process(datalist, dataState));
  }, [datalist]);

  const [dataState, setDataState] = React.useState(initialDataState);
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
    />
  );

  const [pageSizeValue, setPageSizeValue] = React.useState();
  const pageChange = (event) => {
    const targetEvent = event.targetEvent;
    const take =
      targetEvent.value === "All" ? datalist.length : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }

    setDataState({ ...dataState, take: take, skip: event.page.skip });
  };

  const onDataStateChange = (e) => {
    setDataState({ ...e.dataState });
  };
  useEffect(() => {
    setDataResult(process(datalist, dataState));
  }, [dataState]);

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
        pageSizes: [2, 4, 6, "All"],
        pageSizeValue: pageSizeValue,
      }}
      skip={dataState.skip}
      take={dataState.take}
      total={datalist.length}
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
