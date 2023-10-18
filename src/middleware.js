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
  script-src 'self' 'nonce-${nonce}';
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
