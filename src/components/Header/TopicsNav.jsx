"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import LeftIcon from "../Icons/Left";
import RightIcon from "../Icons/Right";
import ActiveTabIndecator from "../UI/ActiveTabIndecator";

export default function TopicsNav({ topics }) {
  const leftBtn = useRef();
  const rightBtn = useRef();
  const ul = useRef();
  const pathName = usePathname();

  const [isLeftBtnVisible, setIsLeftBtnVisible] = useState(false);
  const [isRightBtnVisible, setIsRightBtnVisible] = useState(true);

  function changeBtnsVisibility() {
    if (ul.current.scrollLeft < 5) {
      setIsLeftBtnVisible(false);
    } else {
      setIsLeftBtnVisible(true);
    }

    if (
      ul.current.scrollWidth - ul.current.offsetWidth >
      ul.current.scrollLeft
    ) {
      setIsRightBtnVisible(true);
    } else {
      setIsRightBtnVisible(false);
    }
  }

  function scrollToLeft() {
    ul.current.scrollLeft -= 250;
  }

  function scrollToRight() {
    ul.current.scrollLeft += 250;
  }

  return (
    <div className="sticky top-0 sm:top-16 z-[2] px-4 sm:px-5 bg-white shadow-[0_1px_#0000001f]">
      <nav className="flex items-center relative overflow-hidden">
        <p>
          <Link
            href="/"
            className={`inline-block relative px-1 py-4 mx-1 transition hover:text-black ${
              pathName === "/" ? "text-black" : "text-gray"
            }`}
          >
            Editorial
            {pathName === "/" && <ActiveTabIndecator />}
          </Link>
        </p>
        <div className="bg-[#d1d1d1] h-8 w-px z-10" />

        <ul
          className="topics-list flex items-center gap-3 pl-3 list-none whitespace-nowrap overflow-auto"
          ref={ul}
          onScroll={changeBtnsVisibility}
        >
          <button
            className={`absolute top-0 left-[74px] bottom-0 z-10 w-8 outline-none border-none cursor-pointer pl-2 text-lightGray transition hover:text-black before:w-20 sm:before:w-48 before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:from-white before:to-[#fff0] before:-z-10 before:pointer-events-none ${
              isLeftBtnVisible ? "" : "hidden"
            }`}
            ref={leftBtn}
            onClick={scrollToLeft}
            title="scroll list to the left"
          >
            <LeftIcon className="hidden sm:block" />
          </button>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link
                  href={`/t/${topic.slug}`}
                  className={`inline-block relative py-4 transition hover:text-black ${
                    pathName === `/t/${topic.slug}` ? "text-black" : "text-gray"
                  }`}
                >
                  {topic.title}
                  {pathName === `/t/${topic.slug}` && <ActiveTabIndecator />}
                </Link>
              </li>
            );
          })}
          <button
            className={`absolute top-0 left-auto right-0 bottom-0 z-10 w-8 outline-none border-none cursor-pointer pl-2 text-lightGray transition hover:text-black before:w-20 sm:before:w-48 before:h-full before:absolute before:top-0 before:right-0 before:bg-gradient-to-r before:from-[#fff0] before:to-white before:-z-10 before:pointer-events-none ${
              isRightBtnVisible ? "" : "hidden"
            }`}
            ref={rightBtn}
            onClick={scrollToRight}
            title="scroll list to the right"
          >
            <RightIcon className="hidden sm:block" />
          </button>
        </ul>
      </nav>
    </div>
  );
}
