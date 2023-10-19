import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { page_permissions } from "@/page_permissions";
import { HttpStatusCode } from "axios";
import axios from "@/axiosConfig";

import { ToastContainer } from "react-toastify";

async function checkUserAuthentication(required_role, pathname, setLoading) {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth_check`, { page_type: required_role });
    setLoading(false);
  } catch (err) {
    if (err.response.status == HttpStatusCode.Unauthorized) {
      window.location.href = "/";
    } else if (err.response.status == HttpStatusCode.Forbidden) {
      const { data } = err.response;

      if (!data.authenticated) {
        // If the page is setup/verify 2FA, allow the user to perform 2FA first
        if (pathname == `/${data.user_authorisation.toLowerCase()}/setup` ||
          pathname == `/${data.user_authorisation.toLowerCase()}/verify`) {
          setLoading(false);
          return;
        }

        if (data.authenticated_message === "User does not have 2FA set up.") {
          window.location.href = `../${data.user_authorisation.toLowerCase()}/setup`;
        } else if (
          data.authenticated_message === "The session has changed, 2FA needs to be verified again." ||
          data.authenticated_message === "2FA has not been verified." ||
          data.authenticated_message === "2FA timeout, 2FA needs to be verified again."
        ) {
          window.location.href = `../${data.user_authorisation.toLowerCase()}/verify`;
        }
      }

    }
  }

}

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const pathname = useRouter().pathname;

  useEffect(() => {
    setLoading(true);

    // Get the required role from permissions
    const requested_path = pathname.split('/', 3).join('/');
    const required_role = page_permissions[requested_path];

    if (required_role === "") {
      // Exception to pages not requiring roles
      setLoading(false);
      return;
    } else if (required_role === undefined) {
      // Undefined pages. Should go to 404.
      window.location.href = "/";
    }

    checkUserAuthentication(required_role, pathname, setLoading);
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

