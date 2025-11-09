import axios from "axios";
import { useEffect } from "react";
import useAuthInfo from "./useAuthInfo";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

const useSecureAxios = () => {
  const { currentUser } = useAuthInfo();

  useEffect(() => {
    const responseInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;

      return config;
    });

    return () => {
      instance.interceptors.request.eject(responseInterceptor);
    };
  }, [currentUser.accessToken]);

  return instance;
};

export default useSecureAxios;
