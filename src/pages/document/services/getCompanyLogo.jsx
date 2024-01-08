import {useState} from "react";
export default function getCompanyLogo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null );
  const getLogo = (url) => {
    fetch(url, {
      method: "GET",
      headers: {
        token: localStorage.getItem("usertoken"),
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setData(imageUrl);
      }).catch((err) => {
        setError(err);
      });
  }

  return {
    getLogo: getLogo,
    data: data,
    error: error,
  }
}