import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request) {
  const cookieStore = cookies();

  cookieStore.delete("token");

  const redir = cookieStore.get("logout_redir");

  cookieStore.delete("logout_redir");

  return NextResponse.redirect(
    new URL(`${redir.value}?flash=logout`, request.url)
  );
}
