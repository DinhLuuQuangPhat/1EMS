import React from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
} from "@progress/kendo-react-charts";
import { Button } from "@progress/kendo-react-buttons";
import { arrowLeftIcon } from "@progress/kendo-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  findDistanceField,
  convertDataChart,
  transformAndSortDataStructure,
  sortArrayByField,
} from "../../functions/funcArray";

const series = [
  {
    x: "0-14",
    y: 0.2545,
  },
  {
    x: "15-24",
    y: 0.1552,
  },
  {
    x: "25-54",
    y: 0.4059,
  },
  {
    x: "55-64",
    y: 0.0911,
  },
  {
    x: "65+",
    y: 0.0933,
  },
];

const data1 = [
  //Doanh thu thuần bán hàng
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "04-2022",
    TimeName: "04-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "02-2022",
    TimeName: "02-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "10-2022",
    TimeName: "10-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "06-2022",
    TimeName: "06-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "08-2022",
    TimeName: "08-2022",
    DataVlue: 654.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "11-2022",
    TimeName: "11-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "07-2022",
    TimeName: "07-2022",
    DataVlue: 74.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "12-2022",
    TimeName: "12-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "01-2022",
    TimeName: "01-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "09-2022",
    TimeName: "09-2022",
    DataVlue: 400.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "03-2022",
    TimeName: "03-2022",
    DataVlue: 301.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000017",
    IndcName: "Doanh thu thuần bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "05-2022",
    TimeName: "05-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
];

const labelContent = (props) => {
  console.log(props);

  let formatedNumber = Number(props.percentage).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2,
  });
  return `${props.dataItem.TimeName} years old: ${formatedNumber}`;
};

const DashboardPie = () => {
  const navigate = useNavigate();

  const newData = sortArrayByField(data1, "TimeName");
  console.log(newData);

  return (
    <>
      <div>
        <Button svgIcon={arrowLeftIcon} onClick={() => navigate("/chartindex")}>
          Back to Dashboard Index
        </Button>
      </div>
      <Chart>
        <ChartTitle text="World Population by Broad Age Groups" />
        <ChartLegend position="bottom" />
        <ChartSeries>
          {/* <ChartSeriesItem
            type="pie"
            data={series}
            field="y"
            categoryField="x"
            labels={{
              visible: true,
              content: labelContent,
            }}
          /> */}

          <ChartSeriesItem
            type="pie"
            data={newData}
            field="DataVlue"
            categoryField="TimeName"
            labels={{
              visible: true,
              content: labelContent,
            }}
          />
        </ChartSeries>
      </Chart>
    </>
  );
};

export default DashboardPie;
