import React, { useState, useEffect } from "react";
import classes from "./ElementTarget.module.css";
import Draggable from "react-draggable";

const ElementTarget = ({
  itemTarget,
  DbDtCode,
  key,
  Item_Top,
  ItemLeft,
  ItemWdth,
  ItemHght,
  ItemCode,
}) => {
  const [targetType, setTargetType] = useState();
  const [elementData, setElementData] = useState();
  let DbDtCodeSplit = DbDtCode.split("###");

  useEffect(() => {
    setTargetType(DbDtCodeSplit[1]);
    setElementData(itemTarget[0].ElemData);
  }, [DbDtCode]);

  const styleItem = {
    width: ItemWdth,
    height: ItemHght,
  };

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

  return (
    <Draggable
      // defaultPosition={{ x: Item_Top, y: ItemLeft }}
      // position={{ x: pstnItem.Top, y: pstnItem.Left }}
      defaultPosition={{ x: pstnItem.Top, y: pstnItem.Left }}
      bounds="parent"
      handle="strong"
      // grid={[10, 10]}
      onStart={() => false}
    >
      <div style={styleItem}>
        <div key={key} className={classes.TargetElement + " " + ItemCode}>
          {targetType == 61 &&
            elementData.length > 0 &&
            elementData.map((item) => (
              <div className={classes.TargetElement__wrapper}>
                <h3 className={classes.TargetElement__number}>
                  {new Intl.NumberFormat("en-US").format(item.Vlue_001)}
                </h3>
                <p className={classes.TargetElement__name}>{item.Name_001}</p>
              </div>
            ))}

          {targetType == 62 &&
            elementData.length > 0 &&
            elementData.map((item) => (
              <div className={classes.TargetElement__wrapper}>
                <h3 className={classes.TargetElement__number}>
                  {new Intl.NumberFormat("en-US").format(item.Vlue_001)}
                </h3>
                <p className={classes.TargetElement__name}>{item.Name_001}</p>
                <br />
                <h3 className={classes.TargetElement__number}>
                  {new Intl.NumberFormat("en-US").format(item.Vlue_002)}
                </h3>
                <p className={classes.TargetElement__name}>{item.Name_002}</p>
              </div>
            ))}

          {targetType == 63 &&
            elementData.length > 0 &&
            elementData.map((item) => (
              <div className={classes.TargetElement__wrapper}>
                <h3 className={classes.TargetElement__number}>
                  {new Intl.NumberFormat("en-US").format(item.Vlue_001)}
                </h3>
                <p className={classes.TargetElement__name}>{item.Name_001}</p>
                <br />
                <h3 className={classes.TargetElement__number}>
                  {new Intl.NumberFormat("en-US").format(item.Vlue_002)}
                </h3>
                <p className={classes.TargetElement__name}>{item.Name_002}</p>
                <br />
                <h3 className={classes.TargetElement__number}>
                  {new Intl.NumberFormat("en-US").format(item.Vlue_003)}
                </h3>
                <p className={classes.TargetElement__name}>{item.Name_003}</p>
              </div>
            ))}
        </div>
      </div>
    </Draggable>
  );
};

export default ElementTarget;
