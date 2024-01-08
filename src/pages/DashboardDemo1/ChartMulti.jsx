import React, { useEffect, useState } from "react";
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

import { getLstElemType } from "../../actions/chart";
import { useDispatch, useSelector } from "react-redux";
import { findDistanceField } from "../../functions/funcArray";

const dataChartType = {
  1: "column",
  2: "column###stack={true}",
  3: 'column###stack={{type: "100%"}}',
  4: "bar",
  5: "bar###stack={true}",
  6: 'bar###stack={{type: "100%"}}',
  7: "area",
  8: "area###stack={true}",
  9: 'area###stack={{type: "100%"}}',
  10: "verticalArea",
  11: "line",
  30: "pie",
  31: "donut",
  32: "donutmulti",
};

const dataChartTypeOpt = {
  1: `type="column"`,
  2: `type="column" stack={true}`,
  3: `type="column" stack={{
    type: "100%",
  }}`,
  4: `type="bar"`,
  5: `type="bar" stack={true}`,
  6: `type="bar" stack={{
    type: "100%",
  }}`,
  7: `type="area"`,
  8: `type="area" stack={true}`,
  9: `type="area" stack={{
    type: "100%",
  }}`,
  10: `type="verticalArea"`,
  11: `type="line"`,
  30: `type="pie"`,
  31: `type="donut"`,
  32: `type="donut"`,
};

const ChartMulti = ({ dataChart, ItemWdth, ItemHght }) => {
  const widthWindow = window.innerWidth;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstElemType());
  }, []);
  const lstElemType = useSelector((state) => state.Chart.lstElemType);

  const [categories, setCategories] = useState();
  useEffect(() => {
    const Categories = [
      ...new Set(
        dataChart.flatMap((item) =>
          item.ElemData.map((subItem) => subItem.IndcName)
        )
      ),
    ];
    setCategories(Categories);
  }, [dataChart]);

  // Helper function to get ChartType based on ElemType
  function getChartType(elemType) {
    return dataChartType[elemType] || "";
  }
  // Transform dataChart
  const newData = dataChart.map((item) => {
    const distinctIndcNames = [
      ...new Set(item.ElemData.map((subItem) => subItem.IndcName)),
    ];
    const chartType = getChartType(item.ElemType);

    return {
      ...item,
      ElemName: distinctIndcNames.join(", "),
      ChartType: chartType,
    };
  });

  // console.log("ChartMulti newData", newData);

  return (
    <div className="mb-10">
      <Chart
        style={{
          width: widthWindow <= 480 ? "100%" : ItemWdth,
          height: ItemHght,
        }}
      >
        <ChartTitle text="Multi Chart Type" />
        <ChartLegend
          position="top"
          orientation="horizontal"
          // 'top' | 'bottom' | 'left' | 'right'
          // 'vertical' | 'horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories}>
            {/* <ChartCategoryAxisTitle text="Nation" /> */}
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {newData.map((series, index) => (
            <ChartSeriesItem
              key={index}
              type={series.ChartType}
              data={series.ElemData}
              field="DataVlue"
              categoryField="TimeCode"
              name={series.ElemName}
            />
          ))}
        </ChartSeries>
      </Chart>
    </div>
  );
};

export default ChartMulti;
