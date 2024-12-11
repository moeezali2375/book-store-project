import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
  });

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        if (response.data?.msg?.title) {
          alert(response.data.msg.title);
        }
        return response;
      },
      (error) => {
        if (error.response?.data?.msg) {
          alert(error.response.data.msg.title);
        } else {
          alert("An unexpected error occurred!");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return { isLoading, setIsLoading, axiosInstance };
};

export default useAxios;
