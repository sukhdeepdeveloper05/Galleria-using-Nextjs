"use client";

import SearchIcon from "../Icons/Search";
import { useRouter } from "next-nprogress-bar";

export default function SearchForm() {
  const router = useRouter();

  function onSubmitForm(e) {
    e.preventDefault();

    window.scrollTo({ top: 0 });
    const formData = new FormData(e.target);

    const searchTerm = formData.get("search");
    const formattedSearchTerm = encodeURIComponent(
      searchTerm.replaceAll(" ", "-")
    );

    return router.push(`/s/photos/${formattedSearchTerm}`);
  }

  return (
    <form
      onSubmit={onSubmitForm}
      className="flex items-center bg-[#efefef] shadow-[0_0_0_1px_#eee] px-4 py-2 rounded-full h-10 focus-within:bg-transparent focus-within:shadow-[0_0_0_1px_#0000001f] transition-all duration-200"
    >
      <SearchIcon className="fill-lightGray" />
      <input
        className="bg-transparent border-none outline-none text-sm sm:text-base ml-2 w-full"
        type="text"
        id="search"
        name="search"
        placeholder="Search images"
        autoComplete="off"
      />
    </form>
  );
}
