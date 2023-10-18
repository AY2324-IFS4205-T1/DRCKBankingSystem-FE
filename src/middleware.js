import { NextResponse } from "next/server";
// import { page_permissions } from "./page_permissions";
// import { HttpStatusCode } from "axios";

async function checkUserAuthentication(authToken, required_role) {
  const res = await fetch("http://localhost:3000/api/auth_check", {
    method: "POST",
    headers: {
      Authorization: authToken,
    },
    body: JSON.stringify({ page_type: required_role }),
  });

  return res;
}

export async function middleware(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
  default-src 'self' https://ifs4205-23s1-1-1.comp.nus.edu.sg/;
  script-src 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'nonce-${nonce}' ;
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'none';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, " ").trim(),
  );

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  });
  //   const response = NextResponse.next();

  //   const authToken = request.cookies.get("token")?.value ? request.cookies.get("token")?.value : "";
  //   const userType = request.cookies.get("userType")?.value ? request.cookies.get("userType")?.value : "";

  //   const { pathname } = request.nextUrl;
  //   const requested_path = pathname.split("/", 3).join("/");
  //   const required_role = page_permissions[requested_path];

  //   // To redirect portal type when authentication failed
  //   let res = await checkUserAuthentication(authToken, required_role);
  //   let status = res.status;

  //   if (status == HttpStatusCode.Ok) {
  //     return response;
  //   } else if (status == HttpStatusCode.Unauthorized) {
  //     // Invalid or no token
  //     if (userType === "") {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }

  //     return NextResponse.redirect(new URL(`/${userType}/login`, request.url));
  //   } else if (status == HttpStatusCode.Forbidden) {
  //     // Not authorised or 2FA authenticated
  //     let data = await res.json();

  //     if (!data.authorised) {
  //       // no authorisation page?
  //       return NextResponse.redirect(new URL(`/${userType}/dashboard`, request.url));
  //     } else if (!data.authenticated) {
  //       // If page is setup/verify 2FA, allow the user to perform 2FA first
  //       if (pathname == `/${userType}/setup` || pathname == `/${userType}/verify`) {
  //         return response;
  //       }

  //       if (data.authenticated_message == "User does not have 2FA set up.") {
  //         return NextResponse.redirect(new URL(`/${userType}/setup`, request.url));
  //       } else if (
  //         data.authenticated_message == "The session has changed, 2FA needs to be verified again." ||
  //         data.authenticated_message == "2FA has not been verified." ||
  //         data.authenticated_message == "2FA timeout, 2FA needs to be verified again."
  //       ) {
  //         return NextResponse.redirect(new URL(`/${userType}/verify`, request.url));
  //       }
  //     }
  //   } else {
  //     // unknown err page?
  //     console.log(`Error expected with unhandled status ${status}`);
  //   }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
