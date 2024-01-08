import React from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTitle,
} from "@progress/kendo-react-charts";
import { Button } from "@progress/kendo-react-buttons";
import { arrowLeftIcon } from "@progress/kendo-svg-icons";
import { useNavigate } from "react-router-dom";

const data = [
  {
    x: "Hydroelectric",
    y: 0.175,
  },
  {
    x: "Nuclear",
    y: 0.238,
  },
  {
    x: "Coal",
    y: 0.118,
  },
  {
    x: "Solar",
    y: 0.052,
  },
  {
    x: "Wind",
    y: 0.225,
  },
  {
    x: "Other",
    y: 0.192,
  },
];

const DashboardDonut = () => {
  const navigate = useNavigate();

  const labelContent = (e) => e.category;
  const donutCenter = () => (
    <span>
      <h3>22.5%</h3> of which renewables
    </span>
  );
  return (
    <>
      <div>
        <Button svgIcon={arrowLeftIcon} onClick={() => navigate("/chartindex")}>
          Back to Dashboard Index
        </Button>
      </div>
      {/* DONUT BASIC */}
      <Chart>
        <ChartTitle text="DONUT BASIC" />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={data}
            categoryField="x"
            field="y"
            tooltip={{ visible: true }}
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
              content={labelContent}
            />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend visible={false} />
      </Chart>

      {/* DONUT CENTER */}
      <Chart donutCenterRender={donutCenter}>
        <ChartTitle text="DONUT CENTER" />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={data}
            categoryField="x"
            field="y"
            tooltip={{ visible: true }}
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
              content={labelContent}
            />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend visible={false} />
      </Chart>
    </>
  );
};

export default DashboardDonut;
