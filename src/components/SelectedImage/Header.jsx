"use client";

import { AttributionCtx } from "@/store/attribution";
import { CheckIcon } from "../Icons/Check";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import ArrowDownIcon from "../Icons/ArrowDown";
import { AnimatePresence, motion } from "framer-motion";
import downloadImage from "@/lib/downloadImage";

export default function SelectedImageHeader({ image }) {
  return (
    <header className="bg-white flex items-center justify-between sticky top-[64px] left-0 right-0 px-5 py-3 rounded">
      <Link
        className="flex items-center text-black no-underline"
        href={`/@${image.user.username}`}
      >
        <figure className="rounded-full overflow-hidden mr-2 border border-[#0000000d]">
          <Image
            alt={image.user.name}
            src={image.user.profile_image.small}
            width={32}
            height={32}
          />
        </figure>
        <div className="flex flex-col text-sm">
          <span>{image.user.name}</span>
          {image.user.for_hire ? (
            <span className="text-[#007fff] text-xs inline-flex items-center">
              Available for hire&nbsp;
              <CheckIcon />
            </span>
          ) : (
            <span className="text-xs text-gray">@{image.user.username}</span>
          )}
        </div>
      </Link>
      <DownloadBtn image={image} />
    </header>
  );
}

function DownloadBtn({ image }) {
  const ctx = useContext(AttributionCtx);
  const [isMenuShown, setIsMenuShown] = useState(false);

  return (
    <div className="flex items-stretch">
      <a
        rel="nofollow"
        download
        className="btn-outline rounded-tr-none rounded-br-none"
        href={`${image.links.download}&force=true`}
        data-disable-nprogress={true}
        onClick={() => {
          downloadImage(image.id);
          ctx.setIsAttributionShown(true);
          ctx.setAttributionData(image);
        }}
      >
        Download
      </a>
      <div className="flex items-center">
        <button
          className="btn-outline rounded-tl-none rounded-bl-none p-0 h-full"
          onClick={() => {
            setIsMenuShown((prev) => !prev);
          }}
        >
          <ArrowDownIcon />
        </button>
        <AnimatePresence>
          {isMenuShown && (
            <motion.div
              animate={{ scale: [0, 1] }}
              exit={{ scale: [1, 0], transition: { duration: 0.15 } }}
              className="absolute top-16 right-5 z-10 origin-top-right bg-white"
            >
              <div className="absolute -top-4 right-2 border-8 border-transparent pointer-events-none border-b-white before:absolute before:-bottom-[7px] before:-right-2 before:border-8 before:border-transparent before:border-b-[#0000001f] before:-z-10"></div>

              <ul className="shadow-[0px_8px_16px_#00000029,0px_0px_0px_1px_#0000001f] rounded py-2 min-w-[135px]">
                <li>
                  <a
                    href={image.links.download + "&force=true&w=640"}
                    rel="nofollow"
                    download
                    data-disable-nprogress={true}
                    onClick={() => {
                      downloadImage(image.id);
                      ctx.setIsAttributionShown(true);
                      ctx.setAttributionData(image);
                    }}
                    className="text-sm flex items-center px-4 py-2 transition text-black hover:bg-[#f5f5f5]"
                  >
                    <span>Small</span>
                    <span className="ml-1 text-lightGray">
                      (640 X {(640 / (image.width / image.height)).toFixed(0)})
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={image.links.download + "&force=true&w=1920"}
                    rel="nofollow"
                    download
                    data-disable-nprogress={true}
                    onClick={() => {
                      downloadImage(image.links.download_location);
                      ctx.setIsAttributionShown(true);
                      ctx.setAttributionData(image);
                    }}
                    className="text-sm flex items-center px-4 py-2 transition text-black hover:bg-[#f5f5f5]"
                  >
                    <span>Medium</span>
                    <span className="ml-1 text-lightGray">
                      (1920 X {(1920 / (image.width / image.height)).toFixed(0)}
                      )
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={image.links.download + "&force=true&w=2400"}
                    rel="nofollow"
                    download
                    data-disable-nprogress={true}
                    onClick={() => {
                      downloadImage(image.id);
                      ctx.setIsAttributionShown(true);
                      ctx.setAttributionData(image);
                    }}
                    className="text-sm flex items-center px-4 py-2 transition text-black hover:bg-[#f5f5f5]"
                  >
                    <span>Large</span>
                    <span className="ml-1 text-lightGray">
                      (2400 X {(2400 / (image.width / image.height)).toFixed(0)}
                      )
                    </span>
                  </a>
                </li>
                <hr className="h-px bg-[#0003] my-2 border-none" />
                <li>
                  <a
                    href={image.links.download + "&force=true"}
                    rel="nofollow"
                    download
                    data-disable-nprogress={true}
                    onClick={() => {
                      downloadImage(image.id);
                      ctx.setIsAttributionShown(true);
                      ctx.setAttributionData(image);
                    }}
                    className="text-sm flex items-center px-4 py-2 transition text-black hover:bg-[#f5f5f5]"
                  >
                    <span>Original Size</span>
                    <span className="ml-1 text-lightGray">
                      ({image.width} X {image.height})
                    </span>
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
