"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import { useState } from "react";
import fetchData from "@/lib/fetchData";
import filterImages from "@/helpers/filterImages";
import ImageCard from "./ImageCard";

export default function Images({ staticImages, totalPhotos = 200, endpoint }) {
  const [pageNum, setPageNum] = useState(2);
  const [filteredImages, setFilteredImages] = useState([...staticImages]);
  const [error, setError] = useState(
    filteredImages.length >= totalPhotos || filteredImages.length === 0
  );

  async function fetchNextPage() {
    const data = await fetchData(`${endpoint}&page=${pageNum}`);
    let images = data;

    if (data.length === 0) {
      setError(true);
      return;
    }

    if (data.results) {
      images = data.results;
    }

    const filteredData = filterImages([...filteredImages, ...images]);

    setFilteredImages(filteredData);
    setPageNum((prev) => prev + 1);
  }

  return (
    <main className="my-10 mx-12">
      <InfiniteScroll
        dataLength={filteredImages.length}
        next={fetchNextPage}
        hasMore={filteredImages.length < totalPhotos && !error}
        loader={<Loader />}
        endMessage={<p></p>}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 550: 2, 1024: 3, 1440: 4 }}
        >
          <Masonry gutter="1rem">
            {filteredImages.flatMap((image) => {
              return <ImageCard image={image} key={image.id} />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </main>
  );
}
