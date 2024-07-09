import ImageDetails from "@/components/SelectedImage/ImageDetails";
import fetchData from "@/lib/fetchData";

export async function generateMetadata({ params }) {
  const image = await fetchData(`/photos/${params.photoSlug}`);
  return {
    title: image.alt_description,
    description: image.description,
  };
}

export default async function PhotoPage({ params }) {
  const image = await fetchData(`/photos/${params.photoSlug}`);
  const relatedImages = await fetchData(`/photos/${image.id}/related`);

  return (
    <ImageDetails image={image} key={image.id} relatedImages={relatedImages} />
  );
}
