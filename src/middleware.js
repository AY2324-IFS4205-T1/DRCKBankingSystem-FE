import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();
  response.cookies.set({
    name: "vercel",
    value: "whatv",
    path: "/",
  });
  let cookie = request.cookies.get("fast");
  console.log("GETCOOKIE");
  console.log(cookie); // => { name: 'vercel', value: 'whatv', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log("ALL COOKIE");
  console.log(allCookies); // => [{ name: 'vercel', value: 'whatv' }]

  //   const checkUser = fetch(new URL(`${process.env.DJANGO_BASE_URL}/customer/login`).href, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       allCookies,
  //     }),
  //   });
  //   const data = response.json();
  //   console.log(data);
  //   console.log("afte data");

  return response;
}
