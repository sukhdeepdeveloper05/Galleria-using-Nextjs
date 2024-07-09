import { NextResponse } from "next/server";
import { apiKey, client_secret } from "../../../config";
import { setToken } from "@/helpers/token";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  console.log(code);

  const params = new URLSearchParams();
  params.append("client_id", apiKey);
  params.append("client_secret", client_secret);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/callback");

  const response = await fetch("https://unsplash.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const resData = await response.json();

  const token = resData.access_token;
  setToken(token);

  return NextResponse.redirect(new URL("/", request.url));
}
