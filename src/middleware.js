import { NextResponse } from "next/server";

async function checkUserAuthentication(authToken, authUserType) {
  const res = await fetch('http://localhost:3000/api/auth_check', {
    method: "GET",
    headers: {
      Authorization: authToken,
      Usertype: authUserType,
    }
  });

  return res.status;
}

export async function middleware(request) {
  const response = NextResponse.next();
  const { pathname, origin } = request.nextUrl;

  const authToken = request.cookies.get("token")?.value ? request.cookies.get("token")?.value : "";
  const authUserType = request.cookies.get("userType")?.value ? request.cookies.get("userType")?.value : "";

  // Check pathname matches with the cookie userType. Else redirect to main page
  if (pathname.split("/")[1] != authUserType.toLowerCase()) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Check if the token is still valid
  const status = await checkUserAuthentication(authToken, authUserType);
  if (status === 200) {
    return response;
  } else if (status === 401) {
    // Unauthorised, if the userType cookie exists, redirect based on the portal
    if (authUserType == "Customer") {
      return NextResponse.redirect(new URL('/customer/login', request.url));
    } else if (authUserType == "Staff") {
      return NextResponse.redirect(new URL('/staff/login', request.url));
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    console.log(`Error expected with unhandled status ${status}`);
    return response;
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
