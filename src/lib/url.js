const getFullUrl = (path) => {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  const origin = url.origin;

  if (path) {
    return new URL(path, origin).toString();
  }

  return window.location.href;
};

const urlUtils = {
  getFullUrl,
};

export default urlUtils;
