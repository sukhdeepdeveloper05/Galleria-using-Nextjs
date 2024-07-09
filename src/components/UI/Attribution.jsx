"use client";

import CrossIcon from "../Icons/Cross";
import Link from "next/link";
import Image from "next/image";
import CopyIcon from "../Icons/Copy";
import { useContext, useEffect, useRef, useState } from "react";
import { AttributionCtx } from "@/store/attribution";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Attribution() {
  const pathname = usePathname();

  const ctx = useContext(AttributionCtx);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      if (ctx.isAttributionShown) {
        ctx.setIsAttributionShown(false);
      }
    }, 15000);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [ctx.isAttributionShown]);

  const attributionText = useRef();
  const [copied, setCopied] = useState(false);

  const copyTextHandler = () => {
    navigator.clipboard.writeText(attributionText.current.textContent);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    ctx.setIsAttributionShown(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {ctx.isAttributionShown && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex items-center justify-center"
        >
          <div className="max-w-[480px] min-h-48 pointer-events-auto mb-10 bg-white rounded flex gap-4 p-4 relative shadow-[0_4px_8px_#0003]">
            <button
              className="absolute top-0 right-0 p-2 flex items-center opacity-80 text-lightGray hover:text-black transition"
              onClick={() => ctx.setIsAttributionShown(false)}
            >
              <CrossIcon />
            </button>
            <figure className="rounded overflow-hidden w-32 relative">
              <Image
                src={ctx.attributionData.urls.small}
                alt={ctx.attributionData.alt_description}
                className="object-cover"
                fill
                sizes="120px"
              />
            </figure>
            <div className="flex-1 flex flex-col py-2">
              <h3 className="text-lg font-bold mb-2">Say thanks!</h3>
              <p className="mb-3 text-sm">
                Give a shoutout to&nbsp;
                <Link
                  href={`/@${ctx.attributionData.user.username}`}
                  className="text-lightGray underline"
                >
                  {ctx.attributionData.user.name}
                </Link>
                &nbsp;on social or copy the text below to attribute.
              </p>
              <p className="mt-auto bg-[#f1f1f1] px-2 py-3 flex justify-between items-center rounded">
                <span className="text-[13px]" ref={attributionText}>
                  Photo by&nbsp;
                  <Link
                    href={`/@${ctx.attributionData.user.username}`}
                    className="text-lightGray underline"
                  >
                    {ctx.attributionData.user.name}
                  </Link>
                  &nbsp;on&nbsp;
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-lightGray underline"
                  >
                    Unsplash
                  </a>
                </span>
                <button
                  type="button"
                  className="text-lightGray hover:text-black text-lg"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                  onClick={copyTextHandler}
                >
                  {copied ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      version="1.1"
                      aria-hidden="false"
                      className="fill-[#3cb46e] w-[18px] h-[18px]"
                    >
                      <path d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"></path>
                    </svg>
                  ) : (
                    <CopyIcon className="w-[18px] h-[18px]" />
                  )}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
