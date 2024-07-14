"use client";

import { useContext } from "react";
import DownloadIcon from "../Icons/Download";
import { AttributionCtx } from "@/store/attribution";
import downloadImage from "@/lib/downloadImage";

export default function DownloadButton({ image, className }) {
  const ctx = useContext(AttributionCtx);

  return (
    <a
      href={`${image.links.download}&force=true`}
      download
      rel="nofollow"
      title="Download this image"
      className={`mt-auto px-[11px] rounded-md bg-[#f6f6f6fa] text-gray sm:opacity-0 hover:bg-white hover:text-black group-hover:opacity-100 transition  pointer-events-auto ${className}`}
      data-disable-nprogress={true}
      onClick={() => {
        downloadImage(image.links.download_location);
        ctx.setIsAttributionShown(true);
        ctx.setAttributionData(image);
      }}
    >
      <DownloadIcon />
    </a>
  );
}
