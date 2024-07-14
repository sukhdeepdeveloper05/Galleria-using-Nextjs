"use server";

import { cookies } from "next/headers";

export async function setToken(token) {
  const cookieStore = cookies();
  cookieStore.set("token", token, { sameSite: "strict" });
}

export async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return token;
}
