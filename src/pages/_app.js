import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { page_exceptions } from "@/page_exceptions";
import { HttpStatusCode } from "axios";
import axios from "@/axiosConfig";

import { ToastContainer } from "react-toastify";

async function checkUserAuthentication(pathname, setLoading) {
  // used for nav bar access control
  let role;

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth_check`, { page_name: pathname });
    // If the user has already verified 2FA and tries to access verify/setup page again
    if (pathname == `/${response.data.user_authorisation.toLowerCase()}/setup` || pathname == `/${response.data.user_authorisation.toLowerCase()}/verify`) {
      window.location.href = `../${response.data.user_authorisation.toLowerCase()}/dashboard`
      return;
    }

    role = response.data.user_role;
    setLoading(false);
  } catch (err) {
    // If user is not login, or page_name provided is invalid
    if (err.response.status == HttpStatusCode.Unauthorized || err.response.data == HttpStatusCode.BadRequest) {
      window.location.href = "/";
    } else if (err.response.status == HttpStatusCode.Forbidden) {
      const { data } = err.response;

      if (!data.authenticated) {
        // If the page is setup/verify 2FA, allow the user to perform 2FA first
        if ((pathname == `/${data.user_authorisation.toLowerCase()}/setup` && data.authenticated_message === "User does not have 2FA set up.") ||
          pathname == `/${data.user_authorisation.toLowerCase()}/verify` && data.authenticated_message === "2FA has not been verified.") {
          setLoading(false);
          return;
        }

        if (data.authenticated_message === "User does not have 2FA set up.") {
          window.location.href = `../${data.user_authorisation.toLowerCase()}/setup`;
        } else if (data.authenticated_message === "2FA has not been verified.") {
          window.location.href = `../${data.user_authorisation.toLowerCase()}/verify`;
        }
      } else if (!data.authorised) {
        window.location.href = `../${data.user_authorisation.toLowerCase()}/dashboard`;
      }

      role = data.user_role;
    }
  }

  return role;
}

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const pathname = useRouter().pathname;

  useEffect(() => {
    setLoading(true);

    // Get the required role from permissions
    const requested_path = pathname.split('/', 3).join('/');

    if (page_exceptions.includes(requested_path)) {
      // Exception to pages not requiring roles
      setLoading(false);
      return;
    } 

    const getAuth = async() => {
      pageProps['role'] = await checkUserAuthentication(requested_path, setLoading);
    }
    getAuth();
    
  }, [pathname]);

  return (
    <>
      <NextUIProvider>
        {loading ?
          <><h1>Loading...</h1></>
          :
          <>
            <Component {...pageProps} />
            <ToastContainer />
          </>
        }
      </NextUIProvider>
    </>
  );
}

