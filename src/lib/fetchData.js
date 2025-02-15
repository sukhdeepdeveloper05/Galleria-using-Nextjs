"use server";

import { apiKey } from "../config";

export default async function fetchData(endpoint) {
  // try {
    const response = await fetch(`https://api.unsplash.comm${endpoint}`, {
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
    });

    // if (!response.ok) {
    //   if (response.text() === "Rate Limit Exceeded") {
    //     throw new Error(await response.text());
    //   } else {
    //     throw new Error(
    //       (await response.json().errors[0]) || "Something went wrong"
    //     );
    //   }
    // }

    const resData = await response.json();

    return resData;
  // } catch (error) {
  //   throw new Error(error.message);
  // }
}
