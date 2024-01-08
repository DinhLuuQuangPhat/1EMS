import React, { useEffect, useState } from "react";
import { Grid, GridColumn, GridNoRecords } from "@progress/kendo-react-grid";
import { cellViewDate } from "../";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const AprvDcmnListGrid = (props) => {
  const { datalist, UrlLink } = props;
  const { getLabelValue } = useStateContext();

  const dataDetail1 = (props) => {
    const data = props.dataItem.DETAIL_1;
    if (data) {
      return (
        <Grid
          data={data}
          detail={dataDetail2}
          expandField="expanded"
          onExpandChange={Detail1ExpandChange}
        >
          <GridNoRecords>{getLabelValue(71, "Không có dữ liệu")}</GridNoRecords>
          <GridColumn
            field="SCTNCODE"
            title={getLabelValue(184, "Loại chứng từ")}
            width="180px"
          />
          <GridColumn
            field="SCTNNAME"
            title={getLabelValue(185, "Tên loại chứng từ")}
          />
        </Grid>
      );
    }
  };
  const dataDetail2 = (props) => {
    const data = props.dataItem.DETAIL_2;
    const [dataState, setDataState] = React.useState({
      sort: [
        {
          field: "MAINDATE",
          dir: "asc",
        },
      ],
      skip: 10,
      take: 0,
    });
    const onDataStateChange = (e) => {
      setDataState(e.dataState);
    };

    if (data) {
      return (
        <Grid
          data={data}
          sortable={true}
          onDataStateChange={onDataStateChange}
          {...dataState}
          pageable={true}
        >
          <GridNoRecords>{getLabelValue(71, "Không có dữ liệu")}</GridNoRecords>
          <GridColumn
            field="MAINDATE"
            title={getLabelValue(118, "Ngày chứng từ")}
            cell={cellViewDate}
          />
          <GridColumn
            field="MAINCODE"
            title={getLabelValue(117, "Số chứng từ")}
            cell={cellMainCode}
          />
          <GridColumn
            field="SENDEMPL"
            title={getLabelValue(181, "Mã NV trình ký")}
            width="150px"
          />
          <GridColumn
            field="EMPLNAME"
            title={getLabelValue(182, "Tên NV trình ký")}
          />
          <GridColumn
            field="JOB_NAME"
            title={getLabelValue(183, "Chức danh")}
          />
          <GridColumn field="DPTMNAME" title={getLabelValue(150, "Bộ phận")} />
        </Grid>
      );
    }
  };
  const cellMainCode = (cell) => {
    return (
      <td>
        <NavLink className="MainCode" to={UrlLink + cell.dataItem.KEY_NEW}>
          {cell.dataItem.MAINCODE}
        </NavLink>
      </td>
    );
  };

  const [data, setData] = useState();
  useEffect(() => {
    setData(datalist.slice());
  }, [datalist]);
  const MasterExpandChange = (event) => {
    let newData = data.map((item) => {
      if (item.KKKK0000 === event.dataItem.KKKK0000) {
        item.expanded = !event.dataItem.expanded;
      }
      return item;
    });
    setData(newData);
  };

  const Detail1ExpandChange = (event) => {
    let newData = data.map((item) => {
      if (item.DETAIL_1 && item.DETAIL_1.length > 0) {
        item.DETAIL_1.map((detail) => {
          if (detail.KKKK0001 === event.dataItem.KKKK0001) {
            detail.expanded = !event.dataItem.expanded;
          }
        });
      }
      return item;
    });
    setData(newData);
  };

  return (
    datalist && (
      <Grid
        data={data}
        detail={dataDetail1}
        expandField="expanded"
        onExpandChange={MasterExpandChange}
      >
        <GridNoRecords>{getLabelValue(71, "Không có dữ liệu")}</GridNoRecords>
        <GridColumn
          field="DCMNCODE"
          title={getLabelValue(184, "Loại chứng từ")}
          width="150px"
        />
        <GridColumn
          field="DCMNNAME"
          title={getLabelValue(185, "Tên loại chứng từ")}
        />
        <GridColumn
          field="NUMBVCHR"
          title={getLabelValue(117, "Số chứng từ")}
          width="110px"
        />
      </Grid>
    )
  );
};

export default AprvDcmnListGrid;
