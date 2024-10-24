import { NextResponse } from "next/server";
import { apiKey, client_secret } from "../../../config";
import { setToken } from "@/helpers/token";
import { cookies } from "next/headers";

export async function GET(request) {
  const cookieStore = cookies();

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  const redirect_uri = request.nextUrl.origin + "/callback";

  const params = new URLSearchParams({
    client_id: apiKey,
    client_secret,
    grant_type: "authorization_code",
    code,
    redirect_uri,
  });

  const response = await fetch("https://unsplash.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const resData = await response.json();

  const token = resData.access_token;
  setToken(token);

  const redir = cookieStore.get("redir");
  const url = new URL(redir.value, request.url);

  cookieStore.delete("redir");

  return NextResponse.redirect(url);
}
