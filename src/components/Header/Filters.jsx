import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { AnimatePresence, motion } from "framer-motion";

import SolidArrowDownIcon from "../Icons/SolidArrowDown";
import OrientationIcon from "../Icons/Orientation";
import LandscapeIcon from "../Icons/Landscape";
import PortraitIcon from "../Icons/Portrait";
import UnfoldIcon from "../Icons/Unfold";
import { CheckIcon } from "../Icons/Check";
import { usePathname, useSearchParams } from "next/navigation";

const filtersData = [
  {
    name: "Orientaion",
    handle: "orientation",
    icon: <OrientationIcon className="fill-[#aaa] mr-1 w-[18px] h-[18px]" />,
    values: [
      {
        title: "All",
        handle: "",
        url: "",
        icon: (orientation) => {
          return (
            <OrientationIcon
              className={`fill-[#aaa] mr-1 w-[18px] h-[18px] ${
                orientation === "" ? "fill-black" : "fill-[#aaa]"
              }`}
            />
          );
        },
      },
      {
        title: "Landscape",
        handle: "landscape",
        url: {
          query: {
            orientation: "landscape",
          },
        },
        icon: (orientation) => {
          return (
            <LandscapeIcon
              className={`fill-[#aaa] mr-1 w-[18px] h-[18px] ${
                orientation === "landscape" ? "fill-black" : "fill-[#aaa]"
              }`}
            />
          );
        },
      },
      {
        title: "Portrait",
        handle: "portrait",
        url: {
          query: {
            orientation: "portrait",
          },
        },
        icon: (orientation) => {
          return (
            <PortraitIcon
              className={`fill-[#aaa] mr-1 w-[18px] h-[18px] ${
                orientation === "portrait" ? "fill-black" : "fill-[#aaa]"
              }`}
            />
          );
        },
      },
    ],
  },
  {
    name: "Sort by",
    handle: "order_by",
    icon: <UnfoldIcon className="fill-[#aaa] mr-1" />,
    values: [
      {
        title: "Relevance",
        handle: "",
        url: undefined,
        icon: () => <CheckIcon className={`fill-black mr-1`} />,
      },
      {
        title: "Newest",
        handle: "latest",
        url: {
          query: {
            order_by: "latest",
          },
        },
        icon: () => <CheckIcon className={`fill-black mr-1`} />,
      },
    ],
  },
];

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams());

  const [openedMenu, setOpenedMenu] = useState("");

  function clearFilters() {
    router.push(`${pathname}`);
    
    setOpenedMenu("");
  }

  function updateFilter(e, key, value) {
    e.preventDefault();
    
    if (value !== "") {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    
    router.push(`${pathname}?${searchParams.toString()}`);
    setOpenedMenu("");
  }

  return (
    <ul className="flex items-center gap-2 relative list-none">
      {searchParams.size !== 0 && (
        <button
          className="text-lightGray mr-6 text-sm hover:text-black transition"
          onClick={clearFilters}
        >
          Clear
        </button>
      )}
      {filtersData.map((filter, i) => {
        const selectedFilter = filter.values.find(
          (value) => value.handle === (searchParams.get(filter.handle) || "")
        );
        return (
          <li key={i}>
            <button
              className={`group py-1 px-2 border rounded text-sm flex items-center hover:border-[#d1d1d1] hover:bg-[#f5f5f5] transition ${
                searchParams.has([filter.handle])
                  ? "border-[#d1d1d1] bg-[#f5f5f5]"
                  : "border-[#eee]"
              }`}
              onClick={() => {
                setOpenedMenu((prev) =>
                  prev === filter.handle ? "" : filter.handle
                );
              }}
            >
              {filter.handle === "order_by" && filter.icon}
              {filter.handle === "orientation" &&
                selectedFilter.icon(searchParams.get("orientation"))}
              <span className="text-lightGray">
                {filter.name}{" "}
                <span className="text-black">
                  {searchParams.get([filter.handle])
                    ? searchParams
                        .get([filter.handle])
                        .charAt(0)
                        .toUpperCase() +
                      searchParams.get([filter.handle]).slice(1)
                    : filter.values[0].title}
                </span>
              </span>
              <SolidArrowDownIcon className="fill-[#aaa] ml-1" />
            </button>
            <AnimatePresence mode="wait">
              {openedMenu === filter.handle && (
                <motion.div
                  className="absolute top-11 bg-white py-2 min-w-32 rounded shadow-[0px_8px_16px_#00000029,_0px_0px_0px_1px_#0000001f] origin-top-left"
                  animate={{ scale: [0, 1] }}
                  exit={{ scale: [1, 0] }}
                  transition={{ type: "tween", duration: 0.2 }}
                >
                  <span className="px-4 py-2 block text-sm">{filter.name}</span>
                  {filter.values.map((value, j) => {
                    return (
                      <Link
                        key={j}
                        className={` text-sm py-2 px-4 whitespace-nowrap no-underline flex hover:bg-[#f5f5f5] hover:text-black ${
                          (searchParams.get([filter.handle]) ?? "") ===
                          value.handle
                            ? "text-black cursor-default pointer-events-none"
                            : "text-gray"
                        }`}
                        href={value.url ?? pathname}
                        onClick={(e) => {
                          updateFilter(e, filter.handle, value.handle);
                        }}
                      >
                        {filter.handle === "orientation" &&
                          value.icon(searchParams.get(["orientation"]) || "")}
                        {filter.handle === "order_by" &&
                        (searchParams.get(["order_by"]) || "") === value.handle
                          ? value.icon()
                          : filter.handle === "order_by" && (
                              <span className="w-[18px] h-[18px] mr-1" />
                            )}
                        {value.title}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
