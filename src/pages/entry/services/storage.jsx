const StorageUtils = {
  getLangCode: () => {
    return localStorage.getItem("langCode") ?? "v";
  }
}

export default StorageUtils;