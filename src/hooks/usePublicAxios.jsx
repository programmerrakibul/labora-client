import axios from "axios";

const instance = axios.create({
  baseURL: "https://labora-marketplace.vercel.app",
});

const usePublicAxios = () => {
  return instance;
};

export default usePublicAxios;
