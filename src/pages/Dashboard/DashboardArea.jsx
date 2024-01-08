import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
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

const DashboardArea = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Button svgIcon={arrowLeftIcon} onClick={() => navigate("/chartindex")}>
          Back to Dashboard Index
        </Button>
      </div>
      {/* BAR BASIC */}
      <Chart style={{ height: 350 }}>
        <ChartTitle text="BAR BASIC" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={RETNDATA.categories}
            startAngle={45}
            title={{
              text: "Nation",
            }}
          />
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="area"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
            />
          ))}
        </ChartSeries>
      </Chart>

      {/* BAR VERTICAL */}
      <Chart style={{ height: 350 }}>
        <ChartTitle text="BAR VERTICAL" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={RETNDATA.categories}
            startAngle={45}
            title={{
              text: "Nation",
            }}
          />
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="verticalArea"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
            />
          ))}
        </ChartSeries>
      </Chart>

      {/* Stacked Area */}
      <Chart style={{ height: 350 }}>
        <ChartTitle text="STACKED AREA" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={RETNDATA.categories}
            startAngle={45}
            title={{
              text: "Nation",
            }}
          />
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="area"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              stack={true}
            />
          ))}
        </ChartSeries>
      </Chart>

      {/* 100% Stacked Area */}
      <Chart style={{ height: 350 }}>
        <ChartTitle text="100% STACKED AREA" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={RETNDATA.categories}
            startAngle={45}
            title={{
              text: "Nation",
            }}
          />
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="area"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              stack={{
                type: "100%",
              }}
            />
          ))}
        </ChartSeries>
      </Chart>

      {/* Line Style Area */}
      <Chart style={{ height: 350 }}>
        <ChartTitle text="LINE STYLE BAR" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={RETNDATA.categories}
            startAngle={45}
            title={{
              text: "Nation",
            }}
          />
        </ChartCategoryAxis>
        <ChartSeries>
          {RETNDATA.series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="area"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              markers={{
                visible: false,
              }}
              line={{
                style: "smooth",
                // 'normal' | 'step' | 'smooth'
                opacity: 0.1,
              }}
            />
          ))}
        </ChartSeries>
      </Chart>
    </>
  );
};

export default DashboardArea;
