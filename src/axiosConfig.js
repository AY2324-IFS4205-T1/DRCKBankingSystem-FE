// Axios config for client browser to front end API
// This provides the default configuration for base URL and
// retrieving the auth token from sessionStorage

import axios from "axios";
import Router from "next/router";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Token ${sessionStorage.getItem("token")}`;

  return config;
});

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.data.detail == "User does not have 2FA set up." ||
//       error.response.data.detail == "The session has changed, 2FA needs to be verified again." ||
//       error.response.data.detail == "2FA has not been verified." ||
//       error.response.data.detail == "2FA timeout, 2FA needs to be verified again."
//     ) {
//       // Router.reload();
//     }
//   },
// );

export default instance;
