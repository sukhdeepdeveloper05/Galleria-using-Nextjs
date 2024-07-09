import Images from "@/components/UI/Images";
import fetchData from "@/lib/fetchData";

export default async function UserPhotos({ params }) {
  const username = params.username.replace("%40", "");
  
  const user = await fetchData(`/users/${username}`);
  const userPhotos = await fetchData(
    `/users/${username}/photos/?per_page=30&page=1`
  );

  return (
    <section className="min-h-96">
      <Images
        staticImages={userPhotos}
        total_photos={user.total_photos}
        endpoint={`/users/${username}/photos/?per_page=30`}
      />
    </section>
  );
}
