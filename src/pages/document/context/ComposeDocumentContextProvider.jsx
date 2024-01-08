import {createContext, useContext, useState} from "react";

const ComposeDocumentContext = createContext({
  files: [],

  onFileChanges: (files) => {
    console.log("ComposeDocumentContext.", files);
  },
});

export const  ComposeDocumentContextProvider = (props) => {
  const [files, setFiles] = useState([]);
  const onFileChanges = (files) => {
    setFiles(files);
  };

  return (
    <ComposeDocumentContext.Provider
      value={{
        files: files,
        onFileChanges: onFileChanges,
      }}>
      {props.children}
    </ComposeDocumentContext.Provider>
  )
}


export const useComposeDocumentContext = () => {
  const context = useContext(ComposeDocumentContext);
  if (!context) {
    throw new Error('useComposeDocumentContext must be used within an ComposeDocumentContextProvider');
  }
  return context;
};