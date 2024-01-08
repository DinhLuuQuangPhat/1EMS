export const STORAGE =  {
  getCompany () {
    const companyData = localStorage.getItem("company");
    return companyData ? JSON.parse(companyData) : null;
  },

  setConfig (data){
    localStorage.setItem("appConfig", data ? JSON.stringify(data) : null);
  },

  getConfig (){
    const config = localStorage.getItem("appConfig");
    return config ? JSON.parse(config) : null;
  }
}

const getCompany = {
  "COMPCODE": "PMC",
  "COMPNAME": "Công ty TNHH Giải pháp Tin học FirstEMS - PMC 1427",
  "LCTNLIST": [
    {
      "LCTNCODE": "001",
      "LCTNNAME": "CN1 - Công ty TNHH Giải pháp Tin học FirstEMS - PMC 1427"
    }
  ]
}