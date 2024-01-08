import React from "react";
import {
  findDistanceField,
  convertDataChart,
  transformAndSortDataStructure,
  sortArrayByField,
} from "../../functions/funcArray";

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

const ChartBar = ({ dataChart }) => {
  // Xu ly dataChart
  // Doi tuong cua Chart
  let Categories = "";
  let ConvertDataChart = "";
  let ConvertDataChart2 = "";
  if (
    dataChart.ElemData != null &&
    Array.isArray(dataChart.ElemData) &&
    dataChart.ElemData != ""
  ) {
    // console.log(dataChart.ElemData);
    Categories = findDistanceField(dataChart.ElemData, "IndcName");
    // ConvertDataChart = convertDataChart(dataChart.ElemData, "TimeCode");
    ConvertDataChart2 = transformAndSortDataStructure(dataChart.ElemData);
  } else {
    // console.log("type 1", dataChart.ElemData == null);
    // console.log("type 2", dataChart.ElemData == undefined);
    // console.log("type 3", Object.is(dataChart.ElemData, null));
  }

  return (
    <Chart>
      <ChartTitle text="TEST DATA CHART EMS" />
      <ChartLegend position="top" orientation="horizontal" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={Categories}>
          <ChartCategoryAxisTitle text="Bao bieu TEST" />
        </ChartCategoryAxisItem>
      </ChartCategoryAxis>
      <ChartSeries>
        {Array.isArray(ConvertDataChart2) &&
          ConvertDataChart2.length > 0 &&
          ConvertDataChart2.map((series, index) => (
            <ChartSeriesItem
              key={index}
              type="column"
              data={series.data}
              field="DataVlue"
              categoryField="TimeName"
              name={series.name}
            />
          ))}
      </ChartSeries>
    </Chart>
    // <>abc</>
  );
};

export default ChartBar;
