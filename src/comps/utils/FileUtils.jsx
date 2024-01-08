import {BiSave} from "react-icons/bi";
import {AiFillFileExcel, AiFillFileImage, AiFillFileText} from "react-icons/ai";
import React from "react";

const FileUtils = {
  getFileIcon: (fileType) => {
    switch (fileType) {
      case "pdf": {
        return <BiSave />;
      }
      case "xls": {
        return <AiFillFileExcel />;
      }
      case "png": {
        return <AiFillFileImage />;
      }
      default: {
        return <AiFillFileText />;
      }
    }
  }
}

export default FileUtils;