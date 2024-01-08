import React, { useEffect, useRef } from "react";
import classes from "./FrameItem.module.css";
import { arrowsMoveIcon, xIcon } from "@progress/kendo-svg-icons";
import { Button } from "@progress/kendo-react-buttons";

const ItemResize = ({ frame, removeFrame }) => {
  const frameStyle = {
    //   width: "200px",
    //   height: "200px",
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
    position: "position",

    //   width: "300px",
    //   height: "200px",
    //   border: "1px solid #000",
    //   overflow: "hidden",
  };

  console.log("ItemResize frame", frame);

  const divRef = useRef(null);

  useEffect(() => {
    const handleResize = (e) => {
      // Do something when the div is resized
      console.log(frame.ItemCode);

      console.log(e);
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
    <div ref={divRef} style={frameStyle} className={classes.frameitem}>
      <div className={classes.toolbar}>
        <div className="flex gap-1 justify-end">
          <strong>
            <Button svgIcon={arrowsMoveIcon} className="cursor-move" />
          </strong>
          <Button svgIcon={xIcon} onClick={() => removeFrame(frame.ItemCode)} />
        </div>
      </div>
      <div className={classes.frame_chart}>
        <span>Frame {frame.ItemCode}</span>
      </div>
    </div>
  );
};

export default ItemResize;
