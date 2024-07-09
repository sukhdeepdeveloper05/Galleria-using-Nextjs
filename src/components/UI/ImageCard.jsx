"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "../Icons/Check";
import DownloadButton from "./DownloadButton";

export default function ImageCard({ image }) {
  return (
    <motion.figure
      className="group relative"
      animate={{ opacity: [0, 1], y: [-30, 0] }}
      key={image.id}
    >
      <Link
        href={`/photos/${image.slug}`}
        className="relative flex transition bg-gradient-to-b from-[#00000057] via-[#0000001a] via-50% to-[#00000059] cursor-zoom-in"
      >
        <Image
          src={image.urls.small}
          blurDataURL={image?.blur_hash}
          placeholder={image?.blur_hash ? "blur" : "empty"}
          className="w-full h-auto object-cover"
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
            backgroundColor: `${image.color}`,
          }}
          alt={image.alt_description || image.slug}
          title={image.alt_description || image.slug}
          width="0"
          height="0"
          sizes="100vw"
        />
      </Link>
      <div className="absolute inset-0 pointer-events-none p-5 flex flex-col opacity-0 group-hover:opacity-100 bg-gradient-to-b from-[#00000057] via-[#0000001a] via-48% to-[#00000059]">
        <div className="flex justify-between mt-auto">
          <Link
            className="mt-auto inline-flex items-center rounded-md text-gray transition pointer-events-auto"
            href={`/@${image.user.username}`}
          >
            <figure className="w-8 h-8 mx-2 overflow-hidden rounded-full inline-block">
              <img src={image.user.profile_image.small} alt="" />
            </figure>
            <span className="">
              <p className="text-white text-sm opacity-80 hover:opacity-100 transition">
                {image.user.name}
              </p>
              {image.user.for_hire && (
                <p className="text-white text-xs opacity-80 hover:opacity-100 transition flex gap-1">
                  Available for hire
                  <CheckCircleIcon className="w-[14px] h-[14px] place-self-center" />
                </p>
              )}
            </span>
          </Link>
          <DownloadButton image={image} type="icon" key={image.id} />
        </div>
      </div>
    </motion.figure>
  );
}
