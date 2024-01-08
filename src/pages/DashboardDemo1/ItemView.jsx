import React, { useEffect, useState } from "react";
import ElementChart from "./ElementChart";
import ElementTarget from "./ElementTarget";

const ItemView = ({ ItemList }) => {
  return (
    <div className="relative">
      {ItemList &&
        ItemList.length > 0 &&
        ItemList.map((item, idx) => (
          <>
            {item.DsbrType === 1 && item.ElemList.length > 0 && (
              <ElementChart
                key={idx}
                itemCharts={item.ElemList}
                DbDtCode={item.DbDtCode}
                Item_Top={item.Item_Top}
                ItemLeft={item.ItemLeft}
                ItemWdth={item.ItemWdth}
                ItemHght={item.ItemHght}
                ItemCode={item.ItemCode}
              />
            )}
            {item.DsbrType === 4 && item.ElemList.length > 0 && (
              <ElementTarget
                key={idx}
                itemTarget={item.ElemList}
                DbDtCode={item.DbDtCode}
                Item_Top={item.Item_Top}
                ItemLeft={item.ItemLeft}
                ItemWdth={item.ItemWdth}
                ItemHght={item.ItemHght}
                ItemCode={item.ItemCode}
              />
            )}
          </>
        ))}
    </div>
  );
};

export default ItemView;
