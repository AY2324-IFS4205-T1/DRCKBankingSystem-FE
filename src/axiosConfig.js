// Axios config for client browser to front end API
// This provides the default configuration for base URL and
// retrieving the auth token from sessionStorage

import axios, { HttpStatusCode } from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Token ${sessionStorage.getItem("token")}`;

  return config;
});

instance.interceptors.response.use (
  (response) => response,
  (error) => {
    if (error.response.status == HttpStatusCode.TooManyRequests) {
      error.response.data = "You have too many requests. Please try again in a few minutes.";
    } else if (error.response.status == HttpStatusCode.InternalServerError) {
      error.response.data = "Server error.";
    } else if (error.response.status == HttpStatusCode.BadRequest) {
      console.log(error);
      if (error.response.data.non_field_errors instanceof Array) {
        error.response.data = error.response.data.non_field_errors.join("\n");
      }
    }
    
    return Promise.reject(error);
  },
);

export default instance;
