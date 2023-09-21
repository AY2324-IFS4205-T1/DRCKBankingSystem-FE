import { NextResponse } from "next/server";
// TODO: Send me the type of user for me to check
export async function isUserAuthenticated(tokenValue, userTypeValue) {
  try {
    const checkUser = await fetch(new URL(`${process.env.DJANGO_BASE_URL}/auth_check`).href, {
      method: "GET",
      headers: {
        Authorization: `Token ${tokenValue}`,
        Type: userTypeValue,
      },
    });
    return checkUser.ok;
  } catch (exceptionVar) {
    return false;
  }
}
export async function middleware(request) {
  const response = NextResponse.next();
  const path = request.nextUrl.pathname; // Get the current path

  const tokenValue = request.cookies.get("token")?.value; // Get token value
  const userTypeValue = request.cookies.get("userType")?.value; // Get user type value

  try {
    const isAuthenticated = await isUserAuthenticated(tokenValue, userTypeValue);
    // USER NOT AUTH, ACCESSING / or /customer/login or /customer/register or /staff/login, return normal response
    if (
      !isAuthenticated &&
      (path === "/" || path === "/customer/login" || path === "/customer/register" || path === "/staff/login")
    ) {
      return response;
    }

    // USER NOT AUTH, ACCESSING ANY PLACE, return unauthorized
    if (!isAuthenticated) {
      return new Response("Unauthorized", { status: 401 });
    }

    // USER AUTH, ACCESSING /customer/login, or /customer/register, return to /customer/dashboard
    if (isAuthenticated && (path === "/customer/login" || path === "/customer/register")) {
      return NextResponse.redirect(new URL("/customer/dashboard", request.url));
    }

    // USER AUTH, ACCESSING /staff/login, return to /staff/dashboard
    if (isAuthenticated && path === "/staff/login") {
      return NextResponse.redirect(new URL("/staff/dashboard", request.url));
    }

    // USER AUTH, ACCESSING /, return to respective dashboard
    if (isAuthenticated && path === "/") {
      // Redirect based on user type
      if (userTypeValue === "Customer") {
        return NextResponse.redirect(new URL("/customer/dashboard", request.url));
      } else if (userTypeValue === "Staff") {
        return NextResponse.redirect(new URL("/staff/dashboard", request.url));
      }
    }
  } catch (exceptionVar) {
    return new Response("Something went wrong. Please try again.");
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
    "/((?!_next/static|_next/image|images/).*)",
  ],
};
