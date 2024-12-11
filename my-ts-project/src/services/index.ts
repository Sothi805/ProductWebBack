import axios, { AxiosError, ResponseType } from "axios";
import { Cookies } from "react-cookie";

// const TIME_OUT = 50 * 1000;

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_HOST,
});

let caches: any = {};

axiosInstance.interceptors.response.use(
  (response) => {
    caches[response.config.url ?? ""] = false;
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(response); 
  },
  (error: AxiosError) => {
    caches[error.config?.url ?? ""] = false;
    return Promise.reject(error);
  }
);

const cookies = new Cookies();

const request = async (
  method: string,
  url: string,
  data?: any,
  responseType?: ResponseType,
  headers?: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axiosInstance({
        method,
        url,
        data,
        headers: {
          Authorization: cookies.get("token") ? `Bearer ${cookies.get("token")}` : "",
          ...headers,
        },
        responseType: responseType ?? "json",
      })
        .then((response) => {
          resolve({ data: response.data, headers: response.headers });
        })
        .catch((error: AxiosError) => {
          // Improved error handling with type safety
          
          if (error.code === AxiosError.ERR_NETWORK) {
            reject(new Error("Network error: Please check your connection."));
            return;
          }

          if (error.response?.status === 401 && window.location.pathname !== "/login") {
            window.location.href = "/login";
            return;
          }

          if (error.response?.status === 204) {
            resolve("Update Successfully");
            return;
          }

          if (error.code === "ERR_CANCELED") {
            reject("Request timed out.");
            return;
          }

          // Safely check the structure of the error response
          const errorMessage = getErrorMessage(error);
          reject(errorMessage);
        });
    }, 1000);
  });
};

// Helper function to extract error message safely
function getErrorMessage(error: AxiosError): string {
  // Check if response and data exist
  if (error.response && error.response.data) {
    const data = error.response.data as { error?: string };
    if (data.error) {
      return data.error;  // Return error if available
    }
  }
  return "An unexpected error occurred.";
}

export default request;
