import React, {useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import Button from "../button/Button";

export function FileInputItemReview({fileItem}) {
  const [fileData, setFileData] = useState(undefined);

  useEffect(() => {
    if (fileItem.DATA) {
      setFileData(URL.createObjectURL(fileItem.DATA));
    } else if(fileItem.FILE_URL) {
      getFileData(fileItem.FILE_URL);
    }
  }, [fileItem]);

  const getFileData = (fileUrl) => {
    if (fileUrl === undefined){
      return;
    }

    const token = localStorage.getItem("usertoken");

    fetch(fileUrl, { method: "GET", headers: { token: token, } })
      .then((response) => response.blob())
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        setFileData(url);
      });
  };

  const download = (url, name) => {
    var token = localStorage.getItem("usertoken");

    fetch(url, { method: "GET", headers: { token: token, }})
      .then((response) => response.blob())
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <div className={'m-2 file-item flex items-center cursor-pointer'}>
      {fileItem && (
        <>
          {(fileItem.FILETYPE === "png" || fileItem.FILETYPE === "jpg") && fileData && (
            <img alt={fileItem.FILENAME} className="w-5 h-5 m-1" src={fileData}/>
          )}

          <p
            className="text-sm w-full italic underline text-blue-500"
            onClick={() => {
              download(
                fileItem.FILE_URL,
                fileItem.FILENAME + "." + fileItem.FILETYPE
              );
            }}
          >
            {fileItem.FILENAME + "." + fileItem.FILETYPE}
          </p>
        </>
      )}
    </div>
  )
}

export default function FileInputItem(props) {
  const [fileData, setFileData] = useState(undefined);

  useEffect(() => {
    if (props.fileItem.DATA) {
      setFileData(URL.createObjectURL(props.fileItem.DATA));
    } else if(props.fileItem.FILEPATH) {
      getFileData(props.fileItem.FILEPATH);
    }
  }, [])

  const getFileData = (fileUrl) => {
    if (fileUrl === undefined){
      return;
    }

    const token = localStorage.getItem("usertoken");

    fetch(fileUrl, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        setFileData(url);
      });
  };

  const download = (url, name) => {
    var token = localStorage.getItem("usertoken");
    fetch(url, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <div className={'select-file-item'}>
      <div className="flex items-center cursor-pointer">
        {props.fileItem.FILETYPE === "png" || props.fileItem.FILETYPE === "jpg" ? (
          fileData && <img alt={props.fileItem.FILENAME} className="w-5 h-5 m-1" src={fileData}/>
        ) : (
          <div className="m-2">{props.fileItem.ICON}</div>
        )}

        <p
          className="text-sm w-full italic underline text-blue-500"
          onClick={() => {
            download(
              props.fileItem.FILEPATH,
              props.fileItem.FILENAME + "." + props.fileItem.FILETYPE
            );
          }}
        >
          {props.fileItem.FILENAME + "." + props.fileItem.FILETYPE}
        </p>

        {!props.disabled && (
          <Button icon={<AiOutlineClose/>} onClick={() => props.onFileRemove(props.fileItem)} className="text-red-500">
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}

