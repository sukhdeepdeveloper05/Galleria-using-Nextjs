"use server";

import { getToken } from "@/helpers/token";

export default async function fetchProfile() {
  const token = await getToken();

  try {
    const response = await fetch(`https://api.unsplash.com/me/`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60 * 60 * 1000,
      },
    });

    if (!response.ok) {
      throw new Error((await response.text()) || "Something went wrong");
    }

    const resData = await response.json();

    return resData;
  } catch (error) {
    throw new Error(error || "Something went wrong");
  }
}
