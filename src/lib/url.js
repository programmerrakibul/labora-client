const getFullUrl = () => {
  if (typeof window === "undefined") return "";

  return window.location.href;
};

const urlUtils = {
  getFullUrl,
};

export default urlUtils;
