import { apiKey } from "@/config";
import filterImages from "@/helpers/filterImages";
import fetchData from "@/lib/fetchData";
import Images from "@/components/UI/Images";

export async function generateMetadata({ params }) {
  const response = await fetch(
    `https://api.unsplash.com/topics/${params.topic}?client_id=${apiKey}`
  );
  const topic = await response.json();
  return {
    title: `${topic.title} | Galleria`,
    description: `${topic.description}`,
  };
}

export default async function TopicPage({ params }) {
  const images = await fetchData(
    `/topics/${params.topic}/photos?page=1&per_page=30`
  );
  const filteredImages = filterImages(images);

  return (
    <>
      <Images
        staticImages={filteredImages}
        endpoint={`/topics/${params.topic}/photos?per_page=30`}
      />
    </>
  );
}
