import React, { useState } from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
  ChartCategoryAxisTitle,
} from "@progress/kendo-react-charts";
import { Button } from "@progress/kendo-react-buttons";
import { arrowLeftIcon } from "@progress/kendo-svg-icons";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";

import {
  findDistanceField,
  convertDataChart,
  transformAndSortDataStructure,
} from "../../functions/funcArray";

const RETNDATA = {
  categories: [2000, 2001, 2002, 2003, 2004],
  series: [
    {
      name: "India",
      data: [-1, 0, 1, 2, 3],
    },
    {
      name: "Russian Federation",
      data: [-2, 0, -1, 1, 2],
    },
    {
      name: "Germany",
      data: [1, 3, 5, 2, -1],
    },
    {
      name: "World",
      data: [3, 2, 0, -2, -3],
    },
  ],
};

const RETNDATA2 = {
  categories: ["GBR", "CHN", "AUS", "RUS"],
  data: [
    {
      type: "line",
      name: "Gold",
      dataItem: [
        { x: "GBR", y: 27, toolTipMappingName: "Great Britain" },
        { x: "CHN", y: 26, toolTipMappingName: "China" },
        { x: "AUS", y: 8, toolTipMappingName: "Australia" },
        { x: "RUS", y: 19, toolTipMappingName: "Russia" },
      ],
    },
    {
      type: "column",
      name: "Silver",
      dataItem: [
        { x: "GBR", y: 23, toolTipMappingName: "Great Britain" },
        { x: "CHN", y: 18, toolTipMappingName: "China" },
        { x: "AUS", y: 11, toolTipMappingName: "Australia" },
        { x: "RUS", y: 17, toolTipMappingName: "Russia" },
      ],
    },
    {
      type: "pie",
      name: "Bronze",
      dataItem: [
        { x: "GBR", y: 17, toolTipMappingName: "Great Britain" },
        { x: "CHN", y: 26, toolTipMappingName: "China" },
        { x: "AUS", y: 10, toolTipMappingName: "Australia" },
        { x: "RUS", y: 20, toolTipMappingName: "Russia" },
      ],
    },
    {
      type: "donut",
      name: "Bronze",
      dataItem: [
        { x: "GBR", y: 17, toolTipMappingName: "Great Britain" },
        { x: "CHN", y: 26, toolTipMappingName: "China" },
        { x: "AUS", y: 10, toolTipMappingName: "Australia" },
        { x: "RUS", y: 20, toolTipMappingName: "Russia" },
      ],
    },
  ],
};

// nhieu doi tuong
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
    DataVlue: 4.0,
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

  //Doanh thu dịch vụ
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "04-2022",
    TimeName: "04-2022",
    DataVlue: 92.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "03-2022",
    TimeName: "03-2022",
    DataVlue: 76.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "01-2022",
    TimeName: "01-2022",
    DataVlue: 316.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "06-2022",
    TimeName: "06-2022",
    DataVlue: 88.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "09-2022",
    TimeName: "09-2022",
    DataVlue: 120.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "12-2022",
    TimeName: "12-2022",
    DataVlue: 193.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "11-2022",
    TimeName: "11-2022",
    DataVlue: 39.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "02-2022",
    TimeName: "02-2022",
    DataVlue: 48.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "07-2022",
    TimeName: "07-2022",
    DataVlue: 104.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "08-2022",
    TimeName: "08-2022",
    DataVlue: 79.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "10-2022",
    TimeName: "10-2022",
    DataVlue: 105.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000018",
    IndcName: "Doanh thu dịch vụ",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "05-2022",
    TimeName: "05-2022",
    DataVlue: 157.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },

  //Doanh thu bán hàng
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "02-2022",
    TimeName: "02-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "08-2022",
    TimeName: "08-2022",
    DataVlue: 625.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "05-2022",
    TimeName: "05-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "07-2022",
    TimeName: "07-2022",
    DataVlue: 75.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "12-2022",
    TimeName: "12-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "09-2022",
    TimeName: "09-2022",
    DataVlue: 4.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "04-2022",
    TimeName: "04-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "06-2022",
    TimeName: "06-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "01-2022",
    TimeName: "01-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "10-2022",
    TimeName: "10-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "11-2022",
    TimeName: "11-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000032",
    IndcName: "Doanh thu bán hàng",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "03-2022",
    TimeName: "03-2022",
    DataVlue: 301.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "area",
  },

  //Doanh thu tài chính
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "09-2022",
    TimeName: "09-2022",
    DataVlue: 89.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "05-2022",
    TimeName: "05-2022",
    DataVlue: 148.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "02-2022",
    TimeName: "02-2022",
    DataVlue: 41.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "04-2022",
    TimeName: "04-2022",
    DataVlue: 62.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "01-2022",
    TimeName: "01-2022",
    DataVlue: 19.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "10-2022",
    TimeName: "10-2022",
    DataVlue: 100.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "12-2022",
    TimeName: "12-2022",
    DataVlue: 56.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "08-2022",
    TimeName: "08-2022",
    DataVlue: 80.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "07-2022",
    TimeName: "07-2022",
    DataVlue: 100.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "06-2022",
    TimeName: "06-2022",
    DataVlue: 100.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "03-2022",
    TimeName: "03-2022",
    DataVlue: 58.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000034",
    IndcName: "Doanh thu tài chính",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "11-2022",
    TimeName: "11-2022",
    DataVlue: 40.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "column",
  },

  //Doanh thu khác
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "11-2022",
    TimeName: "11-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "03-2022",
    TimeName: "03-2022",
    DataVlue: 2.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "10-2022",
    TimeName: "10-2022",
    DataVlue: 1.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "07-2022",
    TimeName: "07-2022",
    DataVlue: 4.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "02-2022",
    TimeName: "02-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "04-2022",
    TimeName: "04-2022",
    DataVlue: 18.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "12-2022",
    TimeName: "12-2022",
    DataVlue: 29.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "06-2022",
    TimeName: "06-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "09-2022",
    TimeName: "09-2022",
    DataVlue: 3.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "01-2022",
    TimeName: "01-2022",
    DataVlue: 283.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "05-2022",
    TimeName: "05-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
  {
    DbDtCode: "020008",
    DbDtName: "Tổng doanh thu hằng tháng theo: năm",
    CompCode: "PMC",
    IndcCode: "000035",
    IndcName: "Doanh thu khác",
    ObjcCode: "",
    ObjcName: "",
    TimeCode: "08-2022",
    TimeName: "08-2022",
    DataVlue: 0.0,
    EstmMthd: 1,
    UserWstn: "000005CTY-APP-002",
    ChartType: "line",
  },
];

const finalData = {
  categories: [
    "Doanh thu thuần bán hàng",
    "Doanh thu dịch vụ",
    "Doanh thu bán hàng",
    "Doanh thu tài chính",
    "Doanh thu khác",
  ],
  ElemData: [
    {
      ChartName: "Doanh thu thuần bán hàng",
      data: [
        {
          TimeCode: "01-2022",
          TimeName: "01-2022",
          DataVlue: 25418048363,
          IndcName: "Doanh thu thuần bán hàng",
        },
        {
          TimeCode: "02-2022",
          TimeName: "02-2022",
          DataVlue: 22619360994,
          IndcName: "Doanh thu thuần bán hàng",
        },
      ],
    },

    {
      ChartName: "Doanh thu dịch vụ",
      data: [
        {
          TimeCode: "01-2022",
          TimeName: "01-2022",
          DataVlue: 104408434,
          IndcName: "Doanh thu dịch vụ",
        },
        {
          TimeCode: "02-2022",
          TimeName: "02-2022",
          DataVlue: 105349013,
          IndcName: "Doanh thu dịch vụ",
        },
      ],
    },

    {
      ChartName: "Doanh thu bán hàng",
      data: [
        {
          TimeCode: "01-2022",
          TimeName: "01-2022",
          DataVlue: 0,
          IndcName: "Doanh thu bán hàng",
        },
        {
          TimeCode: "02-2022",
          TimeName: "02-2022",
          DataVlue: 0,
          IndcName: "Doanh thu bán hàng",
        },
      ],
    },

    {
      ChartName: "Doanh thu tài chính",
      data: [
        {
          TimeCode: "01-2022",
          TimeName: "01-2022",
          DataVlue: 55928335,
          IndcName: "Doanh thu tài chính",
        },
        {
          TimeCode: "02-2022",
          TimeName: "02-2022",
          DataVlue: 18726949,
          IndcName: "Doanh thu tài chính",
        },
      ],
    },

    {
      ChartName: "Doanh thu khác",
      data: [
        {
          TimeCode: "01-2022",
          TimeName: "01-2022",
          DataVlue: 931230,
          IndcName: "Doanh thu khác",
        },
        {
          TimeCode: "02-2022",
          TimeName: "02-2022",
          DataVlue: 22936,
          IndcName: "Doanh thu khác",
        },
      ],
    },
  ],
};

const DashboardBar = () => {
  const navigate = useNavigate();

  const ListField = findDistanceField(data1, "IndcName");

  const newData = convertDataChart(data1, "IndcName");

  const newData2 = transformAndSortDataStructure(data1);

  // Handler function to log position changes
  const [boxes, setBoxes] = useState([]);

  const handleAddBox = () => {
    const newBoxId = boxes.length + 1;
    setBoxes([...boxes, newBoxId]);
  };

  const handleDrag = (id, ui) => {
    console.log(`Box ${id} position:`, ui);
  };

  console.log("transformAndSortDataStructure", newData2);

  return (
    <>
      <div className="drag-item">
        <div>
          <Button
            svgIcon={arrowLeftIcon}
            onClick={() => navigate("/chartindex")}
          >
            Back to Dashboard Index
          </Button>
        </div>

        <div>
          <h1>React Draggable Example</h1>
          <button onClick={handleAddBox}>Add Draggable Box</button>
          <div className="relative h-96">
            {boxes.map((boxId) => (
              <Draggable
                key={boxId}
                id={boxId}
                handle="strong"
                onDrag={handleDrag}
                bounds="parent"
                grid={[20, 10]}
              >
                <div className="box no-cursor block text-center">
                  <strong className="cursor">
                    <div>Drag here</div>
                  </strong>
                  <div>You must click my handle to drag me</div>
                </div>
              </Draggable>
            ))}
          </div>
        </div>
      </div>

      <Chart>
        <ChartTitle text="RETNDATA2" />
        <ChartLegend
          position="top"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={RETNDATA2.categories}>
            <ChartCategoryAxisTitle text="Nation" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {finalData.ElemData.map((series, index) => (
            <ChartSeriesItem
              key={index}
              // type={series.type}
              type="column"
              // stack="true"
              // stack={{type: "100%"}}
              data={series.data}
              field="DataVlue"
              categoryField="TimeCode"
              name={series.ChartName}
            />
          ))}
        </ChartSeries>
      </Chart>
      {/* TEST DATA BINDING */}
      <br />
      <br />
      <br />
      {/* BAR BASIC */}
      <Chart>
        <ChartTitle text="BAR BASIC" />
        <ChartLegend
          position="top"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={RETNDATA.categories}>
            <ChartCategoryAxisTitle text="Years" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="bar"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              gap={2}
              spacing={0.25}
            />
          ))}
        </ChartSeries>
      </Chart>
      {/* COLUMN */}
      <Chart>
        <ChartTitle text="BAR COLUMN" />
        <ChartLegend
          position="bottom"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={RETNDATA.categories}>
            <ChartCategoryAxisTitle text="Years" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="column"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              gap={2}
              spacing={0.25}
            />
          ))}
        </ChartSeries>
      </Chart>
      {/* STACKED BAR */}
      <Chart>
        <ChartTitle text="STACKED BAR" />
        <ChartLegend
          position="bottom"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={RETNDATA.categories}>
            <ChartCategoryAxisTitle text="Years" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="bar"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              gap={2}
              spacing={0.25}
              stack={true}
            />
          ))}
        </ChartSeries>
      </Chart>
      {/* STACKED COLUMN */}
      <Chart>
        <ChartTitle text="STACKED BAR" />
        <ChartLegend
          position="bottom"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={RETNDATA.categories}>
            <ChartCategoryAxisTitle text="Years" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="column"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              gap={2}
              spacing={0.25}
              stack={true}
            />
          ))}
        </ChartSeries>
      </Chart>
      {/* 100 STACKED BAR */}
      <Chart>
        <ChartTitle text="100 STACKED BAR" />
        <ChartLegend
          position="bottom"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={RETNDATA.categories}>
            <ChartCategoryAxisTitle text="Years" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="bar"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              gap={2}
              spacing={0.25}
              stack={{
                type: "100%",
              }}
            />
          ))}
        </ChartSeries>
      </Chart>
      {/* 100 STACKED COLUMN */}
      <Chart>
        <ChartTitle text="100 STACKED COLUMN" />
        <ChartLegend
          position="bottom"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={RETNDATA2.categories}>
            <ChartCategoryAxisTitle text="Years" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {/* {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="column"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              gap={2}
              spacing={0.25}
              stack={{
                type: "100%",
              }}
            />
          ))} */}

          {RETNDATA2.data.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="column"
              tooltip={{ visible: true }}
              data={item.dataItem}
              name={item.name}
              gap={2}
              spacing={0.25}
              stack={{
                type: "100%",
              }}
              field="DataVlue"
              categoryField="TimeName"
            />
          ))}

          {/* {newData2.map((series, index) => (
            <ChartSeriesItem
              key={index}
              type="column"
              stack={{
                type: "100%",
              }}
              // stack="true"
              data={series.data}
              field="DataVlue"
              categoryField="TimeName"
              name={series.name}
            />
          ))} */}
        </ChartSeries>
      </Chart>

      {/* TEST JSON STRUCTURE CHART */}
      {RETNDATA2.data.map((series, index) => (
        <Chart>
          <ChartTitle text="TEST DATA RETNDATA2" />
          <ChartLegend
            position="top"
            orientation="horizontal"
            // 'top' | 'bottom' | 'left' | 'right'
            // 'vertical' | 'horizontal'
          />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={RETNDATA2.categories}>
              <ChartCategoryAxisTitle text="Nation" />
            </ChartCategoryAxisItem>
          </ChartCategoryAxis>
          <ChartSeries>
            <ChartSeriesItem
              key={index}
              type={series.type}
              data={series.dataItem}
              field="y"
              categoryField="x"
              name={series.name}
            />
          </ChartSeries>
        </Chart>
      ))}

      {/* TEST JSON STRUCTURE CHART */}
      <Chart>
        <ChartTitle text="TEST DATA CHART EMS" />
        <ChartLegend
          position="top"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={ListField}>
            <ChartCategoryAxisTitle text="Nation" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {newData.map((series, index) => (
            <ChartSeriesItem
              key={index}
              // type={series.type}
              type="column"
              data={series.data}
              field="DataVlue"
              categoryField="TimeName"
              name={series.name}
            />
          ))}
        </ChartSeries>
      </Chart>
    </>
  );
};

const containerStyle = {
  textAlign: "center",
  paddingTop: "50px",
};
const boxStyle = {
  width: "100px",
  height: "100px",
  backgroundColor: "lightblue",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "grab",
  userSelect: "none",
  border: "1px solid #ccc",
  margin: "8px",
};

export default DashboardBar;
