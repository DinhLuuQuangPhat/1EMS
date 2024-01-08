import {comCodeCommon} from "../../../constants";

export const DocumentTemplateAPI = {
  generateCode: "Api/data/runApi_Data?run_Code=DTA018",

  list: "Api/data/runApi_Data?run_Code=DTA002",
  view: "Api/data/runApi_Data?run_Code=DTA005",


  create: "Api/data/runApi_Data?run_Code=DTA007",
  update: "Api/data/runApi_Data?run_Code=DTA008",
  delete: "Api/data/runApi_Data?run_Code=DTA009",
}

export const getDocumentTemplateCode = (KEY_CODE) => {
  return comCodeCommon + KEY_CODE;
}