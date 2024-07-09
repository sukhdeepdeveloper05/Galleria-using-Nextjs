"use server";

import { apiKey } from "../config";

export default async function fetchData(endpoint) {
  try {
    const response = await fetch(`https://api.unsplash.com${endpoint}`, {
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.errors[0] || "Something went wrong");
    }

    return resData;
  } catch (error) {
    throw new Error(error.message);
  }
}
