"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ActiveTabIndecator from "../UI/ActiveTabIndecator";
import PhotoIcon from "../Icons/Photo";
import HeartIcon from "../Icons/Heart";

export default function ProfileTabsNav({ user }) {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 sm:top-[63px] z-[2] px-5 bg-white shadow-[0_1px_1px_#dadada]">
      <ul className="flex items-center gap-8 relative list-none">
        <li>
          <Link
            className={`relative flex items-center gap-2 fill-current py-4 text-sm transition hover:text-black ${
              pathname === `/@${user.username}` ? "text-black" : "text-gray"
            }`}
            href={`/@${user.username}`}
          >
            <PhotoIcon
              className={`w-[18px] h-[18px] group-hover:fill-black transition ${
                pathname === `/@${user.username}`
                  ? "fill-black"
                  : "fill-[#d1d1d1]"
              }`}
            />
            Photos {user.total_photos}
            {pathname === `/@${user.username}` && <ActiveTabIndecator />}
          </Link>
        </li>
        <li>
          <Link
            className={`relative flex items-center gap-2 fill-current py-4 text-sm transition hover:text-black ${
              pathname === `/@${user.username}/likes`
                ? "text-black"
                : "text-gray"
            }`}
            href={`/@${user.username}/likes`}
          >
            <HeartIcon
              className={`w-[18px] h-[18px] group-hover:fill-black transition ${
                pathname === `/@${user.username}/likes`
                  ? "fill-black"
                  : "fill-[#d1d1d1]"
              }`}
            />
            Likes {user.total_likes}
            {pathname === `/@${user.username}/likes` && <ActiveTabIndecator />}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
