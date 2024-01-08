import React, { useState, useEffect } from "react";
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

import {
  findDistanceField,
  transformChartData,
  getChartType,
  convertDataChart,
  transformAndSortDataStructure,
  sortArrayByField,
  // dataChartType,
} from "../../functions/funcArray";

const dataChartType = {
  1: "column",
  2: "column###{true}",
  3: 'column###{"type": "100%"}',
  4: "bar",
  5: "bar###{true}",
  6: 'bar###{"type": "100%"}',
  7: "area",
  8: "area###{true}",
  9: 'area###{"type": "100%"}',
  10: "verticalArea",
  11: "line",
  30: "pie",
  31: "donut",
  32: "donutmulti",
};

const ChartSingle = ({ dataChart, ItemWdth, ItemHght }) => {
  const widthWindow = window.innerWidth;

  const [categories, setCategories] = useState([]);
  const [objcCode, setObjcCode] = useState([]);
  const [convertData, setConvertData] = useState();
  useEffect(() => {
    const Categories = findDistanceField(dataChart.ElemData, "IndcName");
    const ObjcName = findDistanceField(dataChart.ElemData, "ObjcName");

    setCategories(Categories);
    setObjcCode(ObjcName);
  }, [dataChart]);

  useEffect(() => {
    if (categories.length > 0 && categories[0] != "") {
      if (objcCode.length > 0 && objcCode[0] == "") {
        setConvertData(transformChartData(dataChart, "IndcName"));
      }
      if (objcCode.length > 0 && objcCode[0] != "") {
        setConvertData(transformChartData(dataChart, "ObjcName"));
      }
    }
    if (categories.length > 0 && categories[0] == "") {
      if (objcCode.length > 0 && objcCode[0] != "") {
        setConvertData(transformChartData(dataChart, "ObjcName"));
      }
    }
  }, [categories, objcCode]);

  return (
    <div className="mb-10">
      {convertData && (
        <Chart
          style={{
            width: widthWindow <= 480 ? "100%" : ItemWdth,
            height: ItemHght,
          }}
        >
          <ChartTitle text="Single Chart" />
          <ChartLegend
            position="top"
            orientation="horizontal"
            // 'top' | 'bottom' | 'left' | 'right'
            // 'vertical' | 'horizontal'
          />
          <ChartCategoryAxis>
            {/* <ChartCategoryAxisItem categories={categories}> */}
            {/* <ChartCategoryAxisTitle text="Nation" /> */}
            {/* </ChartCategoryAxisItem> */}
          </ChartCategoryAxis>
          <ChartSeries>
            {convertData.ElemData.map((series, index) => (
              <ChartSeriesItem
                key={index}
                type={series.ChartType}
                stack={
                  series.ChartStack != null ? JSON.parse(series.ChartStack) : ""
                }
                data={series.data}
                field="DataVlue"
                // categoryField="TimeCode"
                name={series.ChartName}
              />
            ))}
          </ChartSeries>
        </Chart>
      )}
    </div>
  );
};

export default ChartSingle;
