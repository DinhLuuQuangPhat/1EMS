import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";

import FrameItem from "./FrameItem";

const DashboardDrag = () => {
  const [frameList, setFrameList] = useState([]);
  const initFrame = {
    x: 0,
    y: 0,
    width: 300,
    height: 200,
    zIndex: 100,
    ItemCode: 0,
  };

  const addNewFrame = () => {
    const newFrame = {
      ...initFrame,
      zIndex: frameList.length + 1,
      ItemCode: frameList.length + 1,
    };
    setFrameList((prevFrames) => [...prevFrames, newFrame]);
  };
  const removeFrame = (dataItem) => {
    const updatedFrameList = frameList.filter(
      (frame) => frame.ItemCode !== dataItem
    );
    setFrameList(updatedFrameList);
  };

  return (
    <div className="relative DashboardMain">
      <h1>React Draggable Example</h1>
      <div className="ToolBar"> 
        <Button onClick={addNewFrame}>Them moi Item</Button>
      </div>
      <div className="DashboardInfo relative w-full h-screen">
        {/* Add Frame into Dashboard */}
        {frameList.map((frame) => (
          <FrameItem
            key={frame.ItemCode}
            frame={frame}
            removeFrame={removeFrame}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardDrag;
