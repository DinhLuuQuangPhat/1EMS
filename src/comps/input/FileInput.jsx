import React, {useEffect, useRef, useState} from "react";
import {v4} from "uuid";
import FileUtils from "../utils/FileUtils";
import {ButtonIcons} from "../button/ButtonIcons";
import Button from "../button/Button";
import styled from "styled-components";
import FileInputItem from "./FileInputItem";

export default function FileInput({singleUpload, currentFiles, name, disabled, onChange, onRemove}){
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if(currentFiles != null && currentFiles.length > 0){
      const initFiles = currentFiles.filter((file) => {
        return file.FILECODE != null && file.FILECODE !== "";
      }).map((file) => {
        const icon = FileUtils.getFileIcon(file.FILETYPE);

        return {
          id: file.FILECODE,
          FILENAME: file.FILENAME,
          FILEPATH: file.FILE_URL,
          FILETYPE: file.FILETYPE,
          ICON: icon,
          DATA: file.FILEDATA,
        }
      });

      setFiles(initFiles);
    }
  }, [currentFiles]);

  const onFileSelected = (e) => {
    const fileList = [...e.target.files];

    const selectFiles = [];
    fileList.forEach((file) => {
      const fileType = file.name.split(".")[file.name.split(".").length - 1].toLowerCase();
      const icon = FileUtils.getFileIcon(fileType);

      selectFiles.push({
        id: v4(),
        FILENAME: file.name,
        FILEPATH: file.path,
        FILETYPE: fileType,
        ICON: icon,
        DATA: file,
      })
    });

    const newFiles = [
      ...files,
      ...selectFiles
    ]

    setFiles(newFiles);

    if(singleUpload){
      onChange(selectFiles);
    } else {
      onChange(newFiles);
    }
    e.preventDefault();
  };

  const handleOnClick = () => {
    inputRef.current.click();
  }
  const onFileRemove = (fileItem) => {
    const removedFiles = files.filter((item)=> {
      return item.id !== fileItem.id
    });

    onRemove(fileItem, () => {
      setFiles(removedFiles);
      onChange(removedFiles)
    })
  }

  return (
    <UploadFileStyle className={'select-file-input'}>
      <div className={'file-selected'}>
        {files &&
          files.length > 0 &&
          files.map((fileItem) => (
            <FileInputItem
              key={fileItem.id}
              fileItem={fileItem}
              onFileRemove={onFileRemove}
            />
          ))}
      </div>

      <div className={'file-input'}>
        <input
          ref={inputRef}
          style={{display: 'none'}}
          type="file"
          // multiple
          value={null}
          name={name}
          className="text-sm cursor-pointer relative block w-full h-full"
          onChange={(e) => {
            onFileSelected(e);
          }}
          disabled={disabled}
        />

        <label className={"ml-2"}>Vui lòng chọn file để upload...</label>

        <Button icon={ButtonIcons.select} onClick={handleOnClick}>Upload</Button>
      </div>
    </UploadFileStyle>
  )
}

const UploadFileStyle = styled.div`
  border: 1px solid #ccc;
  padding: 5px 10px;
  background: #FFF;
  
  .file-selected{
    .select-file-item{
      padding: 4px 0;
      border-bottom: 1px solid #ccc;
      
      &:last-child{
        margin-bottom: 4px;
      }
    }
  }
  
  .file-input{
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;