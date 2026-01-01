import axios from "axios";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

const useSecureAxios = () => {
  useEffect(() => {
    const responseInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;

      return config;
    });

    return () => {
      instance.interceptors.request.eject(responseInterceptor);
    };
  }, []);

  return instance;
};

export default useSecureAxios;
