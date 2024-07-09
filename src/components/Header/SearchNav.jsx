"use client";

import { usePathname } from "next/navigation";
import ActiveTabIndecator from "../UI/ActiveTabIndecator";
import Link from "next/link";
import PhotoIcon from "../Icons/Photo";
import PeoplesIcon from "../Icons/Peoples";
import Filters from "./Filters";

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

  return (
    <nav className="flex justify-between sticky top-[64px] z-[2] px-5 bg-white shadow-[0_1px_1px_#dadada]">
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
      {tab === "photos" && <Filters />}
    </nav>
  );
}
