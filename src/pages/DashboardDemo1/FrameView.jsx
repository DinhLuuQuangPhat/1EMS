import React from "react";
import ItemView from "./ItemView";

const FrameView = ({ FrameList }) => {
  const Frame01 = FrameList.find((item) => item.FramCode === "01");

  console.log("Frame01", Frame01);

  return (
    <div className="w-full">
      {Frame01?.FramName}
      <ItemView ItemList={Frame01?.ItemList} />
    </div>
  );
  /* {FrameList && FrameList.length>0 && FrameList?.map((item, idx) => (
        <div className="w-full">
          {item.FramName}
          <ItemView ItemList={item.ItemList} key={idx} />
        </div>
      ))} */
};

export default FrameView;
