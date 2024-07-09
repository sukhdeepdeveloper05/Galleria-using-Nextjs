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
    const formattedSearchTerm = searchTerm.replace(" ", "-");

    return router.push(`/s/photos/${formattedSearchTerm}`);
  }

  return (
    <form
      onSubmit={onSubmitForm}
      className="flex items-center bg-[#efefef] px-4 py-2 rounded-full"
    >
      <SearchIcon />
      <input
        className="bg-transparent border-none outline-none text-base w-64 ml-2"
        type="text"
        id="search"
        name="search"
        placeholder="Search high-resolution images"
      />
    </form>
  );
}
