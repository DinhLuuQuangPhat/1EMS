import React, {createContext, useContext, useEffect, useState} from "react";
import TextEditorEditable from "./TextEditorEditable.jsx";

const TextEditorContext = createContext({
  disabled: true,

  content: "",
  values: {},

  onChange: (name, value) => {
    console.log(name, value)
  },
});

export const useTextEditorContext = () => {
  const context = useContext(TextEditorContext);
  if (!context) {
    throw new Error('useTextEditorContext must be used within an TextEditorContext');
  }
  return context;
};

const TextEditorProvider = ({content, values, onChange, disabled}) => {
  const [groupValues, setGroupValues] = useState({...values});

  useEffect(() => {
    setGroupValues({...values});
  }, [values]);

  const handleOnChange = (name, value) => {
    const newValue = {...groupValues, [name]: value};
    setGroupValues(newValue);
    onChange(newValue);
  };

  return (
    <TextEditorContext.Provider
      value={{
        disabled: disabled,
        content: content,

        values: groupValues,
        onChange: handleOnChange, // on field change
      }}>
      <TextEditorEditable />
    </TextEditorContext.Provider>
  );
}

export default TextEditorProvider;