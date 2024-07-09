"use server";

import { apiKey } from "../config";

export default async function downloadImage(downloadEndpoint) {
  await fetch(downloadEndpoint, {
    headers: {
      Authorization: `Client-ID ${apiKey}`,
    },
  });
}
