import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
  });

  return { isLoading, setIsLoading, axiosInstance };
};

export default useAxios;
