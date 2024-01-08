import React from "react";
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
} from "@progress/kendo-react-charts";
import { Button } from "@progress/kendo-react-buttons";
import { arrowLeftIcon } from "@progress/kendo-svg-icons";
import { useNavigate } from "react-router-dom";

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

const DashboardLine = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Button svgIcon={arrowLeftIcon} onClick={() => navigate("/chartindex")}>
          Back to Dashboard Index
        </Button>
      </div>
      {/* LINE BASIC */}
      <Chart>
        <ChartTitle text="LINE BASIC" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            title={{
              text: "Months",
            }}
            categories={RETNDATA.categories}
          />
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="line"
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

      {/* VERTICAL LINE */}
      <Chart>
        <ChartTitle text="VERTICAL LINE" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            title={{
              text: "Months",
            }}
            categories={RETNDATA.categories}
          />
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="verticalLine"
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
    </>
  );
};

export default DashboardLine;
