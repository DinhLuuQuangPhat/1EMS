import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { arrowLeftIcon } from "@progress/kendo-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
  ChartCategoryAxisTitle,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartArea,
} from "@progress/kendo-react-charts";

const RETNDATA = {
  categories: [2002, 2003, 2004],
  series: [
    {
      name: "India",
      data: [3.907, 7.943, 7.848],
    },
    {
      name: "Russian Federation",
      data: [4.743, 7.295, 7.175],
    },
    {
      name: "Germany",
      data: [0.21, 0.375, 1.161],
    },
    {
      name: "World",
      data: [1.988, 2.733, 3.994],
    },
  ],
  AxisValue: {
    min: 0,
    max: 9,
    title: "Qtty",
  },
};

const DashboardMultiType = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Button svgIcon={arrowLeftIcon} onClick={() => navigate("/chartindex")}>
          Back to Dashboard Index
        </Button>
      </div>
      <Chart
        style={{
          height: 350,
        }}
      >
        <ChartArea background="#eee" margin={30} />
        <ChartValueAxis>
          <ChartValueAxisItem
            title={{
              text: `${RETNDATA.AxisValue.title}`,
            }}
            min={RETNDATA.AxisValue.min}
            max={RETNDATA.AxisValue.max}
          />
        </ChartValueAxis>

        <ChartTitle text="Column Chart" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={RETNDATA.categories}
            //    startAngle={45}
          >
            <ChartCategoryAxisTitle text="Years" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem
            type="column"
            // tooltip={{
            //   visible: true,
            // }}
            data={RETNDATA.series[0].data}
            name={RETNDATA.series[0].name}
          />

          <ChartSeriesItem
            type="line"
            data={RETNDATA.series[1].data}
            name={RETNDATA.series[1].name}
          />

          <ChartSeriesItem
            type="column"
            data={RETNDATA.series[2].data}
            name={RETNDATA.series[2].name}
          />

          <ChartSeriesItem
            type="line"
            data={RETNDATA.series[3].data}
            name={RETNDATA.series[3].name}
          />
        </ChartSeries>
      </Chart>
    </>
  );
};

export default DashboardMultiType;
