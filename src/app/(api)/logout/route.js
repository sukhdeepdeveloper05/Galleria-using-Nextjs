import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request) {
  const cookieStore = cookies();

  cookieStore.delete("token");

  return NextResponse.redirect(new URL("/?flash=logout", request.url));
}