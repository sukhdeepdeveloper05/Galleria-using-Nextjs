import { NextResponse } from "next/server";
import { getToken } from "./helpers/token";

export async function middleware(request) {
  const token = await getToken();
  const pathname = request.nextUrl.pathname;

  if ((pathname === "/login" || pathname === "/callback") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (pathname === "/logout" && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
