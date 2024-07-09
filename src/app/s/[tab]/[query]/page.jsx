import SearchNav from "@/components/Header/SearchNav";
import Images from "@/components/UI/Images";
import Users from "@/components/UI/Users";
import fetchData from "@/lib/fetchData";
import { notFound } from "next/navigation";

export function generateMetadata({ params }) {
  const query = params.query.split("-");
  const formattedQuery = query
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return {
    title: `${formattedQuery} | Galleria`,
  };
}

export default async function SearchPage({ params, searchParams }) {
  if (params.tab !== "photos" && params.tab !== "users") {
    notFound();
  }

  const filters = new URLSearchParams(searchParams);

  const images = await fetchData(
    `/search/photos/?query=${params.query}&per_page=30&page=1${
      filters && "&" + filters.toString()
    }`
  );

  const users = await fetchData(
    `/search/users/?query=${params.query}&per_page=30&page=1`
  );

  return (
    <>
      <SearchNav
        tab={params.tab}
        totalPhotos={images.total}
        totalUsers={users.total}
        query={params.query}
        searchParams={searchParams}
        orientation={searchParams.orientation ?? ""}
        orderBy={searchParams.order_by ?? ""}
      />
      <h1 className="text-2xl font-bold mx-12 my-4">
        {params.query.charAt(0).toUpperCase() + params.query.slice(1)}
      </h1>
      {params.tab === "photos" && (
        <Images
          key={filters.toString()}
          endpoint={`/search/photos/?query=${params.query}&per_page=30&page=1${
            filters && "&" + filters.toString()
          }`}
          staticImages={images.results}
          totalPhotos={images.total}
        />
      )}

      {params.tab === "users" && (
        <Users
          endpoint={`/search/users/?query=${params.query}&per_page=30&page=1`}
          staticUsers={users.results}
          totalUsers={users.total}
        />
      )}
    </>
  );
}
