"use client";

import Image from "next/image";
import Stats from "./Stats";
import Details from "./Details";
import RelatedImages from "./RelatedImages";
import ShareIcon from "../Icons/Share";
import SelectedImageHeader from "./Header";
import { blurhashToDataUri } from "@unpic/placeholder";

function toggleImageScale(event) {
  const image = event.target;
  if (image.parentElement.classList.contains("scaled")) {
    image.parentElement.classList.remove("scaled");
  } else {
    image.parentElement.classList.add("scaled");
  }

  if (document.querySelector(".backdrop")) {
    document
      .querySelector(".backdrop")
      .scrollTo({ top: 0, behavior: "instant" });
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

export default function ImageDetails({ image, relatedImages }) {
  const shareBtnHandler = async () => {
    const text = `Thanks to ${image.user.name} @${image.user.username} for making this photo available freely on Unsplash 🎁 `;
    const url = window.location.href;

    await navigator.share({
      text,
      url,
    });
  };

  return (
    <div className="relative bg-white rounded" key={image.id}>
      <div>
        <SelectedImageHeader image={image} />
        <figure className="selected-image relative w-full">
          {image.blur_hash && (
            <Image
              src={image.urls.regular}
              priority
              alt={image.alt_description || image.slug}
              title="Zoom in this image"
              placeholder="blur"
              blurDataURL={blurhashToDataUri(image.blur_hash)}
              style={{
                aspectRatio: `${image.width} / ${image.height}`,
              }}
              width={image.width}
              height={image.height}
              onClick={toggleImageScale}
            />
          )}
        </figure>
        <div className="selected-image__details grid items-center gap-6 px-5 py-4">
          <Stats image={image} />
          <div className="actions">
            <button
              className="btn-outline flex items-center"
              onClick={shareBtnHandler}
            >
              <ShareIcon />
              <span>Share</span>
            </button>
          </div>
          <Details image={image} />
        </div>
      </div>
      {relatedImages.total !== 0 && (
        <RelatedImages key={image.id} relatedImages={relatedImages} />
      )}
    </div>
  );
}
