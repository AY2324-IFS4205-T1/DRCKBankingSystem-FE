import axios from "axios";
import { page_permissions } from "../page_permissions";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

//if required role undefined?
async function checkUserAuthentication(authToken, required_role) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth_check`, {
    method: "POST",
    headers: {
      Authorization: authToken,
    },
    body: JSON.stringify({ page_type: required_role }),
  });

  return res;
}

export default function Authorization() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = sessionStorage.getItem("token") || "";
        const userType = sessionStorage.getItem("userType") || "";
        const originalPath = router.asPath;
        console.log("Original Path: " + originalPath);

        const url = new URL(originalPath, window.location.origin);
        const requested_path = url.searchParams.get("originalPath");
        console.log("Requested Path: " + requested_path);

        const required_role = page_permissions[requested_path];
        console.log("Required Role: " + required_role);

        // To redirect portal type when authentication failed
        let res = await checkUserAuthentication(authToken, required_role);
        let status = res.status;
        console.log("Status: " + status);

        if (status === HttpStatusCode.Ok) {
          router.push(requested_path);
        } else if (status === HttpStatusCode.Unauthorized) {
          // Invalid or no token
          if (userType === "") {
            router.push("/");
          } else {
            router.push(`/${userType}/login`);
          }
        } else if (status === HttpStatusCode.Forbidden) {
          // Not authorized or 2FA authenticated
          let data = await res.json();

          if (!data.authorised) {
            // no authorization page?
            router.push(`/${userType}/dashboard`);
          } else if (!data.authenticated) {
            // If the page is setup/verify 2FA, allow the user to perform 2FA first
            if (requested_path === `/${userType}/setup` || requested_path === `/${userType}/verify`) {
              router.push(requested_path);
            }

            if (data.authenticated_message === "User does not have 2FA set up.") {
              router.push(`/${userType}/setup`);
            } else if (
              data.authenticated_message === "The session has changed, 2FA needs to be verified again." ||
              data.authenticated_message === "2FA has not been verified." ||
              data.authenticated_message === "2FA timeout, 2FA needs to be verified again."
            ) {
              router.push(`/${userType}/verify`);
            }
          }
        } else {
          // unknown error page?
          console.log(`Error expected with unhandled status ${status}`);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Checking authorization.....</p>
    </div>
  );
}
