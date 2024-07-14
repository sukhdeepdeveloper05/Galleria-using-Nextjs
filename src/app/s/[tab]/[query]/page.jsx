import SearchNav from "@/components/Header/SearchNav";
import Images from "@/components/UI/Images";
import Users from "@/components/UI/Users";
import fetchData from "@/lib/fetchData";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const query = decodeURIComponent(params.query);
  const formattedQuery = query
    .split("-")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return {
    title: `${formattedQuery} | Galleria`,
  };
}

export default async function SearchPage({ params, searchParams }) {
  const query = decodeURIComponent(params.query);
  const tab = params.tab;

  if (tab !== "photos" && tab !== "users") {
    notFound();
  }

  const filters = new URLSearchParams(searchParams);

  const images = await fetchData(
    `/search/photos/?query=${query}&per_page=30&page=1${
      filters && "&" + filters.toString()
    }`
  );

  const users = await fetchData(
    `/search/users/?query=${query}&per_page=30&page=1`
  );

  return (
    <>
      <SearchNav
        tab={tab}
        totalPhotos={images.total}
        totalUsers={users.total}
        query={query}
        searchParams={searchParams}
        orientation={searchParams.orientation ?? ""}
        orderBy={searchParams.order_by ?? ""}
      />
      <h1 className="text-2xl font-bold mx-3 sm:mx-12 my-4">
        {query.charAt(0).toUpperCase() + query.slice(1).split("-").join(" ")}
      </h1>
      {tab === "photos" && (
        <Images
          key={filters.toString()}
          endpoint={`/search/photos/?query=${params.query}&per_page=30&page=1${
            filters && "&" + filters.toString()
          }`}
          staticImages={images.results}
          totalPhotos={images.total}
        />
      )}

      {tab === "users" && (
        <Users
          endpoint={`/search/users/?query=${query}&per_page=30&page=1`}
          staticUsers={users.results}
          totalUsers={users.total}
        />
      )}
    </>
  );
}
