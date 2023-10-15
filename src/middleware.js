import { NextResponse } from "next/server";
import { page_permissions } from "./page_permissions";
import { HttpStatusCode } from "axios";

async function checkUserAuthentication(authToken, required_role) {
  const res = await fetch('http://localhost:3000/api/auth_check', {
    method: "POST",
    headers: {
      Authorization: authToken
    },
    body: JSON.stringify({ page_type: required_role })
  });

  return res;
}

export async function middleware(request) {
  const response = NextResponse.next();

  const authToken = request.cookies.get("token")?.value ? request.cookies.get("token")?.value : "";
  const userType = request.cookies.get("userType")?.value ? request.cookies.get("userType")?.value : "";

  const { pathname } = request.nextUrl;
  const requested_path = pathname.split('/', 3).join('/');
  const required_role = page_permissions[requested_path];

  // To redirect portal type when authentication failed
  let res = await checkUserAuthentication(authToken, required_role);
  let status = res.status;
  let data = await res.json();

  if (status == HttpStatusCode.Ok) {
    response.headers.set('X-NAVCONTROL', data.user_authorisation)
    return response;

  } else if (status == HttpStatusCode.Unauthorized) {
    // Invalid or no token
    if (userType === "") {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.redirect(new URL(`/${userType}/login`, request.url));

  } else if (status == HttpStatusCode.Forbidden) {
    // Not authorised or 2FA authenticated

    if (!data.authorised) {
      // no authorisation page?
      return NextResponse.redirect(new URL(`/${userType}/dashboard`, request.url));

    } else if (!data.authenticated) {
      // If page is setup/verify 2FA, allow the user to perform 2FA first
      if (pathname == `/${userType}/setup` || pathname == `/${userType}/verify`) {
        return response;
      }

      if (data.authenticated_message == "User does not have 2FA set up.") {
        return NextResponse.redirect(new URL(`/${userType}/setup`, request.url));

      } else if (data.authenticated_message == "The session has changed, 2FA needs to be verified again." ||
        data.authenticated_message == "2FA has not been verified." ||
        data.authenticated_message == "2FA timeout, 2FA needs to be verified again."
      ) {
        return NextResponse.redirect(new URL(`/${userType}/verify`, request.url));
      }
    }
  } else {
    // unknown err page?
    console.log(`Error expected with unhandled status ${status}`);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api
     * - _next/static
     * - _next/image
     * - favicon.ico
     */
    // "/((?!_next/static|_next/image|images/|/|staff/login|customer/login|customer/register).{1,})",
    "/((?!_next/static|_next/image|images/|favicon.ico|staff/login|customer/login|customer/register|api/|ip).{1,})",
  ],
};
