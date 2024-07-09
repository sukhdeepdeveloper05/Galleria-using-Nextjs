import Images from "@/components/UI/Images";
import filterImages from "@/helpers/filterImages";
import fetchData from "@/lib/fetchData";

export async function generateMetadata() {
  return {
    title: "Galleria.",
    description:
      "Galleria is a Nextjs application that showcases my Nextjs skills. In Galleria, a user can view photos uploaded by photographers on Unsplash, search photos and users, filter photos, and securely log in using an Unsplash account.",
  };
}

export default async function Home() {
  const images = await fetchData(`/photos?page=1&per_page=30`);
  const filteredImages = filterImages(images);

  return (
    <>
      <Images staticImages={filteredImages} endpoint={`/photos?per_page=30`} />
    </>
  );
}
