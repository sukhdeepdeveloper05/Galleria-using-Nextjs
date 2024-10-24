"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "../Icons/Check";
import DownloadButton from "./DownloadButton";
import DownloadBtnFull from "./DownloadBtnFull";
import { blurhashToDataUri } from "@unpic/placeholder";

export default function ImageCard({ image }) {
  return (
    <motion.figure
      className="group relative flex flex-col-reverse sm:flex-col"
      animate={{ opacity: [0, 1], y: [-30, 0] }}
    >
      <Link
        href={`/photos/${image.slug}`}
        className="relative flex transition cursor-zoom-in"
        style={{
          aspectRatio: `${image.width} / ${image.height}`,
        }}
      >
        {image.blur_hash && (
          <Image
            className="w-full h-auto object-cover"
            alt={image.alt_description || image.slug}
            title={image.alt_description || image.slug}
            src={blurhashToDataUri(image.blur_hash)}
            fill
          />
        )}
        <Image
          src={image.urls.small}
          className="w-full h-auto object-cover"
          alt={image.alt_description || image.slug}
          title={image.alt_description || image.slug}
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
          }}
          fill
        />
      </Link>
      <div className="relative sm:absolute inset-0 sm:pointer-events-none p-3 sm:p-5 flex flex-col sm:opacity-0 group-hover:opacity-100 sm:bg-gradient-to-b from-[#00000057] via-[#0000001a] via-48% to-[#00000059]">
        <div className="flex justify-between mt-auto">
          <Link
            className="mt-auto inline-flex items-center rounded-md text-gray transition pointer-events-auto"
            href={`/@${image.user.username}`}
          >
            <figure className="w-8 h-8 mr-2 overflow-hidden rounded-full inline-block">
              <img src={image.user.profile_image.small} alt="" />
            </figure>
            <span className="">
              <p className="text-black sm:text-white text-sm sm:opacity-80 hover:opacity-100 transition">
                {image.user.name}
              </p>
              {image.user.for_hire && (
                <p className="text-black sm:text-white text-xs sm:opacity-80 hover:opacity-100 transition flex gap-1">
                  Available for hire
                  <CheckCircleIcon className="w-[14px] h-[14px] place-self-center" />
                </p>
              )}
            </span>
          </Link>
          <DownloadButton
            image={image}
            key={`${image.id}-small`}
            className="hidden sm:inline-flex"
          />
          <DownloadBtnFull
            image={image}
            key={`${image.id}-full`}
            className="sm:hidden flex"
          />
        </div>
      </div>
    </motion.figure>
  );
}
