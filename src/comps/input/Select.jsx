import React, {useEffect, useMemo, useState} from "react";
import {ComboBox, MultiSelect} from "@progress/kendo-react-dropdowns";
import {filterBy} from "@progress/kendo-data-query";

const Select = ({name, className, options, placeholder, value, onChange, filterable, multiple}) => {
  const [state, setState] = React.useState({
    value: null,
  });
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    if(options != null && options.length > 0){
      setSelectOptions([ ...options]);
    } else {
      setSelectOptions([]);
    }
  }, [options]);

  useEffect(() => {
    if(multiple){
      const initValues = value ? (value + "").split(",") : [];

      const options = selectOptions.filter((opt) => {
        return initValues.includes(opt.id);
      });

      if (options.length > 0) {
        setState({
          value: options
        });
      } else {
        setState({
          value: []
        });
      }
    } else {
      const initValue = value ?? "";

      const options = selectOptions.filter((opt) => {
        return opt.id + "" === initValue + "";
      });

      if (options.length > 0) {
        setState({
          value: options[0],
        });
      } else {
        setState({
          value: null,
        });
      }
    }
  }, [value, selectOptions]);

  const handleChange = (e) => {
    const option = e.target.value;
    if (option) {
      onChange(option.id, option.text);
    } else {
      onChange("");
    }
  }

  const handleMultipleChange = (e) => {
    const options = e.target.value;

    if (options) {
      const vals = options.map((op) => {
        return op.id;
      })
      onChange(vals.join(","), "");
    } else {
      onChange("");
    }
  }

  const filterChange = (event) => {
    setSelectOptions(filterData(event.filter));
  };

  const filterData = (filter) => {
    const data = options.slice();
    return filterBy(data, filter);
  };

  const canFilter = useMemo(() => {
    const _canFilter =  filterable != null ? filterable : true;
    const _multipleOptions = options.length > 8;
    return _canFilter && _multipleOptions;
  }, [filterable, options != null ? options.length: 0]);

  if(multiple){
    return (
      <MultiSelect
        placeholder={placeholder}
        textField={"text"}
        dataItemKey={"id"}

        name={name}
        className={className}
        value={state.value}
        onChange={handleMultipleChange}
        data={selectOptions}

        clearButton={state.value != null && state.value.length > 0}
      />
    )
  } else {
    return (
      <>
        <ComboBox
          textField={"text"}
          dataItemKey={"id"}

          placeholder={placeholder}
          name={name}
          className={className}
          value={state.value}
          onChange={handleChange}
          data={selectOptions}

          clearButton={state.value != null && state.value.id}
          filterable={true}
          onFilterChange={filterChange}
        />
      </>
    )
  }

}

export default Select;