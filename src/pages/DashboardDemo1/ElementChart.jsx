import React, { useEffect, useState } from "react";
import ChartSingle from "./ChartSingle";
import ChartMulti from "./ChartMulti";
import Draggable from "react-draggable";

const ElementChart = ({
  itemCharts,
  DbDtCode,
  key,
  Item_Top,
  ItemLeft,
  ItemWdth,
  ItemHght,
  ItemCode,
}) => {
  const [chartType, setChartType] = useState(false);

  let dbdtCodeSplit = DbDtCode.split("###");

  const initPstn = {
    Left: 0,
    Top: 0,
    Width: 0,
    Height: 0,
  };
  const [pstnItem, setPstnItem] = useState(initPstn);
  useEffect(() => {
    setPstnItem({
      ...pstnItem,
      Top: Item_Top,
      Left: ItemLeft,
      Width: ItemWdth,
      Height: ItemHght,
    });
  }, [Item_Top, ItemLeft, ItemWdth, ItemHght]);

  useEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 480) {
        setPstnItem({
          ...pstnItem,
          Top: 0,
          Left: 0,
          Width: 100,
          Height: 400,
        });
      } else {
        setPstnItem({
          ...pstnItem,
          Top: Item_Top,
          Left: ItemLeft,
          Width: ItemWdth,
          Height: ItemHght,
        });
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (dbdtCodeSplit[1] && dbdtCodeSplit[1].includes(",")) {
      setChartType(true); // Multi Chart
    } else {
      setChartType(false); // Single Chart
    }
  }, [DbDtCode]);

  return (
    // <div key={key} className={`ChartElement ${ItemCode}`}>
    //   <div className="ChartElement__wrapper">
    //     {!chartType &&
    //       itemCharts &&
    //       Array.isArray(itemCharts) &&
    //       itemCharts.length > 0 && <ChartSingle dataChart={itemCharts[0]} />}

    //     {chartType && itemCharts && <ChartMulti dataChart={itemCharts} />}
    //   </div>
    // </div>

    <Draggable
      // defaultPosition={{ x: Item_Top, y: ItemLeft }}
      // position={{ x: pstnItem.Top, y: pstnItem.Left }}
      defaultPosition={{ x: pstnItem.Top, y: pstnItem.Left }}
      bounds="parent"
      handle="strong"
      // grid={[10, 10]}
      onStart={() => false}
    >
      <div>
        <div key={key} className={`ChartElement ${ItemCode}`}>
          <div className="ChartElement__wrapper">
            {!chartType &&
              itemCharts &&
              Array.isArray(itemCharts) &&
              itemCharts.length > 0 && (
                <ChartSingle
                  dataChart={itemCharts[0]}
                  ItemWdth={pstnItem.Width}
                  ItemHght={pstnItem.Height}
                />
              )}

            {chartType && itemCharts && (
              <ChartMulti
                dataChart={itemCharts}
                ItemWdth={pstnItem.Width}
                ItemHght={pstnItem.Height}
              />
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ElementChart;
