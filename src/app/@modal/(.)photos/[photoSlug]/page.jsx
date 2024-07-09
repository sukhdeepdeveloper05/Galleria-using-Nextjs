import ImageDetails from "@/components/SelectedImage/ImageDetails";
import fetchData from "@/lib/fetchData";
import ImageModal from "@/components/SelectedImage/ImageModal";

export async function generateMetadata({ params }) {
  const image = await fetchData(`/photos/${params.photoSlug}`);
  return {
    title: image.alt_description,
    description: image.description,
  };
}

export default async function PhotoModal({ params }) {
  const image = await fetchData(`/photos/${params.photoSlug}`);
  const relatedImages = await fetchData(`/photos/${image.id}/related`);

  return (
    image && (
      <ImageModal>
        <ImageDetails
          image={image}
          key={image.id}
          relatedImages={relatedImages}
        />
      </ImageModal>
    )
  );
}
