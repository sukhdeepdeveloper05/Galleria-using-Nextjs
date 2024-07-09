"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AvatarButton({ profile }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onClick={() => setShowOptions((prevState) => !prevState)}
      className="relative border-none outline-none bg-transparent cursor-pointer"
    >
      <figure className="w-8 h-8 overflow-hidden rounded-full">
        <Image
          src={profile.profile_image.small}
          width={32}
          height={32}
          alt={`Avatar of user ${profile.name}`}
        />
      </figure>
      <ul
        className={`list-none absolute top-12 right-0 z-10 w-[210px] bg-white rounded-md py-2 shadow-[0px_8px_16px_#00000029,_0px_0px_0px_1px_#0000001f] ${
          showOptions ? "" : "hidden"
        }`}
      >
        <li>
          <Link
            className="text-gray text-sm py-2 px-4 whitespace-nowrap no-underline flex hover:bg-[#f5f5f5] hover:text-black"
            href={`/@${profile.username}`}
          >
            View profile
          </Link>
        </li>
        <hr className="h-px bg-[#0003] my-2 border-none" />
        <li>
          <a
            className="text-gray text-sm py-2 px-4 whitespace-nowrap no-underline flex hover:bg-[#f5f5f5] hover:text-black"
            href="/logout"
          >{`Logout @${profile.username}`}</a>
        </li>
      </ul>
    </button>
  );
}
