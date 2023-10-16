import axios from "axios";
import { page_permissions } from "../page_permissions";
import { useRouter } from "next/router";

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

export default async function Authorization() {
  const router = useRouter();
  const { originalPath } = router.query;
  console.log("ORIGINAL PATH: " + originalPath);
  const authToken = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("userType");

  const requested_path = originalPath.split("/", 3).join("/");
  const required_role = page_permissions[requested_path];

  // To redirect portal type when authentication failed
  let res = await checkUserAuthentication(authToken, required_role);
  let status = res.status;

  if (status == HttpStatusCode.Ok) {
    router.push(originalPath);
  } else if (status == HttpStatusCode.Unauthorized) {
    // Invalid or no token
    if (userType === "") {
      router.push("/");
    }

    router.push(`/${userType}/login`);
  } else if (status == HttpStatusCode.Forbidden) {
    // Not authorised or 2FA authenticated
    let data = await res.json();

    if (!data.authorised) {
      // no authorisation page?
      router.push(`/${userType}/dashboard`);
    } else if (!data.authenticated) {
      // If page is setup/verify 2FA, allow the user to perform 2FA first
      if (originalPath == `/${userType}/setup` || originalPath == `/${userType}/verify`) {
        router.push(originalPath);
      }

      if (data.authenticated_message == "User does not have 2FA set up.") {
        router.push(`/${userType}/setup`);
      } else if (
        data.authenticated_message == "The session has changed, 2FA needs to be verified again." ||
        data.authenticated_message == "2FA has not been verified." ||
        data.authenticated_message == "2FA timeout, 2FA needs to be verified again."
      ) {
        router.push(`/${userType}/verify`);
      }
    }
  } else {
    // unknown err page?
    console.log(`Error expected with unhandled status ${status}`);
  }

  return (
    <>
      <div>
        <p>Checking authorization.....</p>
      </div>
    </>
  );
}
