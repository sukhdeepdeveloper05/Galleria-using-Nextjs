"use client";

import { usePathname } from "next/navigation";
import ActiveTabIndecator from "../UI/ActiveTabIndecator";
import Link from "next/link";
import PhotoIcon from "../Icons/Photo";
import PeoplesIcon from "../Icons/Peoples";
import Filters from "../UI/Filters";
import FiltersIcon from "../Icons/Filters";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next-nprogress-bar";
import CrossIcon from "../Icons/Cross";

function formatTotal(num) {
  if (num < 1000) {
    return num;
  } else {
    if ((num / 1000).toFixed(1).includes(".0")) {
      return (num / 1000).toFixed(0) + "k";
    } else {
      return (num / 1000).toFixed(1) + "k";
    }
  }
}

export default function SearchNav({ tab, query, totalPhotos, totalUsers }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isFiltersModalShown, setIsFiltersModalShown] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isFiltersModalShown) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isFiltersModalShown]);

  return (
    <nav className="flex items-center justify-between sticky top-0 sm:top-16 z-[2] px-5 bg-white shadow-[0_1px_#0000001f]">
      <ul className="flex items-center gap-8 relative list-none">
        <li>
          <Link
            className={`group relative flex items-center gap-2 fill-current py-4 text-sm transition hover:text-black ${
              pathname.startsWith("/s/photos") ? "text-black" : "text-lightGray"
            }`}
            href={`/s/photos/${query}`}
          >
            <PhotoIcon
              className={`w-[18px] h-[18px] group-hover:fill-black transition ${
                pathname.startsWith("/s/photos")
                  ? "fill-black"
                  : "fill-[#d1d1d1]"
              }`}
            />
            Photos {formatTotal(totalPhotos)}
            {pathname.startsWith("/s/photos") && <ActiveTabIndecator />}
          </Link>
        </li>
        <li>
          <Link
            className={`group relative flex items-center gap-2 fill-current py-4 text-sm transition hover:text-black ${
              pathname.startsWith("/s/users") ? "text-black" : "text-lightGray"
            }`}
            href={`/s/users/${query}`}
          >
            <PeoplesIcon
              className={`w-[18px] h-[18px] group-hover:fill-black transition ${
                pathname.startsWith("/s/users")
                  ? "fill-black"
                  : "fill-[#d1d1d1]"
              }`}
            />
            Users {formatTotal(totalUsers)}
            {pathname.startsWith("/s/users") && <ActiveTabIndecator />}
          </Link>
        </li>
      </ul>
      {isMounted && window.outerWidth > 640 && tab === "photos" && <Filters />}
      {isMounted && window.outerWidth <= 640 && tab === "photos" && (
        <div>
          <button
            className="btn-outline"
            onClick={() => setIsFiltersModalShown((prev) => !prev)}
          >
            <FiltersIcon className="fill-lightGray mr-1" /> Filters
          </button>
          <AnimatePresence>
            {isFiltersModalShown && (
              <motion.div
                animate={{ opacity: [0, 1] }}
                exit={{ opacity: [1, 0] }}
                className="fixed inset-0 z-20 flex cursor-zoom-out overflow-auto bg-[#000000bf]"
                onClick={() => setIsFiltersModalShown(false)}
              >
                <motion.div
                  animate={{ x: ["-100%", 0] }}
                  exit={{ x: [0, "-100%"] }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="bg-white p-5 min-w-[250px]"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h1 className="flex items-center">
                      <FiltersIcon className="mr-2" />
                      Filters
                    </h1>
                    <div className="flex items-center">
                      <button
                        className="text-lightGray mr-3 text-sm hover:text-black transition"
                        onClick={() => {
                          router.push(pathname);
                          setIsFiltersModalShown(false);
                        }}
                      >
                        Clear
                      </button>
                      <button
                        className="text-lightGray hover:text-black transition"
                        onClick={() => {
                          setIsFiltersModalShown(false);
                        }}
                      >
                        <CrossIcon />
                      </button>
                    </div>
                  </div>
                  <Filters closeModal={() => setIsFiltersModalShown(false)} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
}
