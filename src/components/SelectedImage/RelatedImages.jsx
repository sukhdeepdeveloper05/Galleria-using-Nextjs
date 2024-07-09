"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageCard from "../UI/ImageCard";

export default function RelatedImages({ relatedImages }) {
  return (
    <section className="p-5">
      <h2 style={{ marginBottom: "20px" }}>Related Images</h2>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 300: 1, 550: 2, 770: 2, 1024: 3 }}
      >
        <Masonry gutter="1rem">
          {relatedImages.results.flatMap((image) => {
            return <ImageCard image={image} key={image.id} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
