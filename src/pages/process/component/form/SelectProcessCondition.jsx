import Select from "../../../../comps/input/Select";
import {useStateContext} from "../../../../context/ContextProvider";
import getProcessCondition from "../../services/getProcessCondition";
import {useEffect, useState} from "react";

export default function SelectProcessCondition({value, onChange}){
  const {appColors} = useStateContext();
  const { data} = getProcessCondition(true);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if(data){
      setOptions(data.map((dt) => {
        return {id: Number(dt.ITEM_KEY), text: dt.ITEMNAME};
      }))
    }
  }, [data]);

  return (
    <Select placeholder={"Chọn điều kiện"}
            filterable={false}
            className={appColors.inputColor}
            options={options}
            value={value}
            onChange={onChange}/>
  )
}