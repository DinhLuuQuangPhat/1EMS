import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import classes from "./FrameItem.module.css";
import { arrowsMoveIcon, xIcon } from "@progress/kendo-svg-icons";
import { Button } from "@progress/kendo-react-buttons";

const FrameItem = ({ frame, removeFrame }) => {
  const frameStyle = {
    // width: "200px",
    // height: "200px",

    width: frame.width,
    height: frame.height,

    backgroundColor: "lightblue",
    //   display: "flex",
    //   flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //   cursor: "grab",
    //   userSelect: "none",
    border: "1px solid #ccc",
    // position: "absolute",
    position: "relative",
  };

  const intState = {
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: -400,
      y: 200,
    },
  };

  const handleStart = (e, ui) => {
    console.log(`Frame ${frame.ItemCode} position:`, ui);
    console.log("e", e);
  };
  const handleDrag = (e, ui) => {
    console.log(`Frame ${frame.ItemCode} position:`, ui);
    console.log("e", e);
  };
  const handleStop = (e, ui) => {
    console.log(`Frame ${frame.ItemCode} position:`, ui);
    console.log("e", e);
  };

  // Listener Div Resize
  const divRef = useRef(null);
  useEffect(() => {
    const handleResize = (e) => {
      console.log("handleResize", e);
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Draggable
      // defaultPosition={{ x: frame.x, y: frame.y }}
      bounds="parent"
      handle="strong"
      zIndex={frame.zIndex}
      // onStart={handleStart}
      // onDrag={onControlledDrag}
      onStop={handleStop}
      grid={[10, 10]}
      //   onStop={handleDrag}
    >
      <div style={frameStyle} className={classes.frameitem} ref={divRef}>
        <div className={classes.toolbar}>
          <div className="flex gap-1 justify-end">
            <strong>
              <Button svgIcon={arrowsMoveIcon} className="cursor-move" />
            </strong>
            <Button
              svgIcon={xIcon}
              onClick={() => removeFrame(frame.ItemCode)}
            />
          </div>
        </div>
        <div className={classes.frame_chart}>
          <span>Frame {frame.ItemCode}</span>
        </div>
      </div>
    </Draggable>
  );
};

export default FrameItem;
