const AUTH_TOKEN_KEY = "__labora_session_token__";

const setItem = (key, value) => {
  if (typeof window === "undefined") return;

  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`[localStorage] Error saving key "${key}":`, error);
  }
};

const getItem = (key, defaultValue = null) => {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.error(`[localStorage] Error reading key "${key}":`, error);
    return defaultValue;
  }
};

const removeItem = (key) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[localStorage] Error removing key "${key}":`, error);
  }
};

const clearStorage = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error("[localStorage] Error clearing storage:", error);
  }
};

const setAuthToken = (token) => {
  if (token) {
    setItem(AUTH_TOKEN_KEY, token);
  } else {
    removeItem(AUTH_TOKEN_KEY);
  }
};

const getAuthToken = () => {
  return getItem(AUTH_TOKEN_KEY);
};

const localStorageUtils = {
  setItem,
  getItem,
  removeItem,
  clearStorage,
  AUTH_TOKEN_KEY,
  setAuthToken,
  getAuthToken,
};

export default localStorageUtils;
