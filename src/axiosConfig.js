// Axios config for client browser to front end API
// This provides the default configuration for base URL and
// retrieving the auth token from cookies

import axios from "axios";
import Router from "next/router";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Token ${getCookie("token")}`;
  config.headers.csrftoken = getCookie("csrftoken");

  return config;
});

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     let userType = getCookie("userType").toLowerCase();

//     if (error.response.data.detail == "User does not have 2FA set up.") {
//       Router.push(`/${userType}/setup`);
//     } else if (
//       error.response.data.detail == "The session has changed, 2FA needs to be verified again." ||
//       error.response.data.detail == "2FA has not been verified." ||
//       error.response.data.detail == "2FA timeout, 2FA needs to be verified again."
//     ) {
//       Router.push(`/${userType}/verify`);
//     }
//   },
// );

export default instance;
