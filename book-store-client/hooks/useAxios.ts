import { useMemo } from "react";
import axios, { AxiosInstance } from "axios";

const useAxios = (): AxiosInstance => {
  const api = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:4000/api",
      withCredentials: true,
    });
  }, []);

  return api;
};

export default useAxios;
