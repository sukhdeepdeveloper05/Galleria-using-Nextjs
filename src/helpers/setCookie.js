"use server";

import { cookies } from "next/headers";

export default async function setCookie(name, value, options = {}) {
  const cookieStore = cookies();

  cookieStore.set(name, value, options);
}
