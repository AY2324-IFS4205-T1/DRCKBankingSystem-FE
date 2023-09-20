import { NextResponse } from "next/server";
// TODO: Send me the type of user for me to check

export async function middleware(request) {
  const response = NextResponse.next();
  const path = request.nextUrl.pathname; // Get the current path

  const tokenValue = request.cookies.get("token")?.value; // Get token value

  const checkUser = await fetch(new URL(`${process.env.DJANGO_BASE_URL}/auth_check`).href, {
    method: "GET",
    headers: {
      Authorization: `Token ${tokenValue}`,
    },
  });

  // USER NOT AUTH, ACCESSING / or /customer/login or /customer/register or /staff/login, return normal response
  if (
    !checkUser.ok &&
    (path === "/" || path === "/customer/login" || path === "/customer/register" || path === "/staff/login")
  ) {
    return response;
  }

  // USER NOT AUTH, ACCESSING ANY PLACE, return unauthorized
  if (!checkUser.ok) {
    return new Response("Unauthorized", { status: 401 });
  }

  // USER AUTH, ACCESSING / or /customer/login, or /customer/register, return to /customer/dashboard TODO: type checking to redirect to respective dashboard
  if (checkUser.ok && (path === "/" || path === "/customer/login" || path === "/customer/register")) {
    return NextResponse.redirect(new URL("/customer/dashboard", request.url));
  }

  // USER AUTH, ACCESSING / OR /CUSTOMER/LOGIN, return to /customer/dashboard TODO: type checking to redirect to respective dashboard
  if (checkUser.ok && (path === "/" || path === "/staff/login")) {
    return NextResponse.redirect(new URL("/staff/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - staff/login //TODO: Remove once staff is implemented
     * - api
     * - _next/static
     * - _next/image
     * - favicon.ico
     */
    "/((?!staff/login|api|_next/static|_next/image|images/).*)",
  ],
};
