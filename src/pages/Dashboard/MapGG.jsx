import React from "react";

const MapGG = () => {
  const Login = async () => {
    let body = {
      COMPCODE: "PMC",
      APP_CODE: "WER",
      SYSTCODE: 4,
    };

    let reponse = await fetch(
      "https://api-dev.firstems.com/Api/data/runApi_Syst?run_Code=SYS001",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          token:
            "CmzFIKFr7UvPe6zBPBtn3nkrWOY3UYSLLnTfii/H9QG56Ur6b9XtFty3M9tBEKV1l3d+0mGEXmfQyuGFjrNHYGSODDy+ihkBmsHYUNPgD44=",
        },
        body: JSON.stringify(body),
      }
    );
    let json = reponse.json();

    return json;
  };

  const abc = Login();
};

export default MapGG;
