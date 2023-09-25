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
  console.log("Middleware triggered");

  const response = NextResponse.next();
  // const path = request.nextUrl.pathname; // Get the current path

  const tokenValue = request.cookies.get("token")?.value; // Get token value
  const userTypeValue = request.cookies.get("userType")?.value; // Get user type value

  try {
    const isAuthenticated = await isUserAuthenticated(tokenValue, userTypeValue);
    if (!isAuthenticated) {
      return NextResponse.redirect('/');
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
    // "/((?!_next/static|_next/image|images/|/|staff/login|customer/login|customer/register).{1,})",
    "/((?!_next/static|_next/image|images/|staff/login|customer/login|customer/register).{1,})"
  ],
};
