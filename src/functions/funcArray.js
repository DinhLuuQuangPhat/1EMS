export const findDistanceField = (data, fieldName) => {
  let Result;
  if (Array.isArray(data)) {
    return (Result = [...new Set(data.map((item) => item[fieldName]))]);
  } else {
    return (Result = "");
  }
};

export const convertDataChart = (data, fieldName) => {
  const newDataStructure = [];
  const tempDataMap = {};

  data.forEach((item) => {
    const fieldValue = item[fieldName];
    const { [fieldName]: field, ...rest } = item;

    if (!tempDataMap[fieldValue]) {
      tempDataMap[fieldValue] = { name: field, data: [] };
      newDataStructure.push(tempDataMap[fieldValue]);
    }

    tempDataMap[fieldValue].data.push({ ...rest });
  });

  // Sort TimeCode within each subarray
  newDataStructure.forEach((subarray) => {
    subarray.data.sort((a, b) => {
      // Assuming TimeCode is in the format MM-YYYY
      const aDate = new Date(
        `${a.TimeCode.slice(3)}-${a.TimeCode.slice(0, 2)}-01`
      );
      const bDate = new Date(
        `${b.TimeCode.slice(3)}-${b.TimeCode.slice(0, 2)}-01`
      );
      return aDate - bDate;
    });
  });

  return newDataStructure;
};

export const transformAndSortDataStructure = (data) => {
  const newDataStructure = [];
  const tempDataMap = {};

  if (Array.isArray(data)) {
    data.forEach((item) => {
      // const { IndcName, ChartType, ...rest } = item;
      const { IndcName, ElemType, ...rest } = item;

      if (!tempDataMap[IndcName]) {
        // tempDataMap[IndcName] = { name: IndcName, ChartType, data: [] };
        tempDataMap[IndcName] = { name: IndcName, ElemType, data: [] };
        newDataStructure.push(tempDataMap[IndcName]);
      }

      tempDataMap[IndcName].data.push({ ...rest });
    });

    // Sort TimeCode within each subarray
    newDataStructure.forEach((subarray) => {
      subarray.data.sort((a, b) => {
        const aDate = new Date(
          `${a.TimeCode.slice(3)}-${a.TimeCode.slice(0, 2)}-01`
        );
        const bDate = new Date(
          `${b.TimeCode.slice(3)}-${b.TimeCode.slice(0, 2)}-01`
        );
        return aDate - bDate;
      });
    });

    return newDataStructure;
  } else {
    return [];
  }
};

export const sortArrayByField = (array, field) => {
  return array.slice().sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    } else {
      return aValue - bValue;
    }
  });
};

export const getChartType = (arrayData, elemType) => {
  return arrayData[elemType] || "";
};

// export const dataChartType = {
//   1: "column",
//   2: '"column"###stack={true}',
//   3: `"column"###stack={{type: "100%"}}`,
//   4: '"bar"',
//   5: '"bar"###stack={true}',
//   6: `"bar"###stack={{type: "100%"}}`,
//   7: '"area"',
//   8: '"area"###stack={true}',
//   9: `"area"###stack={{type: "100%"}}`,
//   10: '"verticalArea"',
//   11: "line",
//   30: '"pie"',
//   31: '"donut"',
//   32: '"donut"',
// };

export const dataChartType = {
  1: "column",
  2: "column###{true}",
  3: 'column###{"type": "100%"}',
  4: "bar",
  5: "bar###{true}",
  6: 'bar###{"type": "100%"}',
  7: "area",
  8: "area###{true}",
  9: 'area###{"type": "100%"}',
  10: "verticalArea",
  11: "line",
  30: "pie",
  31: "donut",
  32: "donutmulti",
};

export const transformChartData = (dataChart, FieldName) => {
  const transformedChart = {
    DbDtCode: dataChart.DbDtCode,
    ElemType: dataChart.ElemType,
    ElemPara: dataChart.ElemPara,
    ElemData: [],
  };

  const chartTypeSplit = dataChartType[dataChart.ElemType].split("###");
  const ChartType = chartTypeSplit[0];
  const ChartStack = chartTypeSplit[1] || null;

  if (dataChart.ElemData.length > 0) {
    dataChart.ElemData.forEach((item) => {
      const chartFieldName = item[FieldName];
      const existingChart = transformedChart.ElemData.find(
        (chart) => chart.ChartName === chartFieldName
      );

      if (!existingChart) {
        transformedChart.ElemData.push({
          ChartName: chartFieldName,
          ChartType: ChartType,
          ChartStack: ChartStack,
          data: [],
        });
      }

      const dataIndex = transformedChart.ElemData.findIndex(
        (chart) => chart.ChartName === chartFieldName
      );
      transformedChart.ElemData[dataIndex].data.push(item);
    });

    return transformedChart;
  } else {
    return [];
  }
};
